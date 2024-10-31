import React from 'react';
import { FormCreateMovement } from './FormCreateMovement';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  ScrollArea,
} from '@components';
import { MovementList } from './MovementList';

const Movement: React.FC = () => {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-w-screen min-h-[55vh] border-none"
    >
      <ResizablePanel minSize={35} defaultSize={35}>
        <FormCreateMovement />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel minSize={35} defaultSize={65}>
        <ScrollArea className="h-[74vh]">
          <MovementList />
        </ScrollArea>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default Movement;
