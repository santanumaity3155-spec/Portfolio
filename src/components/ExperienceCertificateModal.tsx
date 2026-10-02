import React, { useEffect, useState } from "react";
import { X, Download, Linkedin, ExternalLink, Award, FileText } from "lucide-react";

export interface ExperienceCertificateDoc {
  label: string;
  preview: string;
  file: string;
  downloadName: string;
  certificateId?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  domain?: string;
  duration?: string;
  dateRange?: string;
  points: string[];
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  certificatePreview?: string;
  certificateFile?: string;
  downloadName?: string;
  certificateId?: string;
  employeeId?: string;
  projectManager?: string;
  linkedinUrl?: string;
  additionalCertificates?: ExperienceCertificateDoc[];
}

interface ExperienceCertificateModalProps {
  experience: ExperienceItem;
  onClose: () => void;
}

export function ExperienceCertificateModal({ experience, onClose }: ExperienceCertificateModalProps) {
  // If experience has multiple certificates (like Infotact having Internship & Training), allow switching
  const [activeDocIndex, setActiveDocIndex] = useState<number>(0);

  // Close on Escape key press and lock background scrolling
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

  const allDocs = [
    ...(experience.certificatePreview && experience.certificateFile
      ? [
          {
            label: "Internship Certificate",
            preview: experience.certificatePreview,
            file: experience.certificateFile,
            downloadName: experience.downloadName || "Certificate.pdf",
            certificateId: experience.certificateId,
          },
        ]
      : []),
    ...(experience.additionalCertificates || []),
  ];

  const currentDoc = allDocs[activeDocIndex] || allDocs[0] || {
    label: "Certificate",
    preview: experience.certificatePreview || "",
    file: experience.certificateFile || "",
    downloadName: experience.downloadName || "Certificate.pdf",
    certificateId: experience.certificateId,
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="experience-cert-modal-title"
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
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5 bg-white/[0.02]">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="text-xs font-mono uppercase tracking-wider font-semibold"
              style={{ color: experience.color }}
            >
              {experience.organization}
            </span>
            <span className="text-muted-foreground/60">•</span>
            <span className="text-xs text-muted-foreground">{experience.role}</span>
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

        {/* Multi-document Tabs (if more than 1 certificate available) */}
        {allDocs.length > 1 && (
          <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.01] px-5 py-2">
            {allDocs.map((doc, idx) => (
              <button
                key={doc.label}
                type="button"
                onClick={() => setActiveDocIndex(idx)}
                className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition cursor-pointer ${
                  activeDocIndex === idx
                    ? "bg-white/15 text-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                }`}
              >
                <Award className="h-3.5 w-3.5 text-[var(--neon,#38bdf8)]" />
                {doc.label}
              </button>
            ))}
          </div>
        )}

        {/* Modal Body: Full Image Display */}
        <div className="overflow-y-auto p-4 sm:p-6 flex flex-col items-center">
          <div className="relative flex w-full items-center justify-center rounded-xl bg-black/50 p-2 sm:p-4 border border-white/5 shadow-inner">
            <img
              src={currentDoc.preview}
              alt={`${experience.organization} - ${currentDoc.label}`}
              className="max-h-[60vh] sm:max-h-[66vh] w-auto max-w-full rounded-lg object-contain shadow-2xl"
            />
          </div>

          {/* Certificate Metadata */}
          <div className="mt-5 w-full text-center space-y-2">
            <h2
              id="experience-cert-modal-title"
              className="font-display text-lg sm:text-xl font-bold tracking-tight text-foreground"
            >
              {experience.role} — {currentDoc.label}
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs sm:text-sm text-muted-foreground">
              <span>
                Organization: <strong className="text-foreground/90 font-medium">{experience.organization}</strong>
              </span>
              <span>•</span>
              <span>
                Timeline: <span className="text-foreground/80">{experience.dateRange}</span>
              </span>
              {currentDoc.certificateId && (
                <>
                  <span>•</span>
                  <span className="font-mono text-[11px] sm:text-xs">
                    Certificate ID:{" "}
                    <span className="text-[var(--neon,#38bdf8)] font-semibold">{currentDoc.certificateId}</span>
                  </span>
                </>
              )}
              {experience.employeeId && (
                <>
                  <span>•</span>
                  <span className="font-mono text-[11px] sm:text-xs">
                    Employee ID:{" "}
                    <span className="text-[var(--ember,#f59e0b)] font-semibold">{experience.employeeId}</span>
                  </span>
                </>
              )}
              {experience.projectManager && (
                <>
                  <span>•</span>
                  <span>
                    Project Manager:{" "}
                    <strong className="text-foreground/90 font-medium">{experience.projectManager}</strong>
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer with Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3 border-t border-white/10 px-5 py-4 bg-white/[0.02]">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-white/15 bg-white/5 px-5 py-2 text-xs font-semibold text-foreground transition hover:bg-white/10 cursor-pointer"
          >
            CLOSE
          </button>

          {currentDoc.file && (
            <a
              href={currentDoc.file}
              download={currentDoc.downloadName}
              className="inline-flex items-center gap-2 rounded-lg bg-[image:var(--gradient-primary)] px-5 py-2 text-xs font-semibold text-primary-foreground transition hover:scale-[1.02] cursor-pointer"
            >
              <Download className="h-3.5 w-3.5" />
              DOWNLOAD CERTIFICATE
            </a>
          )}

          {experience.linkedinUrl && (
            <a
              href={experience.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#0077b5]/50 bg-[#0077b5]/15 px-4 py-2 text-xs font-semibold text-[#38bdf8] transition hover:bg-[#0077b5]/30 hover:scale-[1.02] cursor-pointer"
            >
              <Linkedin className="h-3.5 w-3.5" />
              VIEW ON LINKEDIN
              <ExternalLink className="h-3 w-3 opacity-70" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
