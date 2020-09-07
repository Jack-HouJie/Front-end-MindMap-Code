
// API别名
let Application = PIXI.Application,
  Container = PIXI.Container,
  loader = PIXI.loader,
  resources = PIXI.loader.resources,
  Graphics = PIXI.Graphics,
  TextureCache = PIXI.utils.TextureCache,
  Sprite = PIXI.Sprite,
  Text = PIXI.Text,
  TextStyle = PIXI.TextStyle;

// 创建PIXI应用
let app = new Application({
  width: 512,
  height: 512,
  antialiasing: true,
  transparent: false,
  resolution: 1
});

// 挂载PIXI应用（通过canvas）
document.body.appendChild(app.view);

// 加载图片
loader
  .add("images/treasureHunter.json")
  .load(setup);

// 定义可能在多个函数中用到的变量
let state, explorer, treasure, blobs, chimes, exit, player, dungeon,
  door, healthBar, message, gameScene, gameOverScene, enemies, id;

// 图片加载完成回调
function setup () {

  // 创建分组容器 gameScene 并添加至stage
  gameScene = new Container();
  app.stage.addChild(gameScene);

  // 得到雪碧图素材
  id = resources["images/treasureHunter.json"].textures;

  // 创建精灵添加至场景
  dungeon = new Sprite(id["dungeon.png"]); // dungeon
  gameScene.addChild(dungeon);
  door = new Sprite(id["door.png"]); // door
  door.position.set(32, 0);
  gameScene.addChild(door);
  explorer = new Sprite(id["explorer.png"]);//Explorer
  explorer.x = 68;
  explorer.y = gameScene.height / 2 - explorer.height / 2;
  explorer.vx = 0;
  explorer.vy = 0;
  gameScene.addChild(explorer);
  treasure = new Sprite(id["treasure.png"]);//Treasure
  treasure.x = gameScene.width - treasure.width - 48;
  treasure.y = gameScene.height / 2 - treasure.height / 2;
  gameScene.addChild(treasure);

  // 制造敌人
  let numberOfBlobs = 6, // 数量
    spacing = 48, // 相邻敌人水平间距
    xOffset = 150, // 屏幕左侧偏移
    speed = 2,
    direction = 1; // 移动方向，1下移，-1上移
  // 存储敌人的数组
  blobs = [];
  // 创建每个敌人
  for (let i = 0; i < numberOfBlobs; i++) {
    // 创建敌人精灵
    let blob = new Sprite(id["blob.png"]);
    // 计算水平位置
    let x = spacing * i + xOffset;
    // 随机一个竖直位置
    let y = randomInt(0, app.stage.height - blob.height);
    // 设置位置
    blob.x = x;
    blob.y = y;
    // 计算竖直速度，（绝对速度*方向）
    blob.vy = speed * direction;
    // 相邻敌人反转方向
    direction *= -1;
    // 保存至数组
    blobs.push(blob);
    // 添加至分组容器
    gameScene.addChild(blob);
  }

  // 创建生命条
  healthBar = new Container() // 生命条分组容器
  healthBar.position.set(app.stage.width - 170, 4)
  gameScene.addChild(healthBar)
  // 创建生命条黑色背景
  let innerBar = new Graphics()
  innerBar.beginFill(0x000000)
  innerBar.drawRect(0, 0, 128, 8)
  innerBar.endFill()
  healthBar.addChild(innerBar) // 添加至容器
  // 创建生命条红色值
  let outerBar = new Graphics()
  outerBar.beginFill(0xFF3300)
  outerBar.drawRect(0, 0, 128, 8)
  outerBar.endFill();
  healthBar.addChild(outerBar) // 添加至容器
  healthBar.outer = outerBar // 设置outer属性为血条(方便读)

  // 创建游戏结束场景
  gameOverScene = new Container()
  app.stage.addChild(gameOverScene)
  // 游戏开始时隐藏游戏结束场景
  gameOverScene.visible = false
  // 添加游戏结束文本
  let style = new TextStyle({
    fontFamily: "Futura",
    fontSize: 64,
    fill: "white"
  });
  message = new Text("The End!", style);
  message.x = 120;
  message.y = app.stage.height / 2 - 32;
  gameOverScene.addChild(message);

  // 设置键盘控制
  let left = keyboard(37),
    up = keyboard(38),
    right = keyboard(39),
    down = keyboard(40);
  let configKeyboard = (function () {
    //Left arrow key `press` method
    left.press = function () {

      //Change the explorer's velocity when the key is pressed
      explorer.vx = -5;
      explorer.vy = 0;
    };

    //Left arrow key `release` method
    left.release = function () {

      //If the left arrow has been released, and the right arrow isn't down,
      //and the explorer isn't moving vertically:
      //Stop the explorer
      if (!right.isDown && explorer.vy === 0) {
        explorer.vx = 0;
      }
    };

    //Up
    up.press = function () {
      explorer.vy = -5;
      explorer.vx = 0;
    };
    up.release = function () {
      if (!down.isDown && explorer.vx === 0) {
        explorer.vy = 0;
      }
    };

    //Right
    right.press = function () {
      explorer.vx = 5;
      explorer.vy = 0;
    };
    right.release = function () {
      if (!left.isDown && explorer.vy === 0) {
        explorer.vx = 0;
      }
    };

    //Down
    down.press = function () {
      explorer.vy = 5;
      explorer.vx = 0;
    };
    down.release = function () {
      if (!up.isDown && explorer.vx === 0) {
        explorer.vy = 0;
      }
    };
  })()

  // 设置游戏状态为play
  state = play;

  // 开始游戏循环
  app.ticker.add(delta => gameLoop(delta));
}


