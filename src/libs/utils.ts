function lastArrayItem<T>(arr: T[]): T {
  return arr[arr.length - 1] as T;
}

export default lastArrayItem;
