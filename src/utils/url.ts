/**
 * Formats an external URL to ensure it starts with an absolute protocol (https://).
 * Prevents URLs like "www.linkedin.com/..." from being treated as relative links 
 * such as "http://localhost:5173/www.linkedin.com/...".
 */
export const formatExternalUrl = (url?: string): string => {
  if (!url) return '';
  const trimmed = url.trim();
  if (!trimmed) return '';

  // Already has protocol or is a mailto/tel link
  if (/^(https?:\/\/|mailto:|tel:)/i.test(trimmed)) {
    return trimmed;
  }

  // Handle protocol-relative URLs
  if (trimmed.startsWith('//')) {
    return `https:${trimmed}`;
  }

  // Prepend https://
  return `https://${trimmed}`;
};
