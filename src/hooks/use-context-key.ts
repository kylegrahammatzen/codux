import { useMemo } from "react";
import { usePathname, useParams } from "next/navigation";

const STORAGE_KEY = "tambo-home-context-key";

function createContextKey(prefix: string) {
  const randomUUID =
    typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;

  return `${prefix}-${randomUUID}`;
}

/**
 * Returns a contextKey for the current route:
 * - Home page: persistent "home-{uuid}" from localStorage
 * - Project pages: "project-{projectId}"
 */
export function useContextKey() {
  const pathname = usePathname();
  const params = useParams();

  const contextKey = useMemo(() => {
    if (typeof window === "undefined") {
      return null;
    }

    // For project pages, use the projectId as contextKey
    if (pathname?.startsWith("/project/") && params?.projectId) {
      return `project-${params.projectId}`;
    }

    // For home page, use persistent contextKey from localStorage
    const prefix = "home";
    const prefixWithSeparator = `${prefix}-`;

    try {
      const existing = window.localStorage.getItem(STORAGE_KEY);
      if (existing && existing.startsWith(prefixWithSeparator)) {
        return existing;
      }
    } catch {
      // Ignore storage read errors and fall back to generating a volatile key.
    }

    const newKey = createContextKey(prefix);
    try {
      window.localStorage.setItem(STORAGE_KEY, newKey);
    } catch {
      // Ignore storage write errors; the key will remain in-memory for this session.
    }

    return newKey;
  }, [pathname, params]);

  return contextKey;
}
