# CIPRB prototype foundation

Local initialization for the Centre for Injury Prevention and Research,
Bangladesh tender demonstration. No landing page sections or animation
behavior have been implemented.

## Windows PowerShell

Use the `.cmd` wrappers if PowerShell blocks npm's `.ps1` scripts:

```powershell
Set-Location -LiteralPath 'E:\CIPRB'
npm.cmd ci
npm.cmd run dev
```

Open the local URL printed by Next.js. Stop the server with Ctrl+C.

```powershell
npm.cmd run lint
npm.cmd run typecheck
npm.cmd run build
npm.cmd run start
npm.cmd ls --depth=0
```

Node.js 20.9 or newer is required. Exact package versions are recorded in
`package.json` and the committed-ready `package-lock.json`.

## Foundation

- App Router under `src/app`; layout and page are Server Components.
- Strict TypeScript and the `@/*` alias resolve into `src/*`.
- Tailwind CSS uses the PostCSS integration and CSS-first theme configuration.
- Configurable provisional colors, typography, and spacing live in
  `src/styles/tokens.css`. The blue is not an official CIPRB color.
- Inter uses `next/font/local` with two checked-in font weights for deterministic,
  self-hosted output. Add additional weights only when the design needs them.
- Metadata identifies the prototype and requests no indexing. It does not
  provide access control. Final deployment URLs and social assets are deferred.
- Use `next/image` when the user supplies photography; no image assets or
  speculative remote image hosts are configured.
- Empty architectural directories are retained with `.gitkeep` files.

## Later implementation boundaries

The GSAP package includes ScrollTrigger. GSAP, Lenis, SplitType, and Lucide
React are installed but not imported into the shell. No smooth scrolling,
animation provider, text splitting, motion hooks, or client boundaries exist yet.

When animation is explicitly requested, keep browser-dependent code inside
small Client Components or hooks. Respect reduced-motion preferences, retain
native scrolling, and clean up GSAP contexts/ScrollTriggers, Lenis instances
and ticker callbacks, and SplitType DOM changes on unmount. Favor transforms
and opacity and check mobile performance.

All meaningful photography must come from the user. Verify future organization
content against https://www.ciprb.org/; do not invent claims or statistics.

Continue manually, one file at a time, only when instructed. For every future
implementation step, provide the exact Windows PowerShell command to create
or open the file and its complete contents. Changes require a full replacement,
not partial snippets. Do not add sections, navigation, cards, or animations
until requested.
