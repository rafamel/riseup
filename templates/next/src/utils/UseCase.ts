export type Use<T extends UseCase<any, any>> = T extends { use: infer U }
  ? U
  : never;

export abstract class UseCase<D = void, O = void> {
  public static use<T extends UseCase<any, any>>(usecase: T): Use<T> {
    return usecase.use.bind(usecase) as Use<T>;
  }
  protected deps: D;
  protected opts: O;
  public constructor(deps: D, opts: O) {
    this.deps = deps;
    this.opts = opts;
  }
  public abstract use(...args: any): Promise<any>;
}
