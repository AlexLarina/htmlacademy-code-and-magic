'use strict';

var cloud = {
  X: 100,
  Y: 10,
  WIDTH: 420,
  HEIGHT: 270
};

var offset = {
  CAPTION: 20,
  SHADOW: 10,
  COLUMN: 50,
  TEXT: 10
};

var column = {
  WIDTH: 40,
  MAX_HEIGHT: 150
};

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, cloud.WIDTH, cloud.HEIGHT);
};

var addText = function (ctx, text, x, y) {
  ctx.font = '16px PT Mono';
  ctx.fillStyle = '#000';
  ctx.fillText(text, x, y);
};

var renderPlayerResultBar = function (ctx, x, y, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, column.WIDTH, height);
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx,
      cloud.X + offset.SHADOW,
      cloud.Y + offset.SHADOW,
      'rgba(0, 0, 0, 0.7)'
  );
  renderCloud(ctx, cloud.X, cloud.Y, '#fff');

  addText(ctx, 'Ура вы победили!', cloud.X + offset.CAPTION, cloud.Y + offset.CAPTION);
  addText(ctx, 'Список результатов:', cloud.X + offset.CAPTION, cloud.Y + 2 * offset.CAPTION);

  var maxGameTime = times.reduce(function (a, b) {
    return Math.max(a, b);
  });

  maxGameTime = Math.round(maxGameTime);

  names.forEach(function (name, index) {
    addText(
        ctx,
        name,
        cloud.X + 2 * offset.TEXT + index * (column.WIDTH + offset.COLUMN),
        cloud.Y + cloud.HEIGHT - offset.TEXT
    );

    var columnHeight = Math.round(Math.round(times[index]) * column.MAX_HEIGHT / maxGameTime);
    var columnY = cloud.Y + cloud.HEIGHT - 4 * offset.TEXT - columnHeight;

    renderPlayerResultBar(
        ctx,
        cloud.X + 2 * offset.TEXT + index * (column.WIDTH + offset.COLUMN),
        columnY,
        columnHeight,
        name === 'Вы' ? 'rgba(255, 0, 0, 1)' : 'rgba(0, 0, 255, ' + Math.random() + ')'
    );

    addText(
        ctx,
        Math.round(times[index]),
        cloud.X + 2 * offset.TEXT + index * (column.WIDTH + offset.COLUMN),
        columnY - offset.TEXT
    );

  });

};
