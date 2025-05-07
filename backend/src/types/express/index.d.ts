import { UserType } from "@/features/auth/types/AuthTypes";

export {};

declare global {
  namespace Express {
    interface Request {
      user?: UserType;
    }
  }
}
