/**
 * Single source of truth for outward-facing config: site URL, contact channels,
 * and hosted-form (Tally) URLs used by inquiry + email-gate embeds.
 *
 * Form IDs are NOT secret, so plain constants are fine. Replace the placeholder
 * Tally IDs once the forms are created (see README/owner notes).
 */
export const SITE_URL = 'https://procpa.co.kr'
export const CONTACT_EMAIL = 'wogus3575@naver.com'
export const KAKAO_OPENCHAT = 'https://open.kakao.com/o/sQCXbyXg'

/** Hosted forms (Tally). Swap the IDs for real ones when the forms exist. */
export const FORMS = {
  /** General + per-service inquiry form. `service` arrives as a hidden field. */
  inquiry: 'https://tally.so/embed/inquiry-placeholder',
  /** Default email-gate (per-product override lives in products-data.ts). */
  emailGateDefault: 'https://tally.so/embed/email-gate-placeholder',
} as const

/**
 * Append prefilled/hidden fields to a Tally embed URL. Tally maps URL query
 * params onto hidden fields of the same name, and reads display flags from the
 * query string (transparent background + dynamic height for clean embedding).
 */
export function withPrefill(
  base: string,
  params: Record<string, string | undefined> = {},
): string {
  const url = new URL(base)
  url.searchParams.set('transparentBackground', '1')
  url.searchParams.set('dynamicHeight', '1')
  for (const [k, v] of Object.entries(params)) {
    if (v) url.searchParams.set(k, v)
  }
  return url.toString()
}
