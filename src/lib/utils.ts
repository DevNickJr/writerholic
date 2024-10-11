import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// utils/validation.js
export const validateRequiredFields = (fields: string[], body: Record<string, unknown>) => {
  for (const field of fields) {
    if (!body[field]) {
      return `${field} is required.`;
    }
  }
  return null;
};