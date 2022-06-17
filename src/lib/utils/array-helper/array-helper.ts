export class ArrayHelper {
  private constructor() {}

  static dedupe = <T extends any>(
    data: T[],
    idGetter: (datum: T) => string
  ): T[] => {
    const seen = new Set<string>();
    return data.filter((datum) => {
      if (seen.has(idGetter(datum))) return false;
      seen.add(idGetter(datum));
      return true;
    });
  };
}
