import { z } from "zod";

export const createUrlSchema = z.object({
  url: z.url(),
});

export type CreateUrlInput = z.infer<typeof createUrlSchema>;