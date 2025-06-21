import React, { useEffect, useState } from "react";
import templates, { type template } from "~/cardTemplates";
import type { Route } from "./+types/templateCard";
import notfound from "~/NotFounds";
import PreviewCard from "~/components/PreviewCard";
import TemplateRenderer from "~/cardTemplates/__templateRenderer";
import type { previewGeneratorProcess } from "~/lib/types";
import TemplateForm, { type FormData } from "~/components/templateForm";
import { useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import Loading from "~/components/loading";
import {ArrowLeft} from "lucide-react"
import { Link } from "react-router";



export default function Template({ params }: Route.ComponentProps) {
  const template = templates[params.id];
  const [selectedSlide, setSelectedSlide] = useState<"front" | "back">("front");
  const [process, setProcess] = useState<previewGeneratorProcess>("loading");
  const [preview, setPreview] = useState<string>()
  const [status, setStatus] = useState<"loading"|"done">("loading")


  const defaultValues = template?{
    ...template["front"].default,
    ...template["back"].default,
  }:{};
  const form = useForm<FormData>({
    defaultValues: defaultValues,
  });
  const [formValues, setFormValues] = useState<FormData>(defaultValues);

  // Watch for form changes and update formValues
  useEffect(() => {
    const subscription = form.watch((value) => {
      setFormValues(value as FormData);
      setProcess("updating");
    });

    return () => subscription.unsubscribe();
  }, [form.watch]);

  
  useEffect(() => {
    if(template){
      setStatus("done")
    }
  }, [template])
  
  
  if (status==="loading") {
    return <Loading />;
  }
  if (!template) {
    return <notfound.template id={params.id} />;
  }
 

  const handleSlide = (slide:typeof selectedSlide)=>{
    setSelectedSlide(slide)
    setProcess("updating")
  }
  const onSubmit = (formData: FormData)=>{
  }
  const handleDownload = async () => {
    if (!preview) return;

    try {
      // Convert preview URL to blob
      const response = await fetch(preview);
      const blob = await response.blob();
      
      // Generate filename
      const filename = `business-card-${selectedSlide}-${Date.now()}.png`;
      
      // Save file
      const tempLink = document.createElement('a');
        tempLink.href = preview;
        tempLink.download = filename;
        tempLink.click();
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  const handleShare = async () => {
    if (!preview) return;

    try {
      // Check if Web Share API is available
      if (navigator.share) {
        const response = await fetch(preview);
        const blob = await response.blob();
        const file = new File([blob], 'business-card.png', { type: 'image/png' });

        await navigator.share({
          title: 'Business Card',
          text: 'Check out my business card!',
          files: [file]
        });
      } else {
        // Fallback for browsers that don't support Web Share API
        const tempLink = document.createElement('a');
        tempLink.href = preview;
        tempLink.target = '_blank';
        tempLink.click();
      }
    } catch (error) {
      console.error('Error sharing image:', error);
    }
  };

  return (
    <main className="template-area">
      <div className="w-full py-5 max-w-5xl flex items-center sticky top-0 bg-white z-50">
        <Link to={"/templates"}><Button className="!cursor-pointer" variant={"ghost"} ><ArrowLeft/> Back</Button></Link>
        <h1 className="text-xl font-bold absolute left-1/2 top-1/2 -translate-1/2">{params.id}</h1>
      </div>
      <section className="template-content">
        <TemplateForm submit={onSubmit}
          form={form}
          data={defaultValues}/>
        <article className="content-display">
          <header>
            <strong>Preview</strong>
            <em>{selectedSlide} side</em>
          </header>
         <PreviewCard setPreview={setPreview} setProcess={setProcess} status={process}>
         <main className="preview">
         <TemplateRenderer data={formValues} // Use combined form values
                template={template}
                position={selectedSlide}/>
         </main>
         </PreviewCard>
         <div className="flex gap-2 mt-4 justify-center">
            <Button
              variant="outline"
              onClick={handleDownload}
              className="flex items-center gap-2"
            >
              <i className="pi pi-download text-sm"></i>
              Download
            </Button>
            <Button
              variant="outline"
              onClick={handleShare}
              className="flex items-center gap-2"
            >
              <i className="pi pi-share-alt text-sm"></i>
              Share
            </Button>
          </div>
        </article>
      </section>
      <nav className="template-edit-slide">
        <button
          onClick={() => handleSlide("back")}
          className={`${
            selectedSlide === "back" ? "template-edit-slide-selected" : ""
          } template-edit-slide_back`.trim()}
        >
          Back
        </button>
        <button
          onClick={() => handleSlide("front")}
          className={`${
            selectedSlide === "front" ? "template-edit-slide-selected" : ""
          } template-edit-slide_front`.trim()}
        >
          Front
        </button>
      </nav>
    </main>
  );
}
