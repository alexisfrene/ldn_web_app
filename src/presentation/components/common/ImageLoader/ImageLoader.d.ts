interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  url: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  alt: string;
}
