class SceneManager {
  constructor() {
    this.bindEvent();
  }
  enter(number) {
    game.scene = number;
    switch (game.scene) {
      case 0:
        game.bg = new Background();
        game.land = new Land();
        this.titleW = game.allImg["title"].width;
        this.titleX = game.canvas.width / 2 - this.titleW / 2;
        this.titleY = -game.allImg["title"].height;
        this.birdW = game.allImg["bird0_0"].width;
        this.birdX = game.canvas.width / 2 - this.birdW / 2;
        this.birdY = 220;
        this.birdChangeY = 2;
        this.btnW = game.allImg["button_play"].width;
        this.btnH = game.allImg["button_play"].height;
        this.btnX = game.canvas.width / 2 - this.btnW / 2;
        this.btnY = game.canvas.height;
        break;
      case 1:
        this.tutorialW = game.allImg["tutorial"].width;
        this.tutorialX = game.canvas.width / 2 - this.tutorialW / 2;
        this.tutorialY = 300;
        this.alpha = 0.5;
        this.alphaChange = 0.02;
        break;
      case 2:
        game.bird = new Bird();
        game.pipeArr = [];
        game.score = 0;
        break;
      case 3:
        //爆炸序号
        this.showbomb = false;
        this.baozha = 1;
        (this.baozhaW = game.allImg["baozha1"].width),
          (this.baozhaH = game.allImg["baozha1"].height),
          //音乐
          document.getElementById("hit").load();
        document.getElementById("hit").play();
        document.getElementById("die").load();
        document.getElementById("die").play();
        break;
      case 4:
        this.overW = game.allImg["text_game_over"].width;
        this.panelW = game.allImg["score_panel"].width;
        this.gameoverY = -54;
        this.showjiangpai = false;

        let arr = JSON.parse(localStorage.getItem("FB"));
        this.best = arr[0];
        for (let i = 0; i < arr.length; i++) {
          if (game.score >= arr[0]) {
            this.best = game.score;
            this.model = "medals_1";
            arr[0] = game.score;
          } else if (game.score >= arr[1]) {
            this.model = "medals_2";
            arr[1] = game.score;
          } else if (game.score >= arr[2]) {
            this.model = "medals_3";
            arr[2] = game.score;
          } else {
            this.model = "medals_0";
          }
        }
        localStorage.setItem("FB", JSON.stringify(arr));
        //颁奖
        this.score_panelY = game.canvas.height;
        break;
    }
  }
  updateAndRender() {
    switch (game.scene) {
      case 0:
        game.bg.render();
        game.land.render();
        this.titleY >= 160 ? (this.titleY = 160) : (this.titleY += 5);
        if (this.birdY > 300 || this.birdY < 220) {
          this.birdChangeY *= -1;
        }
        this.birdY += this.birdChangeY;
        this.btnY <= 370 ? (this.btnY = 370) : (this.btnY -= 10);
        game.draw.drawImage(game.allImg["title"], this.titleX, this.titleY);
        game.draw.drawImage(game.allImg["bird0_0"], this.birdX, this.birdY);
        game.draw.drawImage(game.allImg["button_play"], this.btnX, this.btnY);
        break;
      case 1:
        game.bg.render();
        game.land.render();
        game.draw.drawImage(game.allImg["bird0_0"], this.birdX, 220);
        if (this.alpha > 0.9 || this.alpha < 0.1) {
          this.alphaChange *= -1;
        }
        this.alpha += this.alphaChange;
        game.draw.save();
        game.draw.globalAlpha = this.alpha;
        game.draw.drawImage(
          game.allImg["tutorial"],
          this.tutorialX,
          this.tutorialY
        );
        game.draw.restore();
        break;
      case 2:
        game.bg.update();
        game.bg.render();
        game.land.update();
        game.land.render();
        if (game.frame % 200 == 0) {
          new Pipe();
        }
        game.pipeArr.forEach(item => {
          item.update();
          item.render();
        });
        game.bird.update();
        game.bird.render();
        this.scoreRender();
        break;
      case 3:
        game.bg.render();
        game.land.render();
        game.pipeArr.forEach(item => {
          item.render();
        });
        //如果没有爆炸中
        if (!this.showbomb) {
          game.bird.render();
          //让小鸟落地
          game.bird.y += 16;
          if (game.bird.y > game.canvas.height - game.land.h) {
            //已经落地之后，渲染爆炸动画
            this.showbomb = true;
          }
        } else {
          //爆炸了
          game.draw.drawImage(
            game.allImg["baozha" + this.baozha],
            game.bird.x - 50,
            game.bird.y - 100,
            100,
            100
          );
          game.frame % 3 == 0 && this.baozha++;
          if (this.baozha > 9) {
            this.enter(4);
          }
        }

        this.scoreRender();
        break;
      case 4:
        game.bg.render();
        game.land.render();
        game.pipeArr.forEach(item => {
          item.render();
        });

        //gameover的y位置
        this.gameoverY += 10;
        if (this.gameoverY > 120) {
          this.gameoverY = 120;
        }
        game.draw.drawImage(
          game.allImg["text_game_over"],
          (game.canvas.width - this.overW) / 2,
          this.gameoverY
        );

        //颁奖
        this.score_panelY -= 10;
        if (this.score_panelY < 270) {
          this.score_panelY = 270;
          this.showjiangpai = true;
        }
        game.draw.drawImage(
          game.allImg["score_panel"],
          (game.canvas.width - this.panelW) / 2,
          this.score_panelY
        );

        //显示奖牌
        if (this.showjiangpai) {
          game.draw.drawImage(
            game.allImg[this.model],
            game.canvas.width / 2 - 88,
            this.score_panelY + 44
          );
          game.draw.textAlign = "right";
          game.draw.font = "20px consolas";
          game.draw.fillStyle = "#333";
          game.draw.fillText(
            game.score,
            game.canvas.width / 2 + 93,
            this.score_panelY + 50
          );
          game.draw.fillText(
            this.best,
            game.canvas.width / 2 + 93,
            this.score_panelY + 96
          );
        }
        break;
    }
  }
  bindEvent() {
    game.canvas.onclick = e => {
      switch (game.scene) {
        case 0:
          if (
            e.offsetX >= this.btnX &&
            e.offsetX <= this.btnX + this.btnW &&
            e.offsetY >= this.btnY &&
            e.offsetY <= this.btnY + this.btnH
          ) {
            this.enter(1);
          }
          break;
        case 1:
          this.enter(2);
          break;
        case 2:
          game.bird.fly();
          break;
        case 3:
          break;
        case 4:
          this.enter(0);
          break;
      }
    };
  }
  scoreRender() {
    let str = game.score.toString();
    let line = game.canvas.width / 2 - (str.length * 30) / 2;
    for (let i = 0; i < str.length; i++) {
      game.draw.drawImage(game.allImg["shuzi" + str[i]], line + i * 30, 100);
    }
  }
}
