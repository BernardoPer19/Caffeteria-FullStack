type AsyncFn<T> = (...args: unknown[]) => Promise<T>;

export function catchAsync<T>(fn: AsyncFn<T>) {
  return async (...args: Parameters<typeof fn>): Promise<T | null> => {
    try {
      return await fn(...args);
    } catch (error) {
      console.error("❌ Error atrapado por catchAsync:", error);
      return null;
    }
  };
}
