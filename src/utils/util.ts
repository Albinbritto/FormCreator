import { nanoid } from "nanoid";

export const generateUniqueId = (size = 6) => nanoid(size);
