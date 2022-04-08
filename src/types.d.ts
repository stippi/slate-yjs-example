import { Descendant } from 'slate';
import { ReactEditor } from 'slate-react';

export type CursorData = {
  name: string;
  color: string;
};

export type CustomText = {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  text: string;
};

export type CustomElement = {
    type: string;
    children: Descendant[];
}

export type CustomEditor = ReactEditor;

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
