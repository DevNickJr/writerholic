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


export const resolveSearchQuery = ({
  search,
  type = 'DEFAULT',
}: {
  search: string;
  type?: 'DEFAULT' | 'FULL' | 'PARTIAL';
}) => {
  if (type === 'DEFAULT') {
    return new RegExp(search, 'i');
  } else if (type === 'FULL') {
    return new RegExp(search, 'i');
  } else {
    return { $regex: `^${search}` };
  }
};
