
"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  Clock3,
  Globe2,
  Mail,
  MapPin,
  Phone,
  UserRound,
} from "lucide-react";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

type Ripple = {
  x: number;
  y: number;
  startedAt: number;
};

const VERTEX_SHADER = `
attribute vec2 aPosition;

void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision highp float;

uniform vec2 uResolution;
uniform float uTime;
uniform vec4 uRipples[8];

float waterHeight(vec2 uv) {
  float height = 0.0;
  float aspect = uResolution.x / uResolution.y;

  for (int i = 0; i < 8; i++) {
    vec4 ripple = uRipples[i];

    float age = uTime - ripple.z;

    if (age >= 0.0 && age < 2.9) {
      vec2 delta = uv - ripple.xy;
      delta.x *= aspect;

      float distanceToCenter = length(delta);
      float waveFront = age * 0.15;
      float offset = distanceToCenter - waveFront;

      float envelope =
        exp(-pow(offset * 18.0, 2.0));

      float oscillation =
        sin(offset * 112.0);

      float lifetimeFade =
        exp(-age * 0.75);

      height +=
        oscillation *
        envelope *
        lifetimeFade *
        ripple.w *
        0.018;
    }
  }

  return height;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;

  float epsilon = 0.0025;

  float height = waterHeight(uv);

  float slopeX =
    (waterHeight(uv + vec2(epsilon, 0.0)) -
     waterHeight(uv - vec2(epsilon, 0.0))) /
    (2.0 * epsilon);

  float slopeY =
    (waterHeight(uv + vec2(0.0, epsilon)) -
     waterHeight(uv - vec2(0.0, epsilon))) /
    (2.0 * epsilon);

  vec3 normal = normalize(
    vec3(-slopeX * 1.7, -slopeY * 1.7, 1.0)
  );

  vec3 lightDirection =
    normalize(vec3(-0.45, 0.65, 0.85));

  float diffuse =
    max(dot(normal, lightDirection), 0.0);

  float specular =
    pow(diffuse, 22.0);

  float slopeStrength =
    length(vec2(slopeX, slopeY));

  float reflection =
    clamp(slopeStrength * 0.32, 0.0, 1.0);

  float highlight =
    smoothstep(0.45, 0.95, diffuse);

  vec3 deepWater =
    vec3(0.04, 0.32, 0.65);

  vec3 skyReflection =
    vec3(0.78, 0.95, 1.0);

  vec3 waterColor =
    mix(deepWater, skyReflection, highlight);

  waterColor +=
    vec3(0.55, 0.82, 1.0) * specular * 0.45;

  waterColor +=
    vec3(0.07, 0.18, 0.27) * height * 2.0;

  float alpha =
    clamp(
      reflection * 0.42 + specular * reflection * 0.12,
      0.0,
      0.48
    );

  gl_FragColor = vec4(waterColor, alpha);
}
`;

function createShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

