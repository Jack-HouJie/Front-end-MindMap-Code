// 查询支持的类型
let type = "WebGL"
if (!PIXI.utils.isWebGLSupported()) {
  type = "canvas"
}
// 调试
PIXI.utils.sayHello(type)

// API使用别名，方便维护
let Application = PIXI.Application, // pixi应用
  loader = PIXI.loader, // 加载器
  resources = PIXI.loader.resources,
  Sprite = PIXI.Sprite, // 精灵
  TextureCache = PIXI.utils.TextureCache, // 纹理缓存
  Rectangle = PIXI.Rectangle, // 雪碧图区域
  Container = PIXI.Container, // 分组容器
  Text = PIXI.Text, // 文本
  TextStyle = PIXI.TextStyle // 文本样式

/** 配置Pixi应用,挂载*/
// 文档http://pixijs.download/release/docs/PIXI.Application.html
let app = new Application({
  width: 256,         // default: 800
  height: 256,        // default: 600
  antialias: true,    // default: false 使得字体的边界和几何图形更加圆滑
  transparent: false, // default: false 整个Canvas标签的透明度
  resolution: 1,       // default: 1 设置分辨率
  forceCanvas: false // default: false 是否使用Canvas引擎（默认用webGL）
})
// 添加根容器
// Add the canvas that Pixi automatically created for you to the HTML document
$("#H5").html(app.view)

/** 配置画布*/
let configCanvas = (function () {
  app.renderer.backgroundColor = 0x061639 // 设置颜色（支持16进制颜色）
  app.renderer.autoResize = true // 确保宽高格式正确
  app.renderer.resize(512, 512) // 设置宽高：固定512x512
  app.renderer.view.style.position = "absolute" // css绝对定位
  app.renderer.view.style.display = "block" // css块级元素
  app.renderer.resize(window.innerWidth, window.innerHeight) // 设置宽高：视口宽高
  console.log("canvas width : " + app.renderer.view.width) // 读宽
  console.log("canvas height : " + app.renderer.view.height) // 读高
})()


/**
 * 创建精灵基本模版
 */
let createSpritTemplate = (function () {
  /** 读纹理缓存 */
  // let all = TextureCache["images/rocket.png"]
  // // 根据缓存创建精灵
  // let sprite = new PIXI.Sprite(all)

  /** 加载图像创建精灵 */
  // 加载单文件图像
  // loader
  //   .add("images/rocket.png")
  //   .load(setup)
  // // // 同时加载多个图像
  // // loader
  // //   .add([
  // //     "images/rocket.png",
  // //     "images/door.png",
  // //     "images/dungeon.png"
  // //   ])
  // //   .load(setup)

  // // 加载成功后的回调函数
  // let rocket = null
  // function setup () {
  //   // 根据纹理创建精灵
  //   rocket = new Sprite(resources["images/rocket.png"].all)
  //   // 读写精灵位置
  //   rocket.x = 96
  //   rocket.y = 96
  //   // rocket.position.set(96, 96)
  //   console.log("rocket position : (" + rocket.x + "，" + rocket.y + ")")
  //   // console.log("rocket position x : " + rocket.position.x)

  //   // 读写精灵大小
  //   rocket.width = 80
  //   rocket.height = 120
  //   console.log("rocket size : " + rocket.width + "px * " + rocket.height + "px")

  //   // 等比缩放
  //   rocket.scale.x = 0.5
  //   rocket.scale.y = 0.5
  //   // rocket.scale.set(0.5, 0.5) 
  //   console.log("rocket size : " + rocket.width + "px * " + rocket.height + "px")

  //   // 以锚点为中心旋转
  //   // 改变锚点位置（默认为精灵位置）
  //   rocket.anchor.x = 0.5
  //   rocket.anchor.y = 0.5
  //   // // 改变原点位置
  //   // rocket.anchor.set(x, y)
  //   // 旋转
  //   rocket.rotation = 0.5

  //   // 在pixi应用的舞台容器上添加精灵
  //   app.stage.addChild(rocket)
  //   // // 删除精灵
  //   // app.stage.removeChild(rocket)
  //   // // 隐藏精灵
  //   // setTimeout(() => {
  //   //   rocket.visible = false
  //   // }, 2000)
  // }
})()

/**
 * 雪碧图截取精灵
 * 创建组合容器
 * 创建图形，文本
 * 添加事件循环
 */
loader
  .add([
    "images/tileset.png", // 雪碧图
    "images/animals.json",
  ])
  .load(Start)
