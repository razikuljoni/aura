import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

let counter = 1000;

export function generateId(prefix = 'id'): string {
  counter += 1;
  return `${prefix}-${counter}`;
}

export function generateRefCode(): string {
  counter += 1;
  return `AUR-${800000 + (counter % 199999)}`;
}
