import React, { useEffect } from "react";
import { FormikValues, useFormikContext } from "formik";
import { useDebounce } from "use-debounce";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@ui/tooltip";
import { useCheckAccountName } from "@features/accounts/hooks/use-check-financial-name";
import { Icons } from "../Icons";

export const CheckAvailable: React.FC = () => {
  const { values, setErrors } = useFormikContext<FormikValues>();
  const [debouncedValue, { isPending }] = useDebounce(values.account, 1300);

  const { check_name, isLoading } = useCheckAccountName(debouncedValue);

  const shouldShowWarning = !isLoading && debouncedValue && !check_name;

  useEffect(() => {
    if (shouldShowWarning) {
      setErrors({ account: "Cuenta no disponible" });
    }
  }, [shouldShowWarning, setErrors]);

  const iconProps = {
    height: 25,
    className: "mt-1.5 ml-1.5",
  };

  if (isLoading || isPending()) {
    return (
      <Icons
        type="refresh"
        {...iconProps}
        className={`${iconProps.className} m-0.5 animate-spin`}
      />
    );
  }

  if (!debouncedValue) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Icons
              type="warning"
              {...iconProps}
              className={`${iconProps.className} text-slate-500`}
            />
          </TooltipTrigger>
          <TooltipContent>El nombre es obligatorio</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return check_name ? (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Icons
            type="check_clean"
            {...iconProps}
            className={`${iconProps.className} text-green-400`}
          />
        </TooltipTrigger>
        <TooltipContent>Nombre disponible</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Icons
            type="warning"
            {...iconProps}
            className={`${iconProps.className} text-red-500`}
          />
        </TooltipTrigger>
        <TooltipContent>Cuenta no disponible</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
