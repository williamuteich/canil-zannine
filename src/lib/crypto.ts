import crypto from "crypto";

/**
 * Generates a secure random token for password reset
 * @returns A random hex string (32 bytes = 64 characters)
 */
export function generateResetToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

/**
 * Creates a hash of the token for secure storage
 * @param token - The token to hash
 * @returns SHA-256 hash of the token
 */
export function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}