function gameLoop (delta) {
  //Update the current game state:
  state(delta);
}

// 定义开始状态
function play (delta) {
  // 
  explorer.x += explorer.vx;
  explorer.y += explorer.vy;

  // 轮子：限制活动范围方法
  // contain(explorer, stage);
  contain(explorer, {
    x: 28,
    y: 10,
    width: 488,
    height: 480
  });
  
  // 初始化掉血状态
  let explorerHit = false
  
  // 在敌人数组中遍历每个敌人
  blobs.forEach(function (blob) {
    // 移动当前敌人
    blob.y += blob.vy
    // 检查当前边界
    let blobHitsWall = contain(blob, {
      x: 28,
      y: 10,
      width: 488,
      height: 480
    })
    // 如果在边界上则掉头
    if (blobHitsWall === "top" || blobHitsWall === "bottom") {
      blob.vy *= -1;
    }

    // 检测碰撞更新掉血状态
    if (hitTestRectangle(explorer, blob)) {
      explorerHit = true;
    }
  });

  // 如果是掉血状态
  if (explorerHit) {
    // 将探险家半透明
    explorer.alpha = 0.5;
    // 血条减少1px
    healthBar.outer.width -= 1;
  } else {
    // 探险家不透明
    explorer.alpha = 1;
  }

  // 如果探险家与宝箱碰撞
  if (hitTestRectangle(explorer, treasure)) {
    // 宝箱跟随探险家
    treasure.x = explorer.x + 8;
    treasure.y = explorer.y + 8;
  }
  // 如果血条为0
  if (healthBar.outer.width < 0) {
    state = end; // 游戏进入结束状态
    message.text = "You lost!"; // 更新结果文本
  }
  // 如果宝箱和门碰撞
  if (hitTestRectangle(treasure, door)) {
    state = end; // 进入结束状态
    message.text = "You won!"; // 更新结果文本
  }
}

// 定义结束状态
function end () {
  gameScene.visible = false;
  gameOverScene.visible = true;
}

/* Helper functions */

/**
 * 限制边界函数
 * @param {Sprite} sprite 
 * @param {} container
 * @return {String} 触碰的边界 
 */
function contain (sprite, container) {
  let collision = undefined;
  //Left
  if (sprite.x < container.x) {
    sprite.x = container.x;
    collision = "left";
  }
  //Top
  if (sprite.y < container.y) {
    sprite.y = container.y;
    collision = "top";
  }
  //Right
  if (sprite.x + sprite.width > container.width) {
    sprite.x = container.width - sprite.width;
    collision = "right";
  }
  //Bottom
  if (sprite.y + sprite.height > container.height) {
    sprite.y = container.height - sprite.height;
    collision = "bottom";
  }
  //Return the `collision` value
  return collision;
}

/**
 * 碰撞检测函数
 * @param {} r1 
 * @param {} r2 
 */
function hitTestRectangle (r1, r2) {
  //Define the variables we'll need to calculate
  let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;
  //hit will determine whether there's a collision
  hit = false;
  //Find the center points of each sprite
  r1.centerX = r1.x + r1.width / 2;
  r1.centerY = r1.y + r1.height / 2;
  r2.centerX = r2.x + r2.width / 2;
  r2.centerY = r2.y + r2.height / 2;
  //Find the half-widths and half-heights of each sprite
  r1.halfWidth = r1.width / 2;
  r1.halfHeight = r1.height / 2;
  r2.halfWidth = r2.width / 2;
  r2.halfHeight = r2.height / 2;
  //Calculate the distance vector between the sprites
  vx = r1.centerX - r2.centerX;
  vy = r1.centerY - r2.centerY;
  //Figure out the combined half-widths and half-heights
  combinedHalfWidths = r1.halfWidth + r2.halfWidth;
  combinedHalfHeights = r1.halfHeight + r2.halfHeight;
  //Check for a collision on the x axis
  if (Math.abs(vx) < combinedHalfWidths) {
    //A collision might be occuring. Check for a collision on the y axis
    if (Math.abs(vy) < combinedHalfHeights) {
      //There's definitely a collision happening
      hit = true;
    } else {
      //There's no collision on the y axis
      hit = false;
    }
  } else {
    //There's no collision on the x axis
    hit = false;
  }
  //`hit` will be either `true` or `false`
  return hit;
}


// 指定范围随机数
function randomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 键盘事件
function keyboard (keyCode) {
  var key = {};
  key.code = keyCode;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;
  //The `downHandler`
  key.downHandler = function (event) {
    if (event.keyCode === key.code) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
    }
    event.preventDefault();
  };

  //The `upHandler`
  key.upHandler = function (event) {
    if (event.keyCode === key.code) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
    }
    event.preventDefault();
  };

  //Attach event listeners
  window.addEventListener(
    "keydown", key.downHandler.bind(key), false
  );
  window.addEventListener(
    "keyup", key.upHandler.bind(key), false
  );
  return key;
}
