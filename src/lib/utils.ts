import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a number with commas for better readability
 * @param value - The number or string to format
 * @returns Formatted string with commas
 */
export function formatNumber(value: string | number | null | undefined): string {
  if (!value) return 'Not specified';
  
  // Convert to string and remove any non-numeric characters except decimal point
  const cleanValue = String(value).replace(/[^\d.]/g, '');
  
  // Check if it's a valid number
  const numValue = parseFloat(cleanValue);
  if (isNaN(numValue)) return 'Not specified';
  
  // Format with commas
  return numValue.toLocaleString('en-US');
}
