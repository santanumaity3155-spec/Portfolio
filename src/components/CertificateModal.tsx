import React, { useEffect } from "react";
import { X, Download } from "lucide-react";

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  platform?: string;
  date: string;
  preview: string;
  file: string | null;
  downloadName: string | null;
  credentialId: string | null;
  category: string;
}

interface CertificateModalProps {
  certificate: CertificateItem;
  onClose: () => void;
}

export function CertificateModal({ certificate, onClose }: CertificateModalProps) {
  // Close on ESC key press and lock background scrolling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cert-modal-title"
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-black/85 p-3 sm:p-6 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="relative my-auto flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-[var(--background,#0b0f17)] text-foreground shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header with Close Button */}
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5 bg-white/[0.02]">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[var(--neon,#38bdf8)] uppercase tracking-wider font-semibold">
              {certificate.issuer}
              {certificate.platform ? ` • ${certificate.platform}` : ""}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="rounded-lg p-1.5 text-muted-foreground transition hover:bg-white/10 hover:text-foreground cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--neon,#38bdf8)]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body: Full Image Display */}
        <div className="overflow-y-auto p-4 sm:p-6 flex flex-col items-center">
          <div className="relative flex w-full items-center justify-center rounded-xl bg-black/50 p-2 sm:p-4 border border-white/5 shadow-inner">
            <img
              src={certificate.preview}
              alt={`${certificate.title} Full Certificate`}
              className="max-h-[60vh] sm:max-h-[66vh] w-auto max-w-full rounded-lg object-contain shadow-2xl"
            />
          </div>

          {/* Certificate Metadata */}
          <div className="mt-5 w-full text-center space-y-2">
            <h2 id="cert-modal-title" className="font-display text-lg sm:text-xl font-bold tracking-tight text-foreground">
              {certificate.title}
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs sm:text-sm text-muted-foreground">
              <span>
                Issued by: <strong className="text-foreground/90 font-medium">{certificate.issuer}</strong>
              </span>
              <span>•</span>
              <span>
                Date: <span className="text-foreground/80">{certificate.date}</span>
              </span>
              {certificate.credentialId && (
                <>
                  <span>•</span>
                  <span className="font-mono text-[11px] sm:text-xs">
                    Credential ID: <span className="text-[var(--neon,#38bdf8)]">{certificate.credentialId}</span>
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer with Actions */}
        <div className="flex items-center justify-center gap-3 border-t border-white/10 px-5 py-4 bg-white/[0.02]">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-white/15 bg-white/5 px-6 py-2 text-xs font-semibold text-foreground transition hover:bg-white/10 cursor-pointer"
          >
            CLOSE
          </button>
          {certificate.file && (
            <a
              href={certificate.file}
              download={certificate.downloadName || undefined}
              className="inline-flex items-center gap-2 rounded-lg bg-[image:var(--gradient-primary)] px-5 py-2 text-xs font-semibold text-primary-foreground transition hover:scale-[1.02] cursor-pointer"
            >
              <Download className="h-3.5 w-3.5" /> DOWNLOAD ORIGINAL
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
