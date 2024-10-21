interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  url: string;
  width?: number;
  height?: number;
  className?: string;
  alt: string;
}
