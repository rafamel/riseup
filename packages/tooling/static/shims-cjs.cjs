// Fix lack of import.meta.url
export const importMetaUrl = new URL('file:' + __filename).href;

// Fix ESM -> ESM import chains
eval(`
  if (typeof __toESM !== 'undefined') {
    var __rToESM = __toESM;
    __toESM = (mod, ...args) => typeof mod === 'object' && mod.__esModule ? mod : __rToESM(mod,...args);
  }
`);