let all, rectangle, rocket // rocket精灵所在的雪碧图纹理、其所在区域、精灵本身、状态
// let animals, cat, hedgehog, tiger // 分组容器，及三个子精灵
let message, box
let state
function Start () {
  /** 雪碧图截取单精灵 */
  let createSprit = (function () {
    // 雪碧图纹理
    all = TextureCache["images/tileset.png"]
    // 从纹理中截取矩形区域子图像
    rectangle = new Rectangle(192, 128, 64, 64)
    // 纹理使用子图像
    all.frame = rectangle
    // 从纹理创建精灵
    rocket = new Sprite(all)
    // 设置精灵位置
    rocket.x = 300
    rocket.y = 300
    rocket.vx = 0 // x速度
    rocket.vy = 0 // y速度
    // 添加精灵至舞台容器
    app.stage.addChild(rocket)
  })()
  /** 创建分组容器添加精灵 */
  let createGroup = (function () {
    // // 有三种可选方法，从雪碧纹理中得到子精灵
    // let animals_textures = resources["images/animals.json"].textures;
    // cat = new Sprite(animals_textures["cat.png"]);
    // cat.position.set(16, 16);
    // hedgehog = new Sprite(animals_textures["hedgehog.png"]);
    // hedgehog.position.set(32, 32);
    // tiger = new Sprite(animals_textures["tiger.png"]);
    // tiger.position.set(64, 64);
    // // 子精灵添加至分组容器
    // animals = new Container();
    // animals.addChild(cat);
    // animals.addChild(hedgehog);
    // animals.addChild(tiger);
    // // 分组容器添加至舞台
    // app.stage.addChild(animals);
    // // 设置分组容器位置
    // animals.position.set(64, 64);
    // // 读写容器宽高
    // console.log("animals.width:" + animals.width);
    // console.log("animals.height:" + animals.height);
    // animals.width = 200; // 子精灵会等比例缩放
    // animals.height = 200;
    // // 读写子精灵局部位置
    // console.log("cat.x局部位置：" + cat.x);

    // // 读写精灵全局位置
    // cat_global_x = cat.getGlobalPosition().x
    // cat_global_y = cat.getGlobalPosition().y
    // console.log("cat全局位置：" + cat_global_x + "," + cat_global_y);
    // // console.log(animals.toGlobal(cat.position))
    // // console.log(cat.parent.toGlobal(cat.position))

    // // 读精灵间距离(相对局部位置)
    // let th_dis_x = tiger.toLocal(tiger.position, hedgehog).x
    // let th_dis_y = tiger.toLocal(tiger.position, hedgehog).y
    // console.log("老虎和猫头鹰左上角距离：" + th_dis_x + "," + th_dis_y);
    // 高性能分组ParticleContainer （待学）
  })()
  /** 绘制图形 
   *  见../LearningPixi/exapmles/14_graphicPrimitives.html
  */
  let createGraph = (function () {
    // Create the box
    box = new PIXI.Graphics();
    box.beginFill(0xCCFF99);
    box.drawRect(0, 0, 64, 64);
    box.endFill();
    box.x = 120;
    box.y = 96;
    app.stage.addChild(box);
  })()
  /** 创建文本
   *  见../LearningPixi/exapmles/15_displayingText.html
   */
  // Create the text sprite
  let createText = (function () {
    let style = new TextStyle({
      fontFamily: "sans-serif",
      fontSize: 18,
      fill: "white",
    });
    message = new Text("No collision...", style);
    message.position.set(8, 8);
    app.stage.addChild(message);
  })()
  // 配置键盘响应
  let left = keyboard(37),
    up = keyboard(38),
    right = keyboard(39),
    down = keyboard(40)
  let configKeyboard = (function () {
    // 根据键盘事件，更新速度
    // 左键按下时
    left.press = () => {
      //Change the rocket's velocity when the key is pressed
      rocket.vx = -5
      rocket.vy = 0
    }
    // 左键松开时
    left.release = () => {
      //If the left arrow has been released, and the right arrow isn't down,
      //and the rocket isn't moving vertically:
      //Stop the rocket
      if (!right.isDown && rocket.vy === 0) {
        rocket.vx = 0
      }
    }
    // 上键
    up.press = () => {
      rocket.vy = -5
      rocket.vx = 0
    }
    up.release = () => {
      if (!down.isDown && rocket.vx === 0) {
        rocket.vy = 0
      }
    }
    // 右键
    right.press = () => {
      rocket.vx = 5
      rocket.vy = 0
    }
    right.release = () => {
      if (!left.isDown && rocket.vy === 0) {
        rocket.vx = 0
      }
    }
    // 下键
    down.press = () => {
      rocket.vy = 5
      rocket.vx = 0
    }
    down.release = () => {
      if (!up.isDown && rocket.vx === 0) {
        rocket.vy = 0
      }
    }
  })()

  // 设置状态
  state = play
  // 通过tickeer添加游戏循环，传入参数delta（用于向下兼容）
  app.ticker.add(delta => gameLoop(delta))
}

/**
 * 游戏循环中更新状态（一秒执行60次）
 * @param {}} delta 
 */
function gameLoop (delta) {
  // 更新当前状态
  state(delta)
}

/**
 * 定义状态
 * @param {*} delta 
 */
function play (delta) {
  // 🚀精灵根据速度移动
  rocket.x += rocket.vx
  rocket.y += rocket.vy
  // 检查碰撞
  if (hitTestRectangle(rocket, box)) {
    message.text = "hit!";
    box.tint = 0xff3300;
  } else {
    message.text = "No collision...";
    box.tint = 0xccff99;
  }
}

/**
 * 碰撞检测函数
 * @param {Sprit} r1 
 * @param {Sprit} r2 
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
/**
 * 监听捕捉键盘事件函数
 * @param {Number} keyCode 想监听的键盘按键对应的ASCII键值数
 * https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
 */
function keyboard (keyCode) {
  let key = {}
  key.code = keyCode
  key.isDown = false
  key.isUp = true
  key.press = undefined
  key.release = undefined
  //The `downHandler`
  key.downHandler = event => {
    if (event.keyCode === key.code) {
      if (key.isUp && key.press) key.press()
      key.isDown = true
      key.isUp = false
    }
    event.preventDefault()
  }
  //The `upHandler`
  key.upHandler = event => {
    if (event.keyCode === key.code) {
      if (key.isDown && key.release) key.release()
      key.isDown = false
      key.isUp = true
    }
    event.preventDefault()
  }
  //Attach event listeners
  window.addEventListener(
    "keydown", key.downHandler.bind(key), false
  )
  window.addEventListener(
    "keyup", key.upHandler.bind(key), false
  )
  return key
}
