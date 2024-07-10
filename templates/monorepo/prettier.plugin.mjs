export default {
  parsers: { ignores: { astFormat: 'ignores', parse: (text) => ({ text }) } },
  printers: { ignores: { print: (path) => path.getValue().text } }
};
