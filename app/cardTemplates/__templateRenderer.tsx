import React from 'react';
import type { Template } from '.';
import type { Options } from '~/components/Options';

type TemplateRendererProps = {
  template: Template | undefined; // template can be undefined
  data: any;
  position: 'front' | 'back';
  options?:Options
};

const TemplateRenderer: React.FC<TemplateRendererProps> = ({ template, data, position, options }) => {
  if (!template) {
    return <div>Loading template...</div>; // Or a more appropriate loading indicator
  }

  const TemplateComponent = template[position]?.component;

  if (!TemplateComponent) {
    return <div>Template component not found for position: {position}</div>;
  }

  return <TemplateComponent back={data} front={data} options={options ?? {}}  />;
};

export default TemplateRenderer;