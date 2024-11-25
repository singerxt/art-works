/**
 * Type definition for easing functions.
 * @param t - Normalized time (0 to 1).
 * @returns The eased value.
 */
type EasingFunction = (t: number) => number;

/**
 * Linear easing (no acceleration or deceleration).
 */
export const linear: EasingFunction = (t) => t;

/**
 * Quadratic ease-in (accelerates from zero velocity).
 */
export const easeInQuad: EasingFunction = (t) => t * t;

/**
 * Quadratic ease-out (decelerates to zero velocity).
 */
export const easeOutQuad: EasingFunction = (t) => t * (2 - t);

/**
 * Quadratic ease-in-out (accelerates, then decelerates).
 */
export const easeInOutQuad: EasingFunction = (t) =>
  t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

/**
 * Cubic ease-in (accelerates faster).
 */
export const easeInCubic: EasingFunction = (t) => t * t * t;

/**
 * Cubic ease-out (decelerates to zero velocity).
 */
export const easeOutCubic: EasingFunction = (t) => --t * t * t + 1;

/**
 * Cubic ease-in-out (accelerates, then decelerates).
 */
export const easeInOutCubic: EasingFunction = (t) =>
  t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

/**
 * Quartic ease-in (accelerates even faster).
 */
export const easeInQuart: EasingFunction = (t) => t * t * t * t;

/**
 * Quartic ease-out (decelerates to zero velocity).
 */
export const easeOutQuart: EasingFunction = (t) => 1 - --t * t * t * t;

/**
 * Quartic ease-in-out (accelerates, then decelerates).
 */
export const easeInOutQuart: EasingFunction = (t) =>
  t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;

/**
 * Quintic ease-in (very steep acceleration).
 */
export const easeInQuint: EasingFunction = (t) => t * t * t * t * t;

/**
 * Quintic ease-out (very steep deceleration).
 */
export const easeOutQuint: EasingFunction = (t) => 1 + --t * t * t * t * t;

/**
 * Quintic ease-in-out (very steep acceleration and deceleration).
 */
export const easeInOutQuint: EasingFunction = (t) =>
  t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;