import { ZodSchema } from "zod";

export function validateWithSchema<T>(schema: ZodSchema<T>, input: unknown): T {
  const result = schema.safeParse(input);
  if (!result.success) {
    throw result.error;
  }
  return result.data;
}
