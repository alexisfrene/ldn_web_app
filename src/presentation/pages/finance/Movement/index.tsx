import React from 'react';
import { FormCreateMovement } from './FormCreateMovement';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  ScrollArea,
} from '@components';
import { MovementList } from './MovementList';

export const Movement: React.FC = () => {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-w-screen min-h-[55vh] border-none"
    >
      <ResizablePanel minSize={25} defaultSize={30}>
        <FormCreateMovement />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel minSize={35} defaultSize={70}>
        <ScrollArea className="h-[74vh]">
          <MovementList />
        </ScrollArea>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
