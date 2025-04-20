import React from "react";
import templates from "~/cardTemplates";
import { Link } from "react-router";
import PreviewCard from "~/components/PreviewCard";
import TemplateRenderer from "~/cardTemplates/__templateRenderer";

type Props = {};

export default function Templates({}: Props) {
  return (
    <main className="templates-page">
      <h1>Available Templates</h1>
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
    </main>
  );
}
