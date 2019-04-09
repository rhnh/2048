//-------------Cell
function Cell(x, y, width, value = 0) {
  this.y = x ;
  this.x = y ;

  this.value = value;
  this.width = width;
}
Cell.prototype.setWidth = function setWidth(width) {
  this.width = width;
};
Cell.prototype.getWidth = function getWidth() {
  return this.width;
};

Cell.prototype.getX = function getX() {
  return this.x;
};
Cell.prototype.setX = function setX(x) {
  this.x = x;
};

Cell.prototype.getY = function () {
  return this.y;
};
Cell.prototype.setY = function (y) {
  this.y = y;
};

