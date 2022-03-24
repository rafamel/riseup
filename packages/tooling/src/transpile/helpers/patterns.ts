import path from 'node:path';

const prepare = (...patterns: string[]): string[] => {
  return patterns.map((pattern) => {
    return pattern
      .replace(/[$()*+./?[\\\]^{|}]/g, '\\$&')
      .replace(/\\\*/g, '.*');
  });
};
const is = (str: string): string => '(?=' + str + '$)';
const not = (str: string): string => '(?!' + str + '$)';
const and = (...arr: string[]): string => '^(' + arr.join('') + ')';
const or = (...arr: string[]): string => '^(' + arr.join('|') + ')';

export function createPositiveRegex(
  patterns: string[],
  overrides: string[] | null
): RegExp {
  const inclusions = prepare(...patterns);
  const exclusions = prepare(...(overrides || []));

  return new RegExp(
    inclusions.length
      ? and(
          or(...inclusions.map((x) => is(x))),
          ...exclusions.map((x) => not(x))
        )
      : not('.*')
  );
}

export function createNegativeRegex(
  patterns: string[],
  overrides: string[] | null
): RegExp {
  const inclusions = prepare(...patterns);
  const exclusions = prepare(...(overrides || []));

  return new RegExp(
    or(and(...inclusions.map((x) => not(x))), ...exclusions.map((x) => is(x)))
  );
}

export function getExternalPatterns(prefix: string, suffix: string): string[] {
  return [
    prefix + path.win32.sep + 'node_modules' + path.win32.sep + suffix,
    prefix + path.posix.sep + 'node_modules' + path.posix.sep + suffix
  ];
}
