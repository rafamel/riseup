export declare namespace Extensions {
  export type Rules<T> = { [extensions: string]: T };
}

export class Extensions<T> {
  public static merge<T, U>(
    a: Extensions<T>,
    b: Extensions<U>
  ): Extensions<T | U> {
    return a.add(b);
  }
  #entries: Array<[string, T]>;
  public constructor(rules: Extensions.Rules<T> | Array<[string, T]>) {
    this.#entries = (Array.isArray(rules) ? rules : Object.entries(rules))
      // Normalize
      .reduce(
        (acc: Array<[string, T]>, [key, value]) => [
          ...acc,
          ...key
            .split(',')
            .map((ext) => ext.trim())
            .map((ext) => (ext.startsWith('.') ? ext : `.${ext}`))
            .map((ext): [string, T] => [ext, value])
        ],
        []
      );
  }
  public extensions(): string[] {
    return this.#entries.map(([key]) => key);
  }
  public rules(): Extensions.Rules<T> {
    return this.#entries.reduce(
      (acc, [key, value]) => ({ ...acc, [key]: value }),
      {}
    );
  }
  public add<U>(extensions: Extensions<U>): Extensions<T | U> {
    return new Extensions({ ...this.rules(), ...extensions.rules() });
  }
  public map<U>(projection: (ext: string, value: T) => U): Extensions<U> {
    return new Extensions(
      this.#entries.map(([key, value]): [string, U] => [
        key,
        projection(key, value)
      ])
    );
  }
  public filter(include: T[] | null, exclude: T[] | null): Extensions<T> {
    return new Extensions(
      this.#entries.filter(([_, value]) => {
        if (include && !include.includes(value)) return false;
        return exclude ? !exclude.includes(value) : true;
      })
    );
  }
  public exclude<U extends T>(value: U): Extensions<Exclude<T, U>> {
    return this.filter(null, [value]) as Extensions<Exclude<T, U>>;
  }
}
