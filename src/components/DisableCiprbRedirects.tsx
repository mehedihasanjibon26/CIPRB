"use client";

import { useEffect } from "react";

export default function DisableCiprbRedirects() {
  useEffect(() => {
    const isOriginalCiprbUrl = (value: string): boolean => {
      try {
        const url = new URL(value, window.location.href);
        const host = url.hostname.toLowerCase();

        return (
          host === "ciprb.org" ||
          host === "www.ciprb.org"
        );
      } catch {
        return false;
      }
    };

    const blockNavigation = (event: MouseEvent) => {
      const target = event.target;

      if (!(target instanceof Element)) return;

      const link = target.closest("a[href]");

      if (!link) return;

      const href = link.getAttribute("href");

      if (!href || !isOriginalCiprbUrl(href)) return;

      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
    };

    const blockFormSubmit = (event: SubmitEvent) => {
      const form = event.target;

      if (!(form instanceof HTMLFormElement)) return;

      if (!isOriginalCiprbUrl(form.action)) return;

      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
    };

    document.addEventListener("click", blockNavigation, true);
    document.addEventListener("auxclick", blockNavigation, true);
    document.addEventListener("submit", blockFormSubmit, true);

    return () => {
      document.removeEventListener("click", blockNavigation, true);
      document.removeEventListener("auxclick", blockNavigation, true);
      document.removeEventListener("submit", blockFormSubmit, true);
    };
  }, []);

  return null;
}
