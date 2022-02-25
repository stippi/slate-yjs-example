# Slate-Yjs Example

Almost verbatim copy of the [frontend example](https://github.com/BitPhinix/slate-yjs/tree/next/examples/frontend) included in the awesome [Slate-Yjs bindings]https://github.com/BitPhinix/slate-yjs.

## Running

```shell
npm install
npm run start
```

Point your browser to `http://localhost:3000`

## Changes

- The Hocuspocus provider was exchanged for a Y-Websocket provider.
- The Element renderer simply sets the CSS class based on the `type` property.
  A number of (movie) script paragraph types have been defined in the [CSS](https://github.com/stippi/slate-yjs-example/blob/main/src/components/Element/style.css).
- A largish example script (American Beauty) is loaded by default.
  This one can be freely downloaded and used for personal use, just google it.

See the changes compared to the original example in this [commit](https://github.com/stippi/slate-yjs-example/commit/e3b3c2516093118533b18cd89261bc951a47179e).
