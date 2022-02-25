import { withYHistory, withYjs, YjsEditor, slateNodesToInsertDelta } from '@slate-yjs/core';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { createEditor, Descendant } from 'slate';
import { Editable, Slate, withReact } from 'slate-react';
import * as Y from 'yjs';
import { ConnectionToggle } from '../components/ConnectionToggle/ConnectionToggle';
import { Element } from '../components/Element/Element';
import { Leaf } from '../components/Leaf';
import { withMarkdown } from '../plugins/withMarkdown';
import { WebsocketProvider } from 'y-websocket';
import { sampleDocument } from '../americanBeautyPart';

const WEBSOCKET_ENDPOINT = 'wss://dq-websocket-server.herokuapp.com'; //'ws://localhost:1234'

const initialValue = sampleDocument;

export function Simple() {
  const [value, setValue] = useState<Descendant[]>([]);
  const [connected, setConnected] = useState(false);

  // Create the Yjs doc and fetch if it's available from the server
  const [sharedType, provider] = useMemo(() => {
    const doc = new Y.Doc();
    const sharedType = doc.get('content', Y.XmlText) as Y.XmlText;
    const provider = new WebsocketProvider(WEBSOCKET_ENDPOINT, 'slug-american-beauty-part11', doc, {
      connect: false,
    });

    return [sharedType, provider];
  }, []);

  const toggleOnline = () => {
    connected ? provider.disconnect() : provider.connect();
  };

  const editor = useMemo(() => {
    return withMarkdown(
      withReact(withYHistory(withYjs(createEditor(), sharedType)))
    );
  }, [sharedType]);

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
    <div className="flex justify-center my-32 mx-10">
      <Slate value={value} onChange={setValue} editor={editor}>
        <Editable
          className="flex-col"
          style={{
            width: '8.5in',
            paddingLeft: '1.4in',
            paddingRight: '0.9in',
          }}
          renderElement={Element}
          renderLeaf={Leaf}
          placeholder="Write something ..."
        />
      </Slate>
      <ConnectionToggle connected={connected} onClick={toggleOnline} />
    </div>
  );
}