function useRealisticWaterSurface() {
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ripplesRef = useRef<Ripple[]>([]);
  const drawRef = useRef<(() => void) | null>(null);
  const lastSpawnRef = useRef(0);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;

    if (!container || !canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: true,
      premultipliedAlpha: false,
      depth: false,
      stencil: false,
    });

    if (!gl) return;

    const vertexShader = createShader(
      gl,
      gl.VERTEX_SHADER,
      VERTEX_SHADER
    );

    const fragmentShader = createShader(
      gl,
      gl.FRAGMENT_SHADER,
      FRAGMENT_SHADER
    );

    if (!vertexShader || !fragmentShader) {
      if (vertexShader) gl.deleteShader(vertexShader);
      if (fragmentShader) gl.deleteShader(fragmentShader);
      return;
    }

    const program = gl.createProgram();
    if (!program) {
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      return;
    }

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      return;
    }

    const buffer = gl.createBuffer();
    if (!buffer) {
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      return;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1, -1,
         1, -1,
        -1,  1,
        -1,  1,
         1, -1,
         1,  1,
      ]),
      gl.STATIC_DRAW
    );

    const positionLocation =
      gl.getAttribLocation(program, "aPosition");

    const resolutionLocation =
      gl.getUniformLocation(program, "uResolution");

    const timeLocation =
      gl.getUniformLocation(program, "uTime");

    const rippleLocation =
      gl.getUniformLocation(program, "uRipples[0]");

    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

    if (positionLocation >= 0) {
      gl.enableVertexAttribArray(positionLocation);
      gl.vertexAttribPointer(
        positionLocation,
        2,
        gl.FLOAT,
        false,
        0,
        0
      );
    }

    gl.enable(gl.BLEND);
    gl.blendFunc(
      gl.SRC_ALPHA,
      gl.ONE_MINUS_SRC_ALPHA
    );

    let frameId = 0;
    let disposed = false;

    const resize = () => {
      const rect = container.getBoundingClientRect();

      const ratio = Math.min(
        window.devicePixelRatio || 1,
        1.5
      );

      canvas.width = Math.max(
        1,
        Math.round(rect.width * ratio)
      );

      canvas.height = Math.max(
        1,
        Math.round(rect.height * ratio)
      );

      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    resize();

    const observer = new ResizeObserver(resize);
    observer.observe(container);

    const motionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const updateMotion = () => {
      reducedMotionRef.current = motionQuery.matches;

      if (motionQuery.matches) {
        ripplesRef.current = [];
        window.cancelAnimationFrame(frameId);
        frameId = 0;

        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
      }
    };

    updateMotion();
    motionQuery.addEventListener("change", updateMotion);

    const render = () => {
      if (disposed || reducedMotionRef.current) return;

      const now = performance.now() / 1000;

      ripplesRef.current = ripplesRef.current.filter(
        (ripple) => now - ripple.startedAt < 2.9
      );

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      if (ripplesRef.current.length === 0) {
        frameId = 0;
        return;
      }

      const data = new Float32Array(32);

      for (let index = 0; index < 8; index++) {
        const ripple = ripplesRef.current[index];

        const offset = index * 4;

        if (ripple) {
          data[offset] = ripple.x;
          data[offset + 1] = ripple.y;
          data[offset + 2] = ripple.startedAt;
          data[offset + 3] = 1;
        } else {
          data[offset + 2] = -100;
        }
      }

      gl.useProgram(program);

      gl.uniform2f(
        resolutionLocation,
        canvas.width,
        canvas.height
      );

      gl.uniform1f(timeLocation, now);
      gl.uniform4fv(rippleLocation, data);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      frameId = window.requestAnimationFrame(render);
    };

    drawRef.current = () => {
      if (frameId === 0 && !reducedMotionRef.current) {
        frameId = window.requestAnimationFrame(render);
      }
    };

    return () => {
      disposed = true;

      window.cancelAnimationFrame(frameId);
      observer.disconnect();

      motionQuery.removeEventListener(
        "change",
        updateMotion
      );

      drawRef.current = null;

      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    };
  }, []);

  const handlePointerMove = (
    event: ReactPointerEvent<HTMLElement>
  ) => {
    if (event.pointerType !== "mouse") return;
    if (reducedMotionRef.current) return;

    const canvas = canvasRef.current;

    if (!canvas || !drawRef.current) return;

    const now = performance.now();

    if (now - lastSpawnRef.current < 130) return;

    lastSpawnRef.current = now;

    const bounds = canvas.getBoundingClientRect();

    if (bounds.width <= 0 || bounds.height <= 0) {
      return;
    }

    const x =
      (event.clientX - bounds.left) / bounds.width;

    const y =
      1 - (event.clientY - bounds.top) / bounds.height;

    ripplesRef.current.push({
      x,
      y,
      startedAt: now / 1000,
    });

    if (ripplesRef.current.length > 8) {
      ripplesRef.current =
        ripplesRef.current.slice(-8);
    }

    drawRef.current();
  };

  return {
    containerRef,
    canvasRef,
    handlePointerMove,
  };
}

function FacebookIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5 fill-current"
    >
      <path d="M13.5 21v-7h2.4l.4-2.8h-2.8V9.4c0-.8.2-1.4 1.4-1.4h1.5V5.5c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 4v1.8H8V14h2.2v7h3.3Z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-[17px] w-[17px] fill-current"
    >
      <path d="M18.9 3H21l-6.3 7.2L22 21h-5.7l-4.5-5.9L6.6 21H4.5l6.7-7.7L2 3h5.8l4 5.3L18.9 3Zm-2 16h1.6L7 4.9H5.3L16.9 19Z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5 fill-current"
    >
      <path d="M23 12s0-3.1-.4-4.6c-.2-.8-.8-1.5-1.6-1.7C19.4 5.3 12 5.3 12 5.3s-7.4 0-9 .4c-.8.2-1.4.9 1.6 1.7C1 8.9 1 12 1 12s0 3.1.4 4.6c.2.8.8 1.4 1.6 1.7 1.6.4 9 .4 9 .4s7.4 0 9-.4c.8-.3 1.4-.9 1.6-1.7.4-1.5.4-4.6.4-4.6ZM9.6 15.7V8.3l6.4 3.7-6.4 3.7Z" />
    </svg>
  );
}

function FooterHeading({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <h3 className="mb-4 text-[15px] font-bold uppercase tracking-[0.13em] text-[#0C4DA2]">
      {children}
    </h3>
  );
}

