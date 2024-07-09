import path from 'node:path';
import fs from 'node:fs';

import { type Dictionary, type Serial, TypeGuard } from 'type-core';
import { parseDocument } from 'htmlparser2';
import { nanoid } from 'nanoid';
import faviconsFn, {
  type FaviconOptions,
  type FaviconResponse
} from 'favicons';
import {
  type Context,
  type Task,
  copy,
  create,
  mkdir,
  print,
  progress,
  remove,
  run,
  series,
  write
} from 'kpo';

import { defaults } from '../defaults';
import { type CssFontType, fetchCss, fetchFontCss } from './helpers/fetch-css';

export interface AssetsParams {
  clean?: boolean;
  destination?: string | null;
  copy?: string[] | null;
  fonts?: null | AssetsParamsFont;
  favicons?: null | AssetsParamsFavicons;
  result?: null | AssetsParamsResult;
}

export type AssetsParamsFont =
  | Array<string | CssFontType>
  | Dictionary<string | CssFontType>;

export interface AssetsParamsFavicons {
  logo?: string | string[];
  options?: FaviconOptions | null;
}

export interface AssetsParamsResult {
  url?: string | null;
  path?: string | null;
  values?: Serial.Type | null;
}

export function assets(params: AssetsParams | null): Task.Async {
  const opts = {
    clean: TypeGuard.isBoolean(params?.clean)
      ? params?.clean
      : defaults.assets.clean,
    destination: params?.destination || defaults.assets.destination,
    copy: params?.copy || defaults.assets.copy,
    fonts: params?.fonts || defaults.assets.fonts,
    favicons: params?.favicons || defaults.assets.favicons,
    result: params?.result || defaults.assets.result
  };

  return create((ctx) => {
    if (!opts.destination) {
      return print('Skipped public: unspecified destination');
    }

    const destination = path.resolve(ctx.cwd, opts.destination);
    const copyOpts = opts.copy;
    const fontsOpts = opts.fonts;
    const faviconsOpts = opts.favicons;
    const resultOpts = opts.result;

    const result: Dictionary = resultOpts ? { values: resultOpts.values } : {};

    return series(
      opts.clean
        ? remove(path.join(destination, '*'), {
            glob: true,
            strict: false,
            recursive: true
          })
        : null,
      mkdir(destination, { ensure: true }),
      copyOpts
        ? progress(
            { message: 'Copy assets' },
            create(async (ctx) => {
              await runCopy(ctx, destination, copyOpts);
            })
          )
        : print('No assets to copy'),
      fontsOpts
        ? progress(
            { message: 'Download fonts' },
            create(async (ctx) => {
              result.fonts = await runFonts(
                ctx,
                destination,
                (opts.result && opts.result.url) || null,
                fontsOpts
              );
            })
          )
        : print('No fonts to build'),
      faviconsOpts
        ? progress(
            { message: 'Build icons and manifest' },
            create(async (ctx) => {
              result.favicons = await runFavicons(
                ctx,
                destination,
                (opts.result && opts.result.url) || null,
                faviconsOpts
              );
            })
          )
        : print('No favicons to build'),
      resultOpts
        ? create(() => {
            const filename = resultOpts.path
              ? path.resolve(ctx.cwd, resultOpts.path)
              : path.resolve(destination, 'result.json');
            return series(
              mkdir(path.dirname(filename), { ensure: true }),
              write(filename, result, { exists: 'overwrite' })
            );
          })
        : print('No result file to generate')
    );
  });
}

async function runCopy(
  ctx: Context,
  destination: string,
  assets: string[]
): Promise<void> {
  return run(
    ctx,
    copy(assets, destination, {
      glob: true,
      single: false,
      strict: false,
      exists: 'overwrite'
    })
  );
}

async function runFonts(
  ctx: Context,
  destination: string,
  publicUrl: string | null,
  options: AssetsParamsFont
): Promise<Dictionary<Dictionary[]>> {
  const files: string[] = [];
  const assets = Array.isArray(options)
    ? options.map((value): [string, string | CssFontType] => [nanoid(), value])
    : Object.entries(options);

  for (const [key, value] of assets) {
    const css = TypeGuard.isString(value)
      ? await fetchCss(value, null)
      : await fetchFontCss(value);
    const filename = `font-${key.replace(/ /g, '-').toLowerCase()}.css`;

    files.push(filename);
    await fs.promises.writeFile(
      path.resolve(ctx.cwd, path.join(destination, filename)),
      css
    );
  }

  return {
    link: files.map((file) => ({
      rel: 'stylesheet',
      href: publicUrl ? `${publicUrl.replace(/\/$/, '')}/${file}` : file
    }))
  };
}

async function runFavicons(
  ctx: Context,
  destination: string,
  publicUrl: string | null,
  options: AssetsParamsFavicons
): Promise<Dictionary<Dictionary[]>> {
  const urlPath = 'favicons-' + String(Math.random()).replace('.', '');
  const urlPathRegex = new RegExp(urlPath, 'g');
  const urlPathSlashRegex = new RegExp(urlPath + '\\/?', 'g');

  const response: FaviconResponse = await faviconsFn(
    options.logo || Buffer.from(''),
    { ...options.options, path: urlPath }
  );

  await run(
    ctx,
    series(
      mkdir(destination, { ensure: true }),
      ...response.images.map((asset) => {
        return write(path.join(destination, asset.name), asset.contents, {
          exists: 'overwrite'
        });
      }),
      ...response.files.map((asset) => {
        const content = String(asset.contents).replace(urlPathSlashRegex, '');

        return write(path.join(destination, asset.name), content, {
          exists: 'overwrite'
        });
      })
    )
  );

  const html = response.html.map((x) => {
    return publicUrl
      ? x.replace(urlPathRegex, publicUrl.replace(/\/$/, ''))
      : x.replace(urlPathSlashRegex, '');
  });

  return faviconsHtmlToElements(html);
}

function faviconsHtmlToElements(html: string[]): Dictionary<Dictionary[]> {
  const str = `${html.join('')}`;
  const doc = parseDocument(str);
  const nodes = doc.children;

  const elements: Dictionary<Dictionary[]> = {};
  for (const node of nodes as any[]) {
    const attribs = node.attribs;

    Object.hasOwnProperty.call(elements, node.name)
      ? elements[node.name].push(attribs)
      : (elements[node.name] = [attribs]);
  }

  return elements;
}
