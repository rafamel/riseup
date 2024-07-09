import type { Task } from 'kpo';

export class Preset<T extends string = string> {
  public static combine(...presets: Preset[]): Preset {
    return new Preset(
      presets.reduce((acc, preset) => Object.assign(acc, preset.tasks), {})
    );
  }
  #tasks: Readonly<Record<T, Task>>;
  public constructor(tasks: Record<T, Task>) {
    this.#tasks = Object.freeze(tasks);
  }
  public get tasks(): Readonly<Record<T, Task>> {
    return this.#tasks;
  }
}
