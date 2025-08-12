import type { ImageComponent as ImageComponentType } from "@shared/schema";

interface ImageComponentProps {
  component: ImageComponentType;
}

export default function ImageComponent({ component }: ImageComponentProps) {
  const { src, alt, className, width, height } = component.props;

  return (
    <img
      src={src}
      alt={alt}
      className={className || ''}
      width={width}
      height={height}
      data-testid={`image-${component.id}`}
    />
  );
}
