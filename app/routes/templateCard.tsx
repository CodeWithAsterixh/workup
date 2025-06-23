import { useEffect, useState } from "react";
import notfound from "~/NotFounds";
import templates from "~/cardTemplates";
import TemplateLayout from "~/components/TemplateLayout";
import Loading from "~/components/loading";
import type { Route } from "./+types/templateCard";


export default function Template({ params }: Route.ComponentProps) {
  const template = templates[params.id];

  const [status, setStatus] = useState<"loading" | "done">("loading");

  useEffect(() => {
    if (template) {
      setStatus("done");
    }
  }, [template]);

  if (status === "loading") {
    return <Loading />;
  }
  if (!template) {
    return <notfound.template id={params.id} />;
  }

  return (
    <>{
      typeof params.id === "string" &&
    template && <TemplateLayout template={template} templateId={params.id} />
    }
    <title>{`${typeof params.id === "string"?params.id:""} | Workup`}</title>
    <meta name="description" content={`Use the ${typeof params.id === "string"?params.id:""} template for your business`}/>
    </>
  );
}
