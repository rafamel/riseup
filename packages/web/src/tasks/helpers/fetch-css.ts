import fetch from 'node-fetch';

const USER_AGENTS = {
  default: 'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116',
  eot: 'Mozilla/5.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0)',
  woff: 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:27.0) Gecko/20100101 Firefox/27.0',
  woff2: 'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116',
  svg: 'Mozilla/4.0 (iPad; CPU OS 4_0_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/4.1 Mobile/9A405 Safari/7534.48.3',
  ttf: 'Mozilla/5.0 (X11; Linux) Gecko Firefox/5.0'
};

export interface CssFontType {
  family: string;
  styles?: string;
  display?: string;
  format?: 'eot' | 'woff' | 'woff2' | 'svg' | 'ttf';
}

export async function fetchFontCss(font: CssFontType): Promise<string> {
  const url =
    `https://fonts.googleapis.com/css2?family=` +
    font.family.replace(/ /g, '+') +
    (font.styles ? `:${font.styles}` : '') +
    (font.display ? `&display=${font.display}` : '');

  return fetchCss(url, USER_AGENTS[font.format || 'default']);
}

export async function fetchCss(
  url: string,
  agent: string | null
): Promise<string> {
  if (!agent) agent = USER_AGENTS.default;

  const { type, buffer } = await downloadAsset(url, agent);
  if (type !== 'text/css') {
    throw new Error(`Expected root content type to be "text/css": ${url}`);
  }

  return handleCssUrls(buffer.toString('utf8'), agent);
}

async function downloadAsset(
  url: string,
  agent: string
): Promise<{ type: string; buffer: Buffer }> {
  const response = await fetch(url, {
    headers: { 'User-Agent': agent }
  });

  const contentType = response.headers.get('content-type');
  if (!contentType) {
    throw new Error(`Expected content type: ${url}`);
  }

  return {
    type: contentType.trim().split(';')[0],
    buffer: Buffer.from(await response.arrayBuffer())
  };
}

async function handleCssUrls(css: string, agent: string): Promise<string> {
  const regex = /url\([^)]*\)/gm;
  const matches = [...css.matchAll(regex)]
    .map((x) => x[0])
    .filter((x, i, arr) => arr.indexOf(x) === i)
    .map((text) => ({
      text,
      pattern: text.replace(/[$()*+./?[\\\]^{|}]/g, '\\$&'),
      url: text.replace(/url\(["']{0,1}/, '').replace(/["']{0,1}\)/, '')
    }));

  const items = await Promise.all(
    matches.map(async (match) => ({
      ...match,
      ...(await downloadAsset(match.url, agent))
    }))
  );

  return items.reduce((str, item) => {
    return str.replace(
      new RegExp(item.pattern, 'gm'),
      `url(data:${item.type};base64,` + `${item.buffer.toString('base64')})`
    );
  }, css);
}
