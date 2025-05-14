import React from "react";
import { HashLoader } from "./HashLoader";

interface Props {
  isLoading: boolean;
}

export const LoadingIndicator: React.FC<Props> = ({ isLoading }) => {
  return (
    isLoading && (
      <div className="absolute left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-slate-300/50 dark:bg-slate-400/40">
        <HashLoader />
      </div>
    )
  );
};
