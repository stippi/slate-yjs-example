import { RenderElementProps } from 'slate-react';
import React from 'react';
import './style.css';

export function Element({ element, attributes, children }: RenderElementProps) {
  return (
    <p {...attributes} className={element.type}>
      {children}
    </p>
  );
}
