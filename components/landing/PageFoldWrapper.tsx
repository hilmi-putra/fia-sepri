'use client';

import React, { ReactNode } from 'react';

interface PageFoldWrapperProps {
  children: ReactNode;
}

export function PageFoldWrapper({ children }: PageFoldWrapperProps) {
  return (
    <div className="w-full relative flex flex-col">
      {children}
    </div>
  );
}
