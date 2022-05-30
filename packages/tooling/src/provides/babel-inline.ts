import fs from 'node:fs';
import path from 'node:path';
import { Expression } from '@babel/types';
import { types, PluginObj } from '@babel/core';
import resolve from 'resolve-from';

export declare namespace BabelInline {
  export type Loader = 'json' | 'text' | 'file' | 'base64' | 'binary';

  export interface Options {
    loaders: { [P in Loader]?: string[] };
  }
}

function getValue(
  t: typeof types,
  loader: BabelInline.Loader,
  src: string,
  reference: string
): Expression {
  switch (loader) {
    case 'json': {
      return t.valueToNode(
        JSON.parse(fs.readFileSync(getFilepath(src, reference)).toString())
      );
    }
    case 'text': {
      return t.stringLiteral(
        String(fs.readFileSync(getFilepath(src, reference)))
      );
    }
    case 'file': {
      return t.stringLiteral(src);
    }
    case 'base64': {
      return t.stringLiteral(
        fs.readFileSync(getFilepath(src, reference)).toString('base64')
      );
    }
    case 'binary': {
      return t.callExpression(
        t.memberExpression(t.identifier('Uint8Array'), t.identifier('from')),
        [
          t.valueToNode(
            fs.readFileSync(getFilepath(src, reference)).toJSON().data
          )
        ]
      );
    }
    default: {
      throw new Error(`Expected a loader`);
    }
  }
}

function getFilepath(src: string, reference: string): string {
  let filepath: string | null = null;
  try {
    filepath = resolve(path.dirname(reference), src);
  } catch (_) {}
  if (!filepath) {
    throw new Error(`Path could not be resolved: ${reference}`);
  }

  return filepath;
}

function getLoader(
  src: string,
  options: BabelInline.Options
): BabelInline.Loader | null {
  const ext = path.extname(src);
  const entries = Object.entries(options.loaders) as Array<
    [BabelInline.Loader, string[] | undefined]
  >;

  for (const [loader, extensions] of entries) {
    if (extensions?.includes(ext)) return loader;
  }

  return null;
}

export default function ({ types: t }: { types: typeof types }): PluginObj {
  return {
    visitor: {
      ImportDeclaration: {
        exit(nodePath, state) {
          const src = nodePath.node.source.value;
          const options = state.opts as BabelInline.Options;

          const loader = getLoader(src, options);
          if (!loader) return;

          const reference = state.file.opts.filename;
          const specifiers = nodePath.node.specifiers;

          if (!reference) {
            throw new Error(`Missing file reference: ${src}`);
          }
          if (specifiers.length > 1) {
            throw new Error(`Unexpected inline import destructuring: ${src}`);
          }

          const id = specifiers[0].local.name;
          const value = getValue(t, loader, src, reference);
          const variable = t.variableDeclarator(
            t.identifier(id),
            specifiers[0].type === 'ImportNamespaceSpecifier'
              ? t.objectExpression([
                  t.objectProperty(t.identifier('default'), value)
                ])
              : value
          );

          nodePath.replaceWith({
            type: 'VariableDeclaration',
            kind: 'const',
            declarations: [variable]
          });
        }
      }
    }
  };
}
