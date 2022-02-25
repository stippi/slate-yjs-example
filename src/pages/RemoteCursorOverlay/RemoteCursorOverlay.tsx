import { withCursors, withYHistory, withYjs, YjsEditor, slateNodesToInsertDelta } from '@slate-yjs/core';
import { name } from 'faker';
import randomColor from 'randomcolor';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type { Descendant } from 'slate';
import { createEditor } from 'slate';
import { Editable, Slate, withReact } from 'slate-react';
import * as Y from 'yjs';
import { ConnectionToggle } from '../../components/ConnectionToggle/ConnectionToggle';
import { Element } from '../../components/Element/Element';
import { Leaf } from '../../components/Leaf';
import { withMarkdown } from '../../plugins/withMarkdown';
import type { CursorData } from '../../types';
import { RemoteCursorOverlay } from './Overlay';
import { WebsocketProvider } from 'y-websocket';
import { sampleDocument } from '../../americanBeautyPart';

const WEBSOCKET_ENDPOINT = 'wss://dq-websocket-server.herokuapp.com'; //'ws://localhost:1234'

const initialValue = sampleDocument;

export function RemoteCursorsOverlay() {
  const [value, setValue] = useState<Descendant[]>([]);
  const [connected, setConnected] = useState(false);

  // Create the Yjs doc and fetch if it's available from the server
  const [sharedType, provider] = useMemo(() => {
    const doc = new Y.Doc();
    const sharedType = doc.get('content', Y.XmlText) as Y.XmlText;
    const provider = new WebsocketProvider(WEBSOCKET_ENDPOINT, 'slug-american-beauty-part', doc, {
      connect: false,
    });

    return [sharedType, provider];
  }, []);

  const toggleOnline = () => {
    connected ? provider.disconnect() : provider.connect();
  };

  const editor = useMemo(() => {
    const cursorData: CursorData = {
      color: randomColor({
        luminosity: 'dark',
        alpha: 1,
        format: 'hex',
      }),
      name: `${name.firstName()} ${name.lastName()}`,
    };

    return withMarkdown(
      withReact(
        withYHistory(
          withCursors(withYjs(createEditor(), sharedType), provider.awareness, {
            data: cursorData,
          })
        )
      )
    );
  }, [provider.awareness, sharedType]);

  // Disconnect YjsEditor on unmount in order to free up resources
  useEffect(() => () => YjsEditor.disconnect(editor), [editor]);
  useEffect(() => {
    provider.on("status", ({ status }: { status: string }) => {
      setConnected(status === "connected");
    });

    provider.on("sync", (isSynced: boolean) => {
      if (isSynced) {
        if (sharedType.length === 0) {
          console.log("initial sync");
          const insertDelta = slateNodesToInsertDelta(initialValue);
          sharedType.applyDelta(insertDelta);
        }
      }
    });

    provider.connect();

    return () => {
      provider.disconnect();
    };
  }, [provider]);

  return (
    <Slate value={value} onChange={setValue} editor={editor}>
      <RemoteCursorOverlay className="flex justify-center my-32 mx-10">
        <Editable
          className="flex-col"
          style={{
            width: '8.5in',
            paddingLeft: '1.5in',
            paddingRight: '0.95in',
          }}
          renderElement={Element}
          renderLeaf={Leaf}
          placeholder="Write something ..."
        />
      </RemoteCursorOverlay>
      <ConnectionToggle connected={connected} onClick={toggleOnline} />
    </Slate>
  );
}
