export type Star = {
  x: number;
  y: number;
  size: number;
  speed: number;
};

export const createStar = (canvasWidth: number, canvasHeight: number): Star => ({
  x: Math.random() * canvasWidth,
  y: Math.random() * canvasHeight,
  size: Math.random() * 2,
  speed: Math.random() * 0.5 + 0.1
});