/*eslint no-console: ["error", { allow: ["warn", "error"] }] */
function Grid(size) {
  this.list = [];
  this.listSize = size;
  this.cellWidth = 0;
  this.isMoved = false;
  this.score = 1;
}

Grid.prototype = {
  getList: function() {
    return this.list;
  },
  getScore: function() {
    return this.score;
  },
  setList: function() {
    for (let i = 0; i < this.listSize; i++) {
      this.list[i] = new Array();
      for (let j = 0; j < this.listSize; j++) {
        this.list[i][j] = new Cell(i, j, this.cellWidth);
      }
    }
    this.fillCell();
    this.fillCell();
  },
  newList: function(arr) {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length; j++) {
        this.list[i][j] = arr[i][j];
      }
    }
  },
  setCellWidth: function(width) {
    this.cellWidth = width;
  },

  getCellWidth: function() {
    return this.cellWidth;
  },

  setListSize: function(number) {
    this.listSize = number;
  },

  isMovedLeft: function moveLeft() {
    let self = this;
    self.list = self.moveNumbersToTheLeft(self.list);
    // self.print(self.list);
    let moved = false;
    for (let i = 0; i < self.list.length; i++) {
      let k;
      for (let j = 1; j < self.list[i].length; j++) {
        k = j - 1;
        while (k < j) {
          if (self.list[i][k].value) {
            if (self.list[i][k].value === self.list[i][j].value) {
              self.list[i][k].value *= 2;
              self.list[i][j].value = 0;
              self.score += self.list[i][k].value;
              self.isMoved = true;
              moved = true;
            }
          }
          k++;
        }
      }
    }
    if (moved) {
      if (self.listSize > 4) {
        self.fillCell();
        self.fillCell();
      } else {
        self.fillCell();
     
      }
    } else if (!moved && self.isMoved) {
      if (self.listSize > 4) {
        self.fillCell();
        self.fillCell();
      } else {
        self.fillCell();

      }
    }
    return self.list;
  },
  previousArray: function previousArray(zerosToTheLeft) {
    let moved = false;
    let temp = this.list.slice();
    for (let i = 0; i < temp.length; i++) {
      for (let j = 0; j < temp.length; j++) {
        if (temp[i][j].value !== zerosToTheLeft[i][j].value) {
          moved = true;
        }
      }
    }
    return moved;
  },
  moveNumbersToTheLeft: function moveNumbersToTheLeft(arr) {
    let zerosToTheLeft = arr.slice();
    let moved = false;
    for (let i = 0; i < zerosToTheLeft.length; i++) {
      const zeros = zerosToTheLeft[i].filter(d => d.value === 0);
      const numbers = zerosToTheLeft[i].filter(d => d.value > 0);
      zerosToTheLeft[i] = numbers.concat(zeros);
    }
    moved = this.previousArray(zerosToTheLeft);
    zerosToTheLeft = this.properXvalue(zerosToTheLeft);
    if (moved) {
      this.isMoved = true;
    } else {
      this.isMoved = false;
    }
    return zerosToTheLeft;
  },

  moveNumbersToTheRight: function moveNumbersToTheRight(arr) {
    let zerosToTheRight = arr.slice();
    let moved = false;
    for (let i = 0; i < zerosToTheRight.length; i++) {
      const zeros = zerosToTheRight[i].filter(d => d.value === 0);
      const numbers = zerosToTheRight[i].filter(d => d.value > 0);
      if (numbers.length > 0) {
        moved = true;
      }
      zerosToTheRight[i] = numbers.concat(zeros);
    }
    zerosToTheRight = this.properXvalue(zerosToTheRight);
    if (moved) {
      this.isMoved = true;
    } else {
      this.isMoved = false;
    }
    return zerosToTheRight.slice();
  },
  flipArray: function(arr) {
    let k = arr.length - 1;
    let listValues = [];
    for (let i = 0; i < arr.length; i++) {
      listValues[i] = new Array();
      for (let j = 0; j < arr.length; j++) {
        listValues[i][k - j] = new Cell(i, j, this.cellWidth);
        listValues[i][k - j].value = arr[i][j].value;
      }
    }
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length; j++) {
        arr[i][j].value = listValues[i][j].value;
      }
    }
    return arr;
  },
  isMovedRight: function moveRight() {
    this.list = this.flipArray(this.list);
    this.list = this.moveNumbersToTheRight(this.list);
    this.isMovedLeft();
    this.list = this.flipArray(this.list);
    return this.list;
  },
  properXvalue: function(arr) {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length; j++) {
        arr[i][j].x = j;
        arr[i][j].y = i;
      }
    }
    return arr;
  },
  checkForPairsHorizontal: function() {
    let k;
    let pair = false;
    for (let i = 0; i < this.list.length; i++) {
      for (let j = 1; j < this.list.length; j++) {
        k = j - 1;
        if (this.list[i][k].value == this.list[i][j].value) {
          pair = true;
        }
      }
    }
    return pair;
  },
  checkForPairsVertical: function() {
    let k;
    let pair = false;
    for (let i = 1; i < this.list.length; i++) {
      for (let j = 0; j < this.list.length; j++) {
        k = i - 1;
        if (this.list[k][j].value == this.list[i][j].value) {
          pair = true;
        }
      }
    }
    return pair;
  },
  IsMovedUp: function moveUp() {
    this.list = this.list[0].map((col, i) => this.list.map(row => row[i]));
    this.list = this.isMovedLeft();
    this.list = this.list[0].map((col, i) => this.list.map(row => row[i]));
    this.list = this.properXvalue(this.list);
  },

  IsMovedDown: function moveDown() {
    this.list = this.list[0].map((col, i) => this.list.map(row => row[i]));
    this.list = this.isMovedRight();
    this.list = this.list[0].map((col, i) => this.list.map(row => row[i]));
    this.list = this.properXvalue(this.list);
  },
  findRandomCell: function() {
    let emptyCells = [];
    for (let i = 0; i < this.list.length; i++) {
      for (let j = 0; j < this.list.length; j++) {
        if (this.list[i][j].value === 0) {
          emptyCells.push(this.list[i][j]);
        }
      }
    }
    let randomCell = null;
    if (emptyCells.length > 0) {
      let rnd = Math.floor(Math.random() * emptyCells.length);
      randomCell = emptyCells[rnd];
    }
    return randomCell;
  },
  isEmptyList: function() {
    let bool = false;
    for (let i = 0; i < this.list.length; i++) {
      for (let j = 0; j < this.list.length; j++) {
        if (this.list[i][j].value === 0) {
          bool = true;
        }
      }
    }
    return bool;
  },
  findCell: function(cell) {
    if (!cell) {
      return false;
    }
    for (let i = 0; i < this.list.length; i++) {
      for (let j = 0; j < this.list.length; j++) {
        if (cell.y === this.list[i][j].y && cell.x === this.list[i][j].x) {
          return true;
        }
      }
    }

    return false;
  },
  fillCell: function() {
    let cell = this.findRandomCell();
    if (this.findCell(cell)) {
      cell.value = Math.random() > 0.75 ? 4 : 2;
    }
  },
  youWin: function() {
    let finalScore = 2048;
    if (this.listSize === 6) {
      finalScore *= 2;
    } else if (this.listSize === 8) {
      finalScore *= 4;
    }
    for (let i = 0; i < this.list.length; i++) {
      for (let j = 0; j < this.list.length; j++) {
        if (this.list[i][j].value === finalScore) {
          return true;
        }
      }
    }
    return false;
  }
};