function SocialButton({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) {
  return (
    <span
      aria-label={`${label} - coming soon`}
      title={`${label} - coming soon`}
      className="flex h-12 w-12 items-center justify-center rounded-full border border-[#BEDCF5] bg-white/80 text-[#0C4DA2] shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white motion-reduce:transform-none"
    >
      {children}
    </span>
  );
}

function AnimatedTopWaves() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-[120px] overflow-hidden sm:h-[145px]"
    >
      <svg
        viewBox="0 0 1600 180"
        preserveAspectRatio="none"
        className="h-full w-full"
      >
        <defs>
          <linearGradient
            id="footer-wave-main"
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop offset="0%" stopColor="#57B9F4" />
            <stop offset="50%" stopColor="#C6EBFF" />
            <stop offset="100%" stopColor="#75C7F6" />
          </linearGradient>

          <linearGradient
            id="footer-wave-soft"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
          >
            <stop offset="0%" stopColor="#B4E4FF" />
            <stop offset="50%" stopColor="#EAF8FF" />
            <stop offset="100%" stopColor="#B0DFFF" />
          </linearGradient>
        </defs>

        <path
          d="M0 57 C250 110 430 20 710 67 C970 115 1220 24 1600 70 L1600 0 L0 0 Z"
          fill="url(#footer-wave-main)"
          fillOpacity="0.30"
        >
          <animate
            attributeName="d"
            dur="11s"
            repeatCount="indefinite"
            values="
              M0 57 C250 110 430 20 710 67 C970 115 1220 24 1600 70 L1600 0 L0 0 Z;
              M0 78 C250 30 430 110 710 53 C970 18 1220 118 1600 49 L1600 0 L0 0 Z;
              M0 57 C250 110 430 20 710 67 C970 115 1220 24 1600 70 L1600 0 L0 0 Z
            "
          />
        </path>

        <path
          d="M0 94 C260 43 520 140 790 81 C1070 28 1320 122 1600 83 L1600 0 L0 0 Z"
          fill="url(#footer-wave-soft)"
          fillOpacity="0.63"
        >
          <animate
            attributeName="d"
            dur="14s"
            repeatCount="indefinite"
            values="
              M0 94 C260 43 520 140 790 81 C1070 28 1320 122 1600 83 L1600 0 L0 0 Z;
              M0 65 C260 128 520 40 790 108 C1070 142 1320 33 1600 101 L1600 0 L0 0 Z;
              M0 94 C260 43 520 140 790 81 C1070 28 1320 122 1600 83 L1600 0 L0 0 Z
            "
          />
        </path>

        <path
          d="M0 114 C290 83 470 140 780 119 C1090 91 1370 140 1600 113"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeOpacity="0.5"
        />
      </svg>
    </div>
  );
}

