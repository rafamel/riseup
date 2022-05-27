/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable unicorn/prefer-object-from-entries */
import { Dictionary, Empty, NullaryFn } from 'type-core';
import { Task } from 'kpo';

export declare namespace Preset {
  interface Type<
    T extends string,
    U extends Dictionary = Record<never, never>
  > {
    tasks: Readonly<Record<T, Task>>;
    retrieve<V extends keyof U>(type: V): U[V];
    intercept<V extends keyof U>(
      type: V,
      projection: (data: U[V]) => U[V] | Empty
    ): Type<T, U>;
  }
}

export class Preset<
  T extends string,
  U extends Dictionary = Record<never, never>
> implements Preset.Type<T, U>
{
  public static combine(
    ...presets: Array<Preset.Type<string, {}>>
  ): Preset.Type<string, Dictionary> {
    return new Preset(
      presets.reduce((acc, preset) => Object.assign(acc, preset.tasks), {}),
      new Proxy(
        {},
        {
          get(_target, key) {
            return () => {
              const errors: Error[] = [];
              const values: any[] = [];
              for (const preset of presets) {
                try {
                  const value = preset.retrieve(key as never);
                  if (value) return value;
                  else values.push(value);
                } catch (err: any) {
                  errors.push(err);
                }
              }
              if (errors.length > 0) throw errors[0];
              return values.length > 0 ? values[0] : null;
            };
          }
        }
      )
    );
  }
  #tasks: Readonly<Record<T, Task>>;
  #configure: { [P in keyof U]: NullaryFn<U[P]> };
  public constructor(
    tasks: Record<T, Task>,
    configure: { [P in keyof U]: NullaryFn<U[P]> }
  ) {
    this.#tasks = Object.freeze(tasks);
    this.#configure = configure;
  }
  public get tasks(): Readonly<Record<T, Task>> {
    return this.#tasks;
  }
  public retrieve<V extends keyof U>(type: V): U[V] {
    const fn = this.#getConfigureFn(type);
    return fn();
  }
  public intercept<V extends keyof U>(
    type: V,
    projection: (data: U[V]) => U[V] | Empty
  ): this {
    const configure = this.#configure;
    const fn = this.#getConfigureFn(type);

    configure[type] = () => {
      const data = fn();
      return projection(data) || data;
    };

    return this;
  }
  #getConfigureFn<V extends keyof U>(type: V): NullaryFn<U[V]> {
    const configure = this.#configure;

    const fn = configure[type];
    if (!fn) {
      throw new Error(`Unexpected configuration type: ${String(type)}`);
    }

    return fn.bind(configure);
  }
}
