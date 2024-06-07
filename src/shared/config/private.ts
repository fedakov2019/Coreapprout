import { z } from "zod";

const privateConfigSchema = z.object({
    REACT_APP_HOST_URL:z.string()
});

export const privateConfig = privateConfigSchema.parse(process.env);