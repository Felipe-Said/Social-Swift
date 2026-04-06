import { useEffect, useRef, useState } from "react";

const DASHBOARD_CROP_TOP = 88;
const DASHBOARD_CROP_LEFT = 0;

export default function Dashboard() {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [frameHeight, setFrameHeight] = useState(1600);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    let iframeWindow: Window | null = null;
    let wheelHandler: ((event: WheelEvent) => void) | null = null;

    const getLocationLabel = () => {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const city = timezone?.split("/").pop()?.replace(/_/g, " ") || "sua regiao";
      return { city, timezone };
    };

    const formatClock = () =>
      new Intl.DateTimeFormat("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(new Date());

    const formatDate = () =>
      new Intl.DateTimeFormat("pt-BR", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
      }).format(new Date());

    const updateHeroCard = (iframeDocument: Document) => {
      const heroCard = iframeDocument.querySelector("[data-social-swift-hero-card]");
      if (!(heroCard instanceof HTMLElement)) return;

      const heading = heroCard.querySelector('[data-role="hero-title"]');
      const subtitle = heroCard.querySelector('[data-role="hero-subtitle"]');
      const time = heroCard.querySelector('[data-role="hero-time"]');
      const cityText = heroCard.querySelector('[data-role="hero-city"]');
      const label = heroCard.querySelector('[data-role="hero-label"]');
      const timezoneText = heroCard.querySelector('[data-role="hero-timezone"]');
      const dateTextNode = heroCard.querySelector('[data-role="hero-date"]');

      const { city, timezone } = getLocationLabel();
      const timeText = formatClock();
      const dateText = formatDate();

      if (heading instanceof HTMLElement) {
        heading.textContent = `Agora em ${city}`;
      }

      if (subtitle instanceof HTMLElement) {
        subtitle.textContent = "Horario local atualizado automaticamente";
      }

      if (time instanceof HTMLElement) {
        time.textContent = timeText;
      }

      if (cityText instanceof HTMLElement) {
        cityText.textContent = city;
      }

      if (label instanceof HTMLElement) {
        label.textContent = "Localizacao atual";
      }

      if (timezoneText instanceof HTMLElement) {
        timezoneText.textContent = timezone;
      }

      if (dateTextNode instanceof HTMLElement) {
        dateTextNode.textContent = dateText;
      }
    };

    const hideChrome = (iframeDocument: Document) => {
      const iframeWindow = iframe.contentWindow;
      if (!iframeWindow) return;

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

        footer {
          display: none !important;
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

      const dashboardRoot = iframeDocument.getElementById("dashboard-root");
      if (dashboardRoot instanceof HTMLElement) {
        dashboardRoot.style.setProperty("width", "100%", "important");
        dashboardRoot.style.setProperty("max-width", "none", "important");
        dashboardRoot.style.setProperty("padding-inline-start", "0", "important");
        dashboardRoot.style.setProperty("padding-left", "0", "important");
        dashboardRoot.style.setProperty("margin-left", "0", "important");

        const leftRail = dashboardRoot.previousElementSibling;
        hideElement(leftRail);

        const layoutRow = dashboardRoot.parentElement;
        if (layoutRow instanceof HTMLElement) {
          layoutRow.style.setProperty("display", "block", "important");
          layoutRow.style.setProperty("padding-left", "0", "important");
          layoutRow.style.setProperty("margin-left", "0", "important");
          layoutRow.style.setProperty("gap", "0", "important");
        }
      }

      updateHeroCard(iframeDocument);
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

    const attachScrollBridge = () => {
      iframeWindow = iframe.contentWindow;
      if (!iframeWindow || wheelHandler) return;

      wheelHandler = (event: WheelEvent) => {
        event.preventDefault();
        window.scrollBy({
          top: event.deltaY,
          left: 0,
          behavior: "auto",
        });
      };

      iframeWindow.addEventListener("wheel", wheelHandler, { passive: false });
    };

    iframe.addEventListener("load", () => {
      updateHeight();
      attachScrollBridge();
    });
    const timeoutId = window.setTimeout(updateHeight, 400);
    const secondPassId = window.setTimeout(updateHeight, 1200);
    const clockIntervalId = window.setInterval(() => {
      const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;
      if (!iframeDocument) return;
      updateHeroCard(iframeDocument);
    }, 30000);

    return () => {
      if (iframeWindow && wheelHandler) {
        iframeWindow.removeEventListener("wheel", wheelHandler);
      }
      window.clearTimeout(timeoutId);
      window.clearTimeout(secondPassId);
      window.clearInterval(clockIntervalId);
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
