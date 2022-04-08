import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { createEditor, Descendant } from 'slate';
import { Editable, Slate, withReact } from 'slate-react';
import { Element } from '../components/Element/Element';
import { Leaf } from '../components/Leaf';
import { sampleDocument } from '../americanBeauty';

const initialValue = sampleDocument;

export function Simple() {
  const [value, setValue] = useState<Descendant[]>(initialValue);
  const [connected, setConnected] = useState(false);

  const editor = useMemo(() => {
    return createEditor();
  }, [value]);

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
    </div>
  );
}
