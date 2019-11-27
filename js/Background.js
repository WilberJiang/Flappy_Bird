class Background {
  constructor() {
    this.w = game.allImg["bg_day"].width;
    this.h = game.allImg["bg_day"].height;
    this.x = 0;
    this.speed=1;
  }
  update() {
      this.x-=this.speed;
      this.x<-this.w?this.x=0:null;
  }
  render() {
    game.draw.fillStyle = "#4ec0ca";
    game.draw.fillRect(0, 0, game.canvas.width, game.canvas.height);
    game.draw.drawImage(
      game.allImg["bg_day"],
      this.x,
      game.canvas.height - this.h
    );
    game.draw.drawImage(
      game.allImg["bg_day"],
      this.x + this.w,
      game.canvas.height - this.h
    );
    game.draw.drawImage(
      game.allImg["bg_day"],
      this.x + this.w*2,
      game.canvas.height - this.h
    );
  }
}
