import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function prettifyJson(jsonString: string): string | null {
  try {
      const parsedJson = JSON.parse(jsonString); // Parse the JSON string
      return JSON.stringify(parsedJson, null, 4); // Prettify with 4 spaces for indentation
  } catch (error) {
      console.error("Invalid JSON:", error.message);
      return jsonString; // Fallback to original value
  }
}

export function withEllipses(str: string, maxLength?: number): string {
  if (str.length > (maxLength ?? 10)) {
    // We subtract 3 from the maximum length to allow us to insert the 
    // '...' without returning a string that is longer than the expected
    // max length 
    return str.slice(0, (maxLength ?? 10) - 3) + "...";
  }

  return str;
}