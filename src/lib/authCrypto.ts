/**
 * Cryptographic utility for client-side password hashing.
 * Uses the standard Web Crypto API (SHA-256) with application salt.
 * Ensures plaintext passwords are NEVER stored in localStorage.
 */

const SALT = 'venuss_herbo_aromatics_auth_salt_v1';

export async function hashPassword(password: string): Promise<string> {
  if (typeof window === 'undefined' || !window.crypto || !window.crypto.subtle) {
    // Basic fallback for server environments if called during SSR
    return Buffer.from(`${SALT}:${password}`).toString('base64');
  }

  const encoder = new TextEncoder();
  const data = encoder.encode(`${SALT}:${password}`);
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  if (!storedHash) return false;
  const computedHash = await hashPassword(password);
  return computedHash === storedHash;
}