export default function Footer() {
  const [formMessage, setFormMessage] = useState("");

  const {
    containerRef,
    canvasRef,
    handlePointerMove,
  } = useRealisticWaterSurface();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setFormMessage(
      "Newsletter subscriptions will be available soon."
    );
  };

  return (
    <footer
      id="footer"
      ref={containerRef}
      onPointerMove={handlePointerMove}
      className="relative isolate overflow-hidden bg-[#EDF8FF] text-[#153C65]"
    >
      {/* Light-blue gradient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse at 15% 15%,rgba(187,227,255,0.70),transparent 48%),radial-gradient(ellipse at 85% 80%,rgba(153,211,249,0.45),transparent 55%),linear-gradient(135deg,#F8FCFF 0%,#EDF8FF 48%,#DFEFFB 100%)",
        }}
      />

      {/* Animated top gradient waves */}
      <AnimatedTopWaves />

      {/* Realistic water reflection surface */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[3] h-full w-full"
      />

      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-[1650px] px-6 pt-[115px] pb-6 sm:px-10 sm:pt-[130px] lg:px-14 lg:pt-[135px]">
        <div className="grid grid-cols-1 items-start gap-x-12 gap-y-10 border-t border-[#BBDDF4]/75 pt-8 md:grid-cols-2 xl:grid-cols-[1.25fr_1.1fr_1.1fr_0.8fr] xl:gap-x-14">

          {/* Stay Connected */}
          <div>
            <FooterHeading>Stay Connected</FooterHeading>

            <h2 className="font-serif text-[clamp(2.4rem,3.4vw,3.8rem)] leading-[1.07] tracking-[-0.05em] text-[#103C70]">
              Subscribe to
              <br />
              our updates
              <span className="text-[#1685D9]">.</span>
            </h2>

            <p className="mt-4 max-w-[370px] text-[16px] font-medium leading-[1.65] text-[#285474]">
              Stay informed about CIPRB&apos;s research,
              programmes and initiatives for safer
              communities.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-6 max-w-[390px] space-y-3"
            >
              <label className="relative block">
                <span className="sr-only">Your name</span>

                <UserRound
                  size={19}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#5985AA]"
                />

                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  autoComplete="name"
                  required
                  className="h-[54px] w-full rounded-[15px] border border-[#BBD9F0] bg-white/85 pl-12 pr-4 text-[15px] font-medium text-[#163653] shadow-sm outline-none placeholder:text-[#6A91AF] focus:border-[#0C64D5] focus:ring-2 focus:ring-[#0C64D5]/10"
                />
              </label>

              <label className="relative block">
                <span className="sr-only">
                  Your email address
                </span>

                <Mail
                  size={19}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#5985AA]"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Your email address"
                  autoComplete="email"
                  required
                  className="h-[54px] w-full rounded-[15px] border border-[#BBD9F0] bg-white/85 pl-12 pr-4 text-[15px] font-medium text-[#163653] shadow-sm outline-none placeholder:text-[#6A91AF] focus:border-[#0C64D5] focus:ring-2 focus:ring-[#0C64D5]/10"
                />
              </label>

              <button
                type="submit"
                className="group flex h-[54px] w-full items-center justify-center gap-3 rounded-[15px] bg-[#0C4DA2] text-[16px] font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0B65C7] motion-reduce:transform-none"
              >
                Subscribe
                <ArrowUpRight size={19} />
              </button>

              {formMessage && (
                <p role="status" className="text-sm text-[#285474]">
                  {formMessage}
                </p>
              )}
            </form>
          </div>

          {/* About */}
          <div>
            <FooterHeading>About CIPRB</FooterHeading>

            <p className="max-w-[360px] text-[17px] font-medium leading-[1.65] text-[#285474]">
              The Centre for Injury Prevention and
              Research, Bangladesh (CIPRB) is a world
              leading injury prevention organisation
              based in Bangladesh.
            </p>

            <div className="mt-6 border-l-[3px] border-[#2299E8] pl-4">
              <p className="font-serif text-[23px] leading-[1.35] tracking-[-0.02em] text-[#114C87]">
                Building safer lives through research and prevention.
              </p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <FooterHeading>Contact Us</FooterHeading>

            <div className="space-y-4 text-[16px] font-medium leading-[1.55] text-[#285474]">
              <div className="flex items-start gap-3">
                <MapPin size={20} className="mt-1 shrink-0 text-[#0C64D5]" />
                <span>
                  H#B120, Road#7, New DOHS,
                  <br />
                  Mohakhali, Dhaka 1207
                </span>
              </div>

              <div className="flex items-start gap-3">
                <Globe2 size={20} className="mt-1 shrink-0 text-[#0C64D5]" />
                <span>www.ciprb.org</span>
              </div>

              <div className="flex items-start gap-3">
                <Mail size={20} className="mt-1 shrink-0 text-[#0C64D5]" />
                <a href="mailto:info@ciprb.org" className="hover:text-[#0C4DA2]">
                  info@ciprb.org
                </a>
              </div>

              <div className="flex items-start gap-3">
                <Phone size={20} className="mt-1 shrink-0 text-[#0C64D5]" />
                <a href="tel:+880258814988" className="hover:text-[#0C4DA2]">
                  +880 258814988
                </a>
              </div>

              <div className="flex items-start gap-3">
                <Clock3 size={20} className="mt-1 shrink-0 text-[#0C64D5]" />
                <span>Sun - Thu: 8.30am to 5.00pm</span>
              </div>
            </div>
          </div>

          {/* Follow Us */}
          <div>
            <FooterHeading>Follow Us</FooterHeading>

            <p className="max-w-[260px] text-[16px] font-medium leading-[1.65] text-[#285474]">
              Connect with CIPRB and follow our journey.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <SocialButton label="Facebook">
                <FacebookIcon />
              </SocialButton>

              <SocialButton label="X">
                <XIcon />
              </SocialButton>

              <SocialButton label="YouTube">
                <YouTubeIcon />
              </SocialButton>
            </div>

            {/* Small original CIPRB logo */}
            <div className="mt-9 flex flex-col items-start gap-5">
              <span
                aria-hidden="true"
                className="h-px w-[185px] max-w-full bg-gradient-to-r from-[#76B8E9]/65 to-transparent"
              />

              <Image
                src={`${BASE_PATH}/images/ciprb-logo.png`}
                alt="CIPRB"
                width={320}
                height={92}
                unoptimized
                className="h-auto w-[170px] max-w-full object-contain sm:w-[185px]"
              />
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-[#BBDDF4]/75 pt-5 text-[14px] font-medium text-[#356184] sm:flex-row">
          <p>© 2026 CIPRB. All Rights Reserved.</p>

          <p className="text-center sm:text-right">
            Centre for Injury Prevention and Research, Bangladesh
          </p>
        </div>
      </div>
    </footer>
  );
}
