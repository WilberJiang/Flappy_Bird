class Game {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.draw = this.canvas.getContext("2d");
    let W =
      document.documentElement.clientWidth > 420
        ? 420
        : document.documentElement.clientWidth;
    let H =
      document.documentElement.clientHeight > 750
        ? 750
        : document.documentElement.clientHeight;
    this.canvas.width = W;
    this.canvas.height = H;
    this.timer = null;
    this.frame = 0;
    this.score = 0;
    this.scene = 0;
    this.imgLoad();
    if (!localStorage.getItem("FB")) {
      localStorage.setItem("FB", JSON.stringify([0,0,0]));
    }
  }
  clear() {
    // 清屏
    this.draw.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  start() {
    this.SM = new SceneManager();
    this.SM.enter(this.scene);
    this.timer = setInterval(() => {
      this.frame++;
      this.clear();
      this.SM.updateAndRender();
    }, 20);
  }
  imgLoad() {
    this.allImg = {
      bg_day: "img/bg_day.png",
      land: "img/land.png",
      pipe_down: "img/pipe_down.png",
      pipe_up: "img/pipe_up.png",
      bird0_0: "img/bird0_0.png",
      bird0_1: "img/bird0_1.png",
      bird0_2: "img/bird0_2.png",
      title: "img/title.png",
      button_play: "img/button_play.png",
      tutorial: "img/tutorial.png",
      shuzi0: "img/font_048.png",
      shuzi1: "img/font_049.png",
      shuzi2: "img/font_050.png",
      shuzi3: "img/font_051.png",
      shuzi4: "img/font_052.png",
      shuzi5: "img/font_053.png",
      shuzi6: "img/font_054.png",
      shuzi7: "img/font_055.png",
      shuzi8: "img/font_056.png",
      shuzi9: "img/font_057.png",
      baozha1: "img/1.png",
      baozha2: "img/2.png",
      baozha3: "img/3.png",
      baozha4: "img/4.png",
      baozha5: "img/5.png",
      baozha6: "img/6.png",
      baozha7: "img/7.png",
      baozha8: "img/8.png",
      baozha9: "img/9.png",
      text_game_over: "img/text_game_over.png",
      score_panel: "img/score_panel.png",
      medals_0: "img/medals_0.png",
      medals_1: "img/medals_1.png",
      medals_2: "img/medals_2.png",
      medals_3: "img/medals_3.png"
    };
    let count = 0,
      total = Object.keys(this.allImg).length;
    for (const key in this.allImg) {
      let img = new Image();
      img.src = this.allImg[key];
      img.onload = () => {
        count++;
        this.allImg[key] = img;
        if (count >= total) {
          this.start();
        }
      };
    }
  }
}
