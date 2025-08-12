import type { TextComponent as TextComponentType } from "@shared/schema";

interface TextComponentProps {
  component: TextComponentType;
}

export default function TextComponent({ component }: TextComponentProps) {
  const { variant, content, className } = component.props;

  const baseClasses = className || '';
  
  const Element = variant as keyof JSX.IntrinsicElements;

  return (
    <Element 
      className={baseClasses}
      data-testid={`text-${component.id}`}
    >
      {content}
    </Element>
  );
}
