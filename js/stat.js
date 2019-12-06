'use strict';

var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;

var SHADOW_OFFSET = 10;
var COLUMN_WIDTH = 40;
var MAX_COLUMN_HEIGHT = 150;
var GAP = 50;
var TEXT_GAP = 10;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var addText = function (ctx, text, x, y) {
  ctx.font = '16px PT Mono';
  ctx.fillStyle = '#000';
  ctx.fillText(text, x, y);
};

var createRandomOpacity = function () {
  return Math.random();
};

var renderPlayerResultBar = function (ctx, player, x, textY, barY, color) {
  addText(ctx, player, x, textY);
  ctx.fillStyle = color;
  ctx.fillRect(x, barY, COLUMN_WIDTH, MAX_COLUMN_HEIGHT);
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + SHADOW_OFFSET, CLOUD_Y + SHADOW_OFFSET, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  addText(ctx, 'Ура вы победили!', 120, 40);
  addText(ctx, 'Список результатов:', 120, 60);

  names.forEach(function (name, index) {
    renderPlayerResultBar(
        ctx,
        name,
        CLOUD_X + 2 * TEXT_GAP + index * (COLUMN_WIDTH + GAP),
        CLOUD_Y + CLOUD_HEIGHT - TEXT_GAP,
        CLOUD_Y + CLOUD_HEIGHT - MAX_COLUMN_HEIGHT - 4 * TEXT_GAP,
        name === 'Вы' ? 'rgba(255, 0, 0, 1)' : 'rgba(0, 0, 255, ' + createRandomOpacity() + ')'
    );
  });

};
