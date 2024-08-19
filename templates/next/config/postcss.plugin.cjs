const postcss = require('postcss');

const plugin = ({ content }) => ({
  postcssPlugin: 'postcss-prepend-content',
  Once(root) {
    const cssVars = postcss.parse(content + '\n');
    root.prepend(cssVars);
  }
});
plugin.postcss = true;

module.exports = plugin;
