import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Fix lack of __filename, __dirname
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
