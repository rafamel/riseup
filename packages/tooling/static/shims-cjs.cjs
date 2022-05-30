// Fix lack of import.meta.url
export const importMetaUrl = new URL('file:' + __filename).href;
