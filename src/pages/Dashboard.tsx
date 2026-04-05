import { useEffect, useRef, useState } from "react";

export default function Dashboard() {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [frameHeight, setFrameHeight] = useState(1600);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const updateHeight = () => {
      try {
        const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;
        if (!iframeDocument) return;

        const nextHeight = Math.max(
          iframeDocument.documentElement.scrollHeight,
          iframeDocument.body.scrollHeight,
          1200
        );

        setFrameHeight(nextHeight);
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
    <div className="min-h-screen bg-transparent px-0 py-0">
      <iframe
        ref={iframeRef}
        src="/admin-dashboard-reference.html"
        title="Admin Dashboard Reference"
        className="block w-full rounded-none border-0 bg-transparent"
        style={{ height: `${frameHeight}px` }}
      />
    </div>
  );
}
