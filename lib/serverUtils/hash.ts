import { pbkdf2Sync, randomBytes, timingSafeEqual } from "crypto";

/**
 * Hash a password using PBKDF2.
 * @param password Plain text password
 * @returns The hash string (format: salt:hash)
 */
export function encrypt(toEncrypt: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = pbkdf2Sync(toEncrypt, salt, 100_000, 64, "sha512").toString("hex");
  return `${salt}:${hash}`;
}

/**
 * Verify a password against a hash.
 * @param password Plain text password
 * @param storedHash Hash string (format: salt:hash)
 * @returns true if match, false otherwise
 */
export function verifyEncrypted(toVerify: string, storedHash: string): boolean {
  const [salt, originalHash] = storedHash.split(":");
  const hash = pbkdf2Sync(toVerify, salt, 100_000, 64, "sha512").toString("hex");
  // Use timingSafeEqual to prevent timing attacks
  return timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(originalHash, "hex"));
}

const hash = {
  encrypt,
  verifyEncrypted
}

export default hash