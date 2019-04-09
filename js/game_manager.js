function GameManager() {
  this.canvasManager = null;
  this.list = [];
  this.canvas = null;
  this.grid = null;
  this.previousKey = "";
  this.layout;
  this.status = false;
}
GameManager.prototype = {
  setGame: function(lent = 4) {
    this.layout = new Layout();
    this.layout.setLayout(
      "restart",
      "modal",
      "close",
      "number-buttons",
      "canvas",
      "score-holder",
      "modal-win",
      "modal-lost",
      "close-win",
      "close-lost",
      "score-holder--win",
      "score-holder--lost",
      "best-score--lost",
      "best-score--win",
      "best-holder"
    );
    this.layout.setup(lent);
    this.list = this.layout.getGrid().getList();
    this.canvas = this.layout.getCanvas();
    this.grid = this.layout.getGrid();
    if (localStorage.getItem("bestScore") === null) {
      localStorage.setItem("bestScore", 0);
    } else {
      this.layout.bestHolder.innerHTML = this.bestScore();
    }
  },
  setList: function(l) {
    this.list = l;
  },
  setCanvasManager: function() {
    this.canvasManager = new CanvasManager();
    this.canvasManager.setCanvas(this.canvas);
    this.canvasManager.drawAllCells(this.list);
  },
  getCanasManager: function() {
    return this.canvasManager;
  },
  bestScore: function() {
    if (typeof Storage !== "undefined") {
      if (localStorage.getItem("bestScore") < this.layout.getGrid().getScore())
        localStorage.setItem("bestScore", this.layout.getGrid().getScore());
    }
    return localStorage.getItem("bestScore");
  },
  setKeys: function(global) {
    let self = this;
    global.addEventListener(
      "keydown",
      function(e) {
        if (e.deflautPrevented) {
          return;
        }
        let handled = false;
        let code = "no key";
        if (e.key !== undefined) {
          code = e.key;
          handled = true;
        } else if (e.keyIdentifier !== undefined) {
          code = e.keyIdentifier;
          handled = true;
        } else if (e.keyCode !== undefined) {
          code = e.keyCode;
          handled = true;
        }
        self.keyManager(code);
        if (handled) {
          // Suppress "double action" if event handled
          e.preventDefault();
        }
      },
      true
    );
    return this;
  },
  movement: function(code) {
    if (
      !this.layout.getGrid().checkForPairsVertical() &&
      !this.layout.getGrid().checkForPairsHorizontal() &&
      !this.layout.getGrid().isEmptyList()
    ) {
      this.canvasManager.clearCanvas();
      this.layout.modalLost.style.display = "block";
      this.layout.modalLost.classList.toggle("modal");
      this.layout.bestScoreLost.innerHTML = this.bestScore();
      this.layout.scoreHolderLost.innerHTML = this.layout.getGrid().getScore();

      // document.location.reload();
      // clearInterval(interval); // Needed for Chrome to end game
    }
    if (this.previousKey !== code && this.previousKey !== "") {
      this.layout.getGrid().isMoved = true;
    }
    if (code === "ArrowLeft") {
      this.layout.getGrid().isMovedLeft();
    } else if (code === "ArrowRight") {
      this.layout.getGrid().isMovedRight();
    } else if (code === "ArrowDown") {
      this.layout.getGrid().IsMovedDown();
    } else if (code === "ArrowUp") {
      this.layout.getGrid().IsMovedUp();
    }

    // this.layout.scoreHolder.innerHTML = this.layout.getGrid().getScore();
    this.layout.scoreHolder.innerHTML = this.layout.getGrid().getScore();
    this.layout.bestHolder.innerHTML = this.bestScore();

    this.canvasManager.drawAllCells(this.list);
    this.previousKey = code;
  },
  keyManager: function keyManager(code) {
    this.bestScore();
    if (this.layout.getGrid().youWin()) {
      this.layout.modalWin.style.display = "block";
      this.layout.modalWin.classList.toggle("modal");
      this.canvasManager.clearCanvas();
      this.layout.bestScoreWin.innerHTML = this.bestScore();
      this.layout.scoreHolderWin.innerHTML = this.layout.getGrid().getScore();
    }

    if (code === "ArrowLeft") {
      this.movement(code);
    } else if (code === "ArrowRight") {
      this.movement(code);
    } else if (code === "ArrowUp") {
      this.movement(code);
    } else if (code === "ArrowDown") {
      this.movement(code);
    }
    return this;
  },
  setButtonAction: function setButtonAction() {
    let self = this;
    self.layout.restartButton.addEventListener("click", function() {
      self.layout.modal.classList.toggle("modal");
    });
    self.layout.closeButton.addEventListener("click", function() {
      self.layout.modal.classList.toggle("modal");
    });

    self.layout.closeWinButton.addEventListener("click", function() {
      self.layout.modalWin.style.display = "none";
      document.location.reload();
    });
    self.layout.closeLostButton.addEventListener("click", function() {
      self.layout.modalLost.style.display = "none";
      document.location.reload();
    });

    self.layout.numberButtons.forEach(function(buttons) {
      buttons.addEventListener("click", function() {
        self.layout.modal.classList.toggle("modal");
      });
    });

    return this;
  },

  restart: function() {
    let self = this;
    self.layout.numberButtons.forEach(function(buttons) {
      buttons.addEventListener("click", function() {
        self.liseSize = buttons.value;
        self.setGame(buttons.value);
        self.setKeys(window);
        self.keyManager();

        self.canvasManager.clearCanvas();

        self.canvasManager.drawAllCells(self.list);
      });
    });
  }
};
