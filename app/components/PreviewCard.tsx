import React, { useCallback, useEffect, useRef, useState } from "react";
import type { previewGeneratorProcess } from "~/lib/types";
import html2canvas from "html2canvas";
import { cn, debounce } from "~/lib/utils";
type Props = {
  children: React.ReactNode;
  status?: previewGeneratorProcess;
  setProcess?: (process: previewGeneratorProcess) => void;
  setPreview?:(preview: string) => void;
};

export default function PreviewCard({ children, setProcess, status,setPreview }: Readonly<Props>) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [previewImage, setPreviewImage] = useState<string>();
  const [previewProcess, setPreviewProcess] = useState<previewGeneratorProcess>(
    status || "loading"
  );


  const debouncedProcess = useCallback(
    debounce(async () => {
      const element = elementRef.current;
      if (element) {
        try {
          await html2canvas(element,{scale:2, backgroundColor:"rgba(0,0,0,0)"}).then((canvas) => {
            canvas.toBlob((blob) => {
              if (blob) {
                const url = URL.createObjectURL(blob);
                setPreviewImage(url);
                setPreviewProcess("ready");
                setProcess?.("ready");
                setPreview?.(url)
              } else {
                setPreviewProcess("error");
                setProcess?.("error");
              }
            });
          });
        } catch {
          setPreviewProcess("error");
          setProcess?.("error");
        }
      }
    }, 500), // Wait 500ms after last update before generating preview
    []
  );

  useEffect(() => {
    if (!previewImage || status === "updating") {
      setPreviewProcess("updating");
      setProcess?.("updating");
      debouncedProcess();
    }
  }, [status, debouncedProcess]);

  return (
    <>
      <div
        ref={elementRef}
        style={
          {
            position: 'absolute',
            left: '-9999px',
            top: 0,
            height: 'auto',
            width: 'auto',
            opacity: 1
          }
        }
      >
        {children}
      </div>
      <div className={
        cn(
          "w-full max-w-fit max-h-full relative",
          !previewImage&&"h-52 max-w-full"
        )
      }>
        <img className={
          cn(
            "previewImage",
            previewProcess === "ready" ?"":"loading"
          )
        } src={previewImage} alt="Preview" />
        {previewProcess !== "ready" && (
          <span className="size-full absolute top-0 flex gap-2 text-secondary items-center justify-center">
            <i className="pi pi-spinner text-secondary animate-spin"></i>
            {previewProcess}
          </span>
        )}
      </div>
    </>
  );
}
