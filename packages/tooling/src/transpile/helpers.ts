const chars = /[$()*+./?[\\\]^{|}]/g;
const sanitize = (str: string): string => str.replace(chars, '\\$&');
const is = (str: string): string => '(?=' + str + '$)';
const not = (str: string): string => '(?!' + str + '$)';
const and = (...arr: string[]): string => '^(' + arr.join('') + ')';
const or = (...arr: string[]): string => '^(' + arr.join('|') + ')';

export function createIncludeExclude(
  include: string[],
  exclude: string[]
): { exclude: RegExp; include: RegExp } {
  const inclusions = include.map((x) => sanitize(x).replace(/\\\*/g, '.*'));
  const exclusions = exclude.map((x) => sanitize(x).replace(/\\\*/g, '.*'));

  return {
    include: new RegExp(
      inclusions.length
        ? and(
            or(...inclusions.map((x) => is(x))),
            ...exclusions.map((x) => not(x))
          )
        : not('.*')
    ),
    exclude: new RegExp(
      or(and(...inclusions.map((x) => not(x))), ...exclusions.map((x) => is(x)))
    )
  };
}
