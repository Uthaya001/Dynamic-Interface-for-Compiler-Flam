import { Fragment } from "react";
import FormComponent from "@/components/dynamic-components/form-component";
import TextComponent from "@/components/dynamic-components/text-component";
import ImageComponent from "@/components/dynamic-components/image-component";
import type { Component } from "@shared/schema";

interface ComponentFactoryProps {
  components: Component[];
}

export default function ComponentFactory({ components }: ComponentFactoryProps) {
  const renderComponent = (component: Component) => {
    switch (component.type) {
      case 'form':
        return <FormComponent key={component.id} component={component} />;
      case 'text':
        return <TextComponent key={component.id} component={component} />;
      case 'image':
        return <ImageComponent key={component.id} component={component} />;
      default:
        const unknownComponent = component as any;
        return (
          <div key={unknownComponent.id || 'unknown'} className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600">Unknown component type</p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-8" data-testid="component-factory">
      {components.map((component) => (
        <Fragment key={component.id}>
          {renderComponent(component)}
        </Fragment>
      ))}
    </div>
  );
}
