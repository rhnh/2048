let the2048game = (function() {
  let gameManager = new GameManager();
  gameManager.setGame();
  gameManager.setCanvasManager();
  gameManager.setKeys(window);
  gameManager.keyManager();
  gameManager.setButtonAction();
  gameManager.restart();
})();
