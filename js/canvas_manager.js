function CanvasManager() {
  this.canvas = null;
}

CanvasManager.prototype = {
  setCanvas: function (c) {
    this.canvas = c;
  },

  drawAllCells: function (list) {
    if (list === null) {
      return;
    }
    for (let i = 0; i < list.length; i++) {
      for (let j = 0; j < list.length; j++) {
        let ctx = this.canvas.getContext("2d");
        let cell = list[i][j];
        ctx.beginPath();

        ctx.rect(
          cell.x * cell.getWidth() + 6,
          cell.y * cell.getWidth() + 6,
          cell.getWidth() - 5,
          cell.getWidth() - 5
        );
        switch (cell.value) {
          case 0:
            ctx.fillStyle = "#A9A9A9";
            break;
          case 2:
            ctx.fillStyle = "#ccc4da";
            break;
          case 4:
            ctx.fillStyle = "#f2b179";
            break;
          case 8:
            ctx.fillStyle = "#f59563";
            break;
          case 16:
            ctx.fillStyle = "#f67c5f";
            break;
          case 32:
            ctx.fillStyle = "#f65e3b";
            break;
          case 64:
            ctx.fillStyle = "#edcf72";
            break;
          case 128:
            ctx.fillStyle = "#edc061";
            break;
          case 256:
            ctx.fillStyle = "#edc200";
            break;
          case 512:
            ctx.fillStyle = "#ff0020";
            break;
          case 1024:
            ctx.fillStyle = "#ff9000";
            break;
          case 2048:
            ctx.fillStyle = "#FF7F50";
            break;
          case 4096:
            ctx.fillStyle = "#ffbf00";
            break;
          default:
            ctx.fillStyle = "#ff0f14";
        }
        ctx.fill();
        if (cell.value) {
          let fontSize = cell.getWidth() / 4;
          ctx.font = fontSize + "px Ariel";

          ctx.fillStyle = "#fff";
          ctx.textAlign = "center";
          ctx.fillText(
            cell.value,
            cell.x * cell.getWidth() + cell.getWidth() / 2 + 5,
            cell.y * cell.getWidth() + cell.getWidth() / 2 + fontSize / 2
          );
        }
        ctx.closePath();
      }
    }
  },
  clearCanvas: function () {
    let ctx = this.canvas.getContext("2d");
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.width);
  },
};
