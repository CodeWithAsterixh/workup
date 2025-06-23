import React from "react";
import templates from "~/cardTemplates";
import { Link } from "react-router";
import PreviewCard from "~/components/PreviewCard";
import TemplateRenderer from "~/cardTemplates/__templateRenderer";
import type { Route } from "./+types/templates";
import { Button } from "~/components/ui/button";
import { ArrowLeft } from "lucide-react";



export default function Templates() {
  return (
    <main className="templates-page">
      <div className="w-full py-5 flex items-center justify-between px-4 sm:px-0 sm:justify-start sticky top-0 lg:top-16 bg-white z-50">
        <Link to={"/"}>
          <Button className="!cursor-pointer" variant={"ghost"}>
            <ArrowLeft /> Back to home
          </Button>
        </Link>
        <h1 className="text-base sm:text-xl font-bold sm:absolute sm:left-1/2 sm:top-1/2 sm:-translate-1/2">
          Available Templates
        </h1>
      </div>
      <div className="templates-grid">
        {Object.entries(templates).map(([key, template]) => (
          <Link to={`/templates/${key}`} className="template-card" key={key}>
            <h2>{key}</h2>
            <div className="template-preview">
              {/* You might want to render a small preview of the card here */}
              {/* <TemplateRenderer template={template} position="front" /> */}
              <PreviewCard>
                <main className="preview">
                  <TemplateRenderer
                    data={template["front"].default}
                    template={template}
                    position={"front"}
                  />
                </main>
              </PreviewCard>
            </div>
          </Link>
        ))}
      </div>
          <title>Templates | Workup</title>
    <meta name="description" content={`Find the best template for your business`}/>
    </main>
  );
}


