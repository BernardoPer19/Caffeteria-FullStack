import { ZodSchema } from "zod";

export const zodResolver = (schema: ZodSchema) => (data: unknown) => {
  const result = schema.safeParse(data);
  if (!result.success) {
    return {
      values: {},
      errors: result.error.flatten().fieldErrors,
    };
  }
  return {
    values: result.data,
    errors: {},
  };
};
