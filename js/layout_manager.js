function Layout() {
  this.numberButtons = "";
  this.closeButton = "";
  this.restartButton = "";
  this.closeWinButton = "";
  this.closeLostButon = "";
  this.modal = "";
  this.canvas = "";
  this.scoreHolder = "";
  this.canvasManager = "";
  this.listSize = 4;
  this.grid = null;
  this.modalWin = "";
  this.modalLost = "";
  this.scoreHolderWin = "";
  this.scoreHolderLost = "";
  this.bestScoreLost = "";
  this.bestScoreWin = "";
  this.bestHolder = "";
}
Layout.prototype = {
  setLayout: function(
    restartButtonId,
    modalId,
    closeButtonId,
    numberButtonsId,
    canvasId,
    score_holder,
    modalWin,
    modalLost,
    closeWin,
    closeLost,
    scoreHolderWin,
    scoreHolderLost,
    bestScoreLost,
    bestScoreWin,
    bestHolder
  ) {
    this.numberButtons = Array.from(
      document.getElementsByClassName(numberButtonsId)
    );
    this.closeButton = document.getElementById(closeButtonId);
    this.restartButton = document.getElementById(restartButtonId);
    this.modal = document.getElementById(modalId);
    this.canvas = document.getElementById(canvasId);
    this.scoreHolder = document.getElementById(score_holder);
    this.modalWin = document.getElementById(modalWin);
    this.modalLost = document.getElementById(modalLost);
    this.closeWinButton = document.getElementById(closeWin);
    this.closeLostButton = document.getElementById(closeLost);
    this.scoreHolderWin = document.getElementById(scoreHolderWin);
    this.scoreHolderLost = document.getElementById(scoreHolderLost);
    this.bestScoreLost = document.getElementById(bestScoreLost);
    this.bestScoreWin = document.getElementById(bestScoreWin);
    this.bestHolder = document.getElementById(bestHolder);
  },
  setup: function(gridSize = 4) {
    this.grid = new Grid(gridSize);
    this.grid.setListSize = gridSize;
    this.grid.setCellWidth(this.canvas.width / gridSize - 2);
    this.grid.setList();
  },
  getListSize: function() {
    return this.listSize;
  },
  setListSize: function(number) {
    this.listSize = number;
  },
  getGrid: function() {
    return this.grid;
  },
  setGrid: function(g) {
    this.grid = g;
  },
  getCanvas: function() {
    return this.canvas;
  }
};
