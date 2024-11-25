import { P5CanvasInstance } from "@p5-wrapper/react";
import { Color } from "p5";

/**
 * Defines the range of a gradient step.
 */
interface IGradientRange {
  /**
   * The starting position of the gradient step as a normalized value between 0 and 1.
   *
   * @example
   * ```typescript
   * const range: IGradientRange = { start: 0.5 }; // Starts at 50% of the gradient's width
   * ```
   */
  start: number;
}

/**
 * Represents a single step in a gradient.
 */
interface IGradientStep {
  /**
   * The color of the gradient step.
   * This should be a p5.js `Color` object.
   *
   * @example
   * ```typescript
   * const step: IGradientStep = {
   *   color: p5.color('#ff0000'), // Red
   *   range: { start: 0.2 }, // Start at 20% of the gradient
   * };
   * ```
   */
  color: Color;

  /**
   * The range defining where this step applies within the gradient.
   *
   * @remarks
   * - The `range.start` value should be between 0 and 1.
   * - Steps with overlapping ranges will blend their colors.
   */
  range: IGradientRange;
}

/**
 * Input object for configuring a gradient.
 */
interface IGradientInput {
  /**
   * An array of gradient steps defining the colors and their respective ranges.
   *
   * @example
   * ```typescript
   * const input: IGradientInput = {
   *   steps: [
   *     { color: p5.color('#ff0000'), range: { start: 0 } }, // Red at the start
   *     { color: p5.color('#00ff00'), range: { start: 0.5 } }, // Green in the middle
   *     { color: p5.color('#0000ff'), range: { start: 1 } }, // Blue at the end
   *   ],
   *   deg: 45, // Optional rotation angle
   * };
   * ```
   */
  steps: IGradientStep[];

  /**
   * Optional rotation angle of the gradient in degrees.
   * Defaults to `0` if not specified.
   *
   * @example
   * ```typescript
   * const input: IGradientInput = {
   *   steps: [...],
   *   deg: 90, // Rotate the gradient by 90 degrees
   * };
   * ```
   */
  deg?: number;
}

/**
 * Calculates the minimal scale factor required to ensure that a rectangle (e.g., canvas)
 * fully covers its bounding box after being rotated by a specified angle. This avoids
 * uncovered corners when the rectangle is rotated.
 *
 * @param p5 - The p5 instance.
 * @param rotationDegrees - The angle of rotation in degrees.
 * @returns The minimal scale factor required to fully cover the rotated rectangle.
 *
 * @example
 * ```typescript
 * const rotationDegrees = 45;
 * const canvasWidth = 800;
 * const canvasHeight = 600;
 *
 * const scaleFactor = calculateScaleFactor(p5, 44);
 * console.log(scaleFactor); // Outputs the required scale factor
 * ```
 *
 * @remarks
 * - This function assumes the rectangle is rotated about its center.
 * - A scale factor of `1` means no scaling is needed (e.g., when `rotationDegrees = 0`).
 * - The function works for all rotation angles, including angles greater than 90 degrees.
 *
 * @throws Will not throw errors under normal use.
 */
function calculateScaleFactor(p5: P5CanvasInstance, rotationDegrees: number) {
  const w = p5.width;
  const h = p5.height;
  const angle = p5.radians(rotationDegrees);
  const rotatedWidth = p5.abs(w * p5.cos(angle)) + p5.abs(h * p5.sin(angle)); // Width of rotated bounding box
  const rotatedHeight = p5.abs(h * p5.cos(angle)) + p5.abs(w * p5.sin(angle)); // Height of rotated bounding box

  // Scale factor ensures the diagonal is fully covered
  return p5.max(rotatedWidth / w, rotatedHeight / h);
}

/**
 * Draws a linear gradient background on a p5.js canvas, with optional rotation
 * and scaling to ensure full coverage. The gradient is defined by an array of
 * gradient steps, where each step specifies a color and its range.
 *
 * @param p5 - The p5.js instance used to draw on the canvas.
 * @param input - The input object defining the gradient parameters.
 *
 * @param input.deg - The rotation angle of the gradient in degrees. Defaults to `0`.
 * @param input.steps - An array of gradient steps defining the gradient colors and ranges.
 * Each step contains:
 *   - `color`: A p5.js `color` object specifying the color of the step.
 *   - `range.start`: The normalized starting position of the step (0 to 1).
 *
 * @example
 * ```typescript
 * const gradientInput: IGradientInput = {
 *   deg: 45, // Rotate the gradient by 45 degrees
 *   steps: [
 *     { range: { start: 0 }, color: p5.color('#ff0000') }, // Red at the start
 *     { range: { start: 0.5 }, color: p5.color('#00ff00') }, // Green in the middle
 *     { range: { start: 1 }, color: p5.color('#0000ff') }, // Blue at the end
 *   ],
 * };
 *
 * linearGradientBackground(p5, gradientInput);
 * ```
 *
 * @remarks
 * - The function automatically calculates the scale factor using `calculateScaleFactor` to
 *   ensure that the gradient covers the entire canvas, even when rotated.
 * - If no gradient steps are provided, the function logs a warning and exits early.
 * - The gradient is drawn from left to right by default and can be rotated.
 *
 * @throws Will not throw errors under normal usage.
 */
export function linearGradientBackground(p5: P5CanvasInstance, input: IGradientInput) {
  p5.push();
  const h = p5.height;
  const w = p5.width;
  const deg = input.deg || 0;
  const scaleFactor = calculateScaleFactor(p5, deg);
  p5.translate(w / 2, h / 2); // Center the gradient
  p5.rotate(p5.radians(deg)); // Rotate by the specified degrees// Scale to the size of the canvas
  p5.scale(scaleFactor); // Scale to the size of the canvas
  p5.translate(-w / 2, -h / 2); // Translate back

  if (input.steps.length === 0) {
    console.warn("No gradient steps provided");
    return;
  }


  for (let i = 0; i < w; i++) {
    const range = i / w;
    let color = p5.color(0, 0, 0);

    for (let j = 0; j < input.steps.length; j++) {
      const step = input.steps[j];
      const nextStep = input.steps[j + 1];

      if (range >= step.range.start) {
        color = step.color;
      }

      if (nextStep && range >= step.range.start && range < nextStep.range.start) {
        const nextColor = nextStep.color;
        const nextRange = nextStep.range.start;
        const ratio = (range - step.range.start) / (nextRange - step.range.start);
        color = p5.lerpColor(step.color, nextColor, ratio);
      }
    }

    p5.stroke(color);
    p5.strokeWeight(1)
    p5.line(i, 0, i, h);
  }
  p5.pop();
}