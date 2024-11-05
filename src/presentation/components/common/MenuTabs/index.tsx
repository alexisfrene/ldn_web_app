import React, { ReactNode } from 'react';
import { cn } from '@utils';
import {
  TabsList,
  Tabs,
  TabsTrigger,
  Label,
  Card,
  CardContent,
  CardHeader,
} from '@components';

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
  return (
    <Tabs defaultValue={tabs[0]}>
      <Card className="rounded-none border-none">
        <CardHeader>
          <TabsList
            className={cn([
              'mb-3 grid',
              `grid-cols-${tabs.length}`,
              containerStyle,
            ])}
          >
            {tabs.map((title) => {
              return (
                <TabsTrigger key={title} value={title}>
                  <Label
                    className={cn([
                      'cursor-pointer text-sm sm:text-xl',
                      tabStyle,
                    ])}
                  >
                    {title}
                  </Label>
                </TabsTrigger>
              );
            })}
          </TabsList>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </Tabs>
  );
};
