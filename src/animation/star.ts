type StarPosition = {
  x: number;
  y: number;
  z: number;
};

export class Star {
  private position: StarPosition;
  private speed: number;
  private size: number;

  constructor(maxWidth: number, maxHeight: number) {
    this.position = {
      x: Math.random() * maxWidth - maxWidth / 2,
      y: Math.random() * maxHeight - maxHeight / 2,
      z: Math.random() * maxWidth
    };
    this.speed = Math.random() * 2 + 0.5;
    this.size = Math.random() * 2 + 0.5;
  }

  update(maxWidth: number, maxHeight: number): void {
    this.position.z -= this.speed;
    if (this.position.z <= 0) {
      this.position.x = Math.random() * maxWidth - maxWidth / 2;
      this.position.y = Math.random() * maxHeight - maxHeight / 2;
      this.position.z = maxWidth;
    }
  }

  draw(ctx: CanvasRenderingContext2D, maxWidth: number, maxHeight: number): void {
    const x = (this.position.x / this.position.z) * maxWidth + maxWidth / 2;
    const y = (this.position.y / this.position.z) * maxHeight + maxHeight / 2;
    const size = (this.size * maxWidth) / this.position.z;

    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }
}