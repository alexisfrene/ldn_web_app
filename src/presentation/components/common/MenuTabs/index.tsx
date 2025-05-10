import React, { ReactNode } from "react";
import { cn } from "@utils";
import { Label } from "@ui/label";
import { Tabs, TabsList, TabsTrigger } from "@ui/tabs";

interface Props {
  tabs: string[];
  children: ReactNode;
  containerStyle?: string;
  tabStyle?: string;
}

export const MenuTabs: React.FC<Props> = ({
  children,
  tabs,
  containerStyle,
  tabStyle,
}) => {
  const tabasStyles = cn([
    "mb-3 grid sm:min-h-14",
    `grid-cols-${tabs.length}`,
    containerStyle,
  ]);
  return (
    <Tabs defaultValue={tabs[0]}>
      <TabsList className={tabasStyles}>
        {tabs.map((title) => {
          return (
            <TabsTrigger key={title} value={title}>
              <Label
                className={cn(["cursor-pointer text-xs sm:text-xl", tabStyle])}
              >
                {title}
              </Label>
            </TabsTrigger>
          );
        })}
      </TabsList>
      {children}
    </Tabs>
  );
};
