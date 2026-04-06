import { useEffect, useRef, useState } from "react";

const DASHBOARD_CROP_TOP = 88;
const DASHBOARD_CROP_LEFT = 0;

export default function Dashboard() {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [frameHeight, setFrameHeight] = useState(1600);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const hideChrome = (iframeDocument: Document) => {
      const injectedStyle = iframeDocument.createElement("style");
      injectedStyle.setAttribute("data-social-swift-dashboard-cleanup", "true");
      injectedStyle.textContent = `
        header,
        aside,
        nav[aria-label*="breadcrumb" i],
        [aria-label*="breadcrumb" i] {
          display: none !important;
        }

        html,
        body {
          overflow-x: hidden !important;
        }

        body > div,
        body > section,
        body > main,
        main {
          max-width: none !important;
        }

        main {
          width: 100% !important;
          margin: 0 !important;
          padding-top: 0 !important;
        }
      `;

      iframeDocument.head.appendChild(injectedStyle);

      const hideElement = (element: Element | null) => {
        if (!(element instanceof HTMLElement)) return;
        element.style.setProperty("display", "none", "important");
      };

      const normalizeText = (value: string) => value.replace(/\s+/g, " ").trim().toLowerCase();

      const findElementByText = (text: string) => {
        const target = normalizeText(text);

        return Array.from(iframeDocument.querySelectorAll("body *")).find((element) => {
          const currentText = normalizeText(element.textContent ?? "");
          if (currentText !== target) return false;

          const rect = element.getBoundingClientRect();
          return rect.top < 360 && rect.width < 320 && rect.height < 120;
        });
      };

      const hideClosestContainer = (element: Element | undefined, maxWidth: number) => {
        let current = element;

        while (current && current !== iframeDocument.body) {
          const rect = current.getBoundingClientRect();
          if (rect.width > 0 && rect.width <= maxWidth && rect.height <= 220) {
            hideElement(current);
            return;
          }

          current = current.parentElement ?? undefined;
        }
      };

      const findSharedContainer = (labels: string[], maxWidth: number) => {
        const matches = labels
          .map((label) => findElementByText(label))
          .filter((element): element is Element => Boolean(element));

        if (matches.length < 2) return null;

        let current = matches[0].parentElement;
        while (current && current !== iframeDocument.body) {
          const containsAll = matches.every((element) => current?.contains(element));
          if (containsAll) {
            const rect = current.getBoundingClientRect();
            if (rect.width > 0 && rect.width <= maxWidth && rect.height >= 300) {
              return current;
            }
          }

          current = current.parentElement;
        }

        return null;
      };

      iframeDocument.querySelectorAll("header, aside").forEach((element) => hideElement(element));
      hideClosestContainer(findElementByText("Dashboard"), 360);
      hideClosestContainer(findElementByText("Overview"), 420);
      hideClosestContainer(findElementByText("AI Assistant"), 420);
      hideElement(
        findSharedContainer(
          ["Overview", "AI Assistant", "Admin Management", "Settings"],
          420
        )
      );

      const mainElement = iframeDocument.querySelector("main");
      if (mainElement instanceof HTMLElement) {
        mainElement.style.setProperty("width", "100%", "important");
        mainElement.style.setProperty("max-width", "none", "important");
        mainElement.style.setProperty("margin", "0", "important");
      }
    };

    const updateHeight = () => {
      try {
        const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;
        if (!iframeDocument) return;

        if (!iframeDocument.querySelector("[data-social-swift-dashboard-cleanup]")) {
          hideChrome(iframeDocument);
        }

        const nextHeight = Math.max(
          iframeDocument.documentElement.scrollHeight,
          iframeDocument.body.scrollHeight,
          1200
        );

        setFrameHeight(nextHeight - DASHBOARD_CROP_TOP);
      } catch {
        setFrameHeight(1600);
      }
    };

    iframe.addEventListener("load", updateHeight);
    const timeoutId = window.setTimeout(updateHeight, 400);

    return () => {
      iframe.removeEventListener("load", updateHeight);
      window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="min-h-screen overflow-hidden bg-transparent px-0 py-0">
      <iframe
        ref={iframeRef}
        src="/admin-dashboard-reference.html"
        title="Admin Dashboard Reference"
        scrolling="no"
        className="block w-full rounded-none border-0 bg-transparent"
        style={{
          height: `${frameHeight + DASHBOARD_CROP_TOP}px`,
          width: "100%",
          marginTop: `-${DASHBOARD_CROP_TOP}px`,
          marginLeft: `-${DASHBOARD_CROP_LEFT}px`,
        }}
      />
    </div>
  );
}
