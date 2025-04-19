"use client";
import React from "react";
import type { template } from "~/cardTemplates";

type Props = {
  template: template;
  position: "front" | "back";
  data:any
};

export default function TemplateRenderer({ template, position="front",data}: Props) {

  const Component = (template as template)[position].component;

  return <Component {...data} />;
}
