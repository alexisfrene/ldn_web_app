import { Icons } from '@components';

export const LoadingButton = ({ text }: { text: string }) => (
  <div className="flex items-center justify-center space-x-2">
    <Icons type="refresh" className="h-5 w-5 animate-spin" />
    <span>{text}</span>
  </div>
);
