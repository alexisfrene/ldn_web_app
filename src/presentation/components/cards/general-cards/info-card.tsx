import React from "react";
import { cn } from "@utils";
import { useIsMobile } from "@hooks/use-mobile";
import { Card, CardContent, CardHeader } from "@ui/card";
import { DotPattern } from "@ui/dot-pattern";
import { Label } from "@ui/label";
import { NumberTicker } from "@ui/number-ticker";

interface Props {
  title: string;
  value: number;
  currency?: boolean;
  valueStyles?: string;
}
export const InfoCard: React.FC<Props> = ({
  title,
  value,
  valueStyles = "",
  currency = false,
}) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="relative rounded-none px-3 pb-1 border">
        <DotPattern
          width={10}
          height={10}
          cx={1}
          cy={1}
          cr={1}
          className={cn(
            "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]",
          )}
        />
        <Label className="min-h-10  sm:text-base">{title}</Label>
        <div className={cn(["text-3xl sm:text-2xl", valueStyles])}>
          {currency ? (
            <div>
              <span>$</span>
              {value === 0 ? (
                <span>0</span>
              ) : (
                <NumberTicker value={value || 0} className={valueStyles} />
              )}
            </div>
          ) : (
            value || 0
          )}
        </div>
      </div>
    );
  }
  return (
    <Card className="relative rounded-none">
      <DotPattern
        width={10}
        height={10}
        cx={1}
        cy={1}
        cr={1}
        className={cn(
          "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]",
        )}
      />
      <CardHeader className="min-h-10 text-xs sm:text-base">{title}</CardHeader>
      <CardContent>
        <div className={cn(["sm:text-2xl", valueStyles])}>
          {currency ? (
            <div>
              <span>$</span>
              {value === 0 ? (
                <span>0</span>
              ) : (
                <NumberTicker value={value || 0} className={valueStyles} />
              )}
            </div>
          ) : (
            value || 0
          )}
        </div>
      </CardContent>
    </Card>
  );
};
