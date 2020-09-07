(function () {
  var scrollDirection = "top", // 滑动方向
    scrollPro = 0, // 滑动位置
    ww = window.innerWidth, // 设备宽
    wh = window.innerHeight, // 设备高
    other_par, // 其他变量
    loader; // pixi加载器

  // 图片URL地址前缀，根据项目地址修改
  var basUrl = 'http://fps-pro.ws.126.net/fps-pro/frontends/house_special_2019/nansha/'
  var loc_href = window.location.href // 当前url
  var play = false // 音乐播放状态
  // 界面元素
  var $music = $(".music")
  var bgm = $(".bgm")[0]
  // 拖拽的画布总长度
  var contentLength = 5024
  // pixi用到的精灵图片
  var img = [
    'image/bg0.jpg',
    'image/bg1.jpg',
    'image/bg2.jpg',
    'image/bg3.jpg'
  ]

  /* 音乐播放相关*/
  // 微信环境默认播放BGM
  document.addEventListener("WeixinJSBridgeReady", function () {
    WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
      $(".bgm")[0].play()
    });
  }, false);
  document.addEventListener("WeixinJSBridgeReady", function () {
    WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
      // music.play()
      $music.addClass("play")
      play = true
      bgm.play()
    });
  }, false);
  $music.on("click", function () {
    if (play) {
      bgm.pause()
      $music.removeClass("play")
    } else {
      player(bgm)
      $music.addClass("play")
    }
    play = !play
  })
  // 音乐播放器
  var player = function (voice) {
    if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
      WeixinJSBridge.invoke('getNetworkType', {}, function (res) {
        // 在这里拿到 e.err_msg, 这里面就包含了所有的网络类型
        // alert(res.err_msg);
        voice.play()
      });
    }
  }

  /* pixi配置 */
  function pixiFn () {
    // 初始化pixi
    app = new PIXI.Application({
      width: 750,
      height: window.innerHeight,
      backgroundColor: 0Xffffff
    });
    // 插入pixi标签
    $(".chang").append(app.view);
    var index1 = new PIXI.DisplayGroup(1, false);
    // 初始化加载器
    loader = new PIXI.loaders.Loader();
    if (window.location.href.indexOf('163.com') > -1) {
      for (var i = 0; i < img.length; i++) {
        img[i] = basUrl + img[i];
      }
    }
    // 加载图片
    loader.add(img)
    // 创建容器
    container = new PIXI.Container() // 整体container，最后添加所有场景
    container.interactive = true
    bg_container = new PIXI.Container()    // 背景图容器
    inner_container = new PIXI.Container()
    inner_container.interactive = true

    // 图片加载成功回调
    // 创建容器、精灵
    // 精灵初始化：位置、透明度、补间动画···
    loader.load(function (loader) {
      // 创建精灵
      // 背景：一屏一段
      bg0 = createSprite('image/bg0.jpg', {
        x: 0, // 配置位置
        y: 0
      })
      bg1 = createSprite('image/bg1.jpg', {
        x: 0,
        y: 1206
      })
      bg2 = createSprite('image/bg2.jpg', {
        x: 0,
        y: 2412
      })
      bg3 = createSprite('image/bg3.jpg', {
        x: 0,
        y: 3560
      })
      // 元素精灵
      zi0 = createSprite('image/zi0.png', {
        x: 226, // 位置
        y: 166,
        alpha: 0 // 初始隐藏
      })
      zi1 = createSprite('image/zi1.png', {
        x: 139,
        y: 365,
        alpha: 0
      })
      zi2 = createSprite('image/zi2.png', {
        x: 268,
        y: 790,
        alpha: 0
      })
      arrow = createSprite('image/arrow.png', {
        x: 352,
        y: 856
      })
      zi3 = createSprite('image/zi3.png', {
        x: 266,
        y: 1510,
        alpha: -0.5
      })
      j0 = createSprite('image/j0.png', {
        x: 478,
        y: 1906
      })
      j0.alpha = -0.5
      j0.anchor.x = 0.5 // 锚点改为精灵中心
      j0.anchor.y = 0.5
      j0.scale.x = 0.85 // 等比缩放精灵
      j0.scale.y = 0.85
      zi4 = createSprite('image/zi4.png', {
        x: 0,
        y: 2004,
        alpha: -0.5
      })
      zi4.alpha = -0.5
      zi5 = createSprite('image/zi5.png', {
        x: 350,
        y: 2380,
        alpha: -0.5
      })
      j1 = createSprite('image/j1.png', {
        x: 197,
        y: 2712,
        alpha: -0.5
      })
      j1.anchor.x = 0.5;
      j1.anchor.y = 0.5;
      j1.scale.x = 0.85
      j1.scale.y = 0.85
      j2 = createSprite('image/j2.png', {
        x: 574,
        y: 3279,
        alpha: -0.5
      })
      j2.anchor.x = 0.5;
      j2.anchor.y = 0.5;
      j2.scale.x = 0.85
      j2.scale.y = 0.85
      zi6 = createSprite('image/zi6.png', {
        x: 30,
        y: 3120,
        alpha: -0.5
      })
      zi7 = createSprite('image/zi7.png', {
        x: 110,
        y: 3720,
        alpha: -0.5
      })
      foot = createSprite('image/foot.png', {
        x: 71,
        y: 4011
      })
      cj = createSprite('image/cj.png', {
        x: 377,
        y: 4797
      })
      cj.anchor.x = 0.5;
      cj.anchor.y = 0.5;
      cj.interactive = true
      cj.on('pointerdown', function (e) {
        location.replace("http://m.house.163.com/fps/frontends/house_special_2019/nansha/index1.html")
      })
      // 使用TweenMax添加补间动画
      TweenMax.to(cj, 0.5, {
        alpha: 0.4, // 目标样式
        repeat: -1, // 无限重复
        yoyo: true, // 往返进行
        ease: Linear.easeNone // 缓动效果曲线
      })
      boat = createSprite('image/boat.png', {
        x: 530,
        y: 1290
      })
      boat.anchor.x = 1
      boat.scale.x = 1

      /* 精灵加至容器，容器在舞台显示*/
      arrow_container = new PIXI.Container() // 箭头提示组合容器

      // 添加子精灵
      arrow_container.addChild(zi2, arrow)
      // 设置容器透明度
      arrow_container.alpha = 0
      // 背景组合容器
      bg_container.addChild(bg0, bg1, bg2, bg3)
      // 内部内容组合容器
      inner_container.addChild(zi0, zi1, zi2, arrow_container, zi3, zi4, zi5, zi6, zi7, foot, cj, boat, j0, j1, j2)
      // 根容器
      container.addChild(bg_container, inner_container)
      // 添加根容器至舞台
      app.stage.addChild(container)

      // 配置容器补间动画
      TweenMax.to(arrow, 0.5, {
        y: 836, // 目标坐标
        ease: Linear.easeNone,
        repeat: -1,
        yoyo: true
      })
      // 通过定时器实现逐个出现
      setTimeout(function () {
        TweenMax.to(zi0, 0.3, {
          alpha: 1,
          ease: Linear.easeNone
        })
      }, 1000)
      setTimeout(function () {
        TweenMax.to(zi1, 0.3, {
          alpha: 1,
          ease: Linear.easeNone
        })
      }, 1700)
      setTimeout(function () {
        TweenMax.to(zi2, 0.3, {
          alpha: 1,
          ease: Linear.easeNone
        })
        TweenMax.to(arrow_container, 0.3, {
          alpha: 1,
          ease: Linear.easeNone
        })
      }, 2400)

      /* 使用Scroller处理滑动效果 */
      // 设置滑动动态更新
      scrollBegin()
      // 设置滚动区域和内容长度
      scroller.setDimensions(app.view.width, app.view.height, app.view.width, contentLength);
      // scroller.setPosition(0,1800)
    })
  }
  pixiFn()

  /** 设置滑动动态更新 */
  function scrollBegin () {
    /**
     * 基于 Scroller 创建一个滚动缩放组件实例
     * @param {Function} 处理滚动事物
     * 根据滚动位置动态更新pixi精灵状态
     * 参数（横向滑动距离，纵向滑动距离，缩放比）
     * @param {Object} 配置滑动效果
     */
    scroller = new Scroller(function (left, top, zoom) {
      // 更新滑动位置（横纵以长的为准）
      scrollPro = left > top ? left : top;
      console.log(scrollPro)
      // 根据滑动方向和位置更新pixi根容器位置
      if (scrollDirection == "top") {
        container.y = -top;
      }
      if (scrollDirection == "left") {
        container.y = -left;
      }
      // 根据滑动位置更新pixi精灵状态
      // 滑动位置（600，750）渐现一个精灵（计算得到当前的透明度）
      if (600 < scrollPro && scrollPro < 750) {
        zi3.alpha = scrollNum(600, 750, scrollPro, -0.5, 1.5)
      }
      // 滑动位置（750，850）固定一个精灵的透明度和缩放
      if (750 < scrollPro && scrollPro < 850) {
        j0.alpha = -0.5
        j0.scale.x = 0.85
        j0.scale.y = 0.85
      }
      // 放大+渐现效果
      if (850 < scrollPro && scrollPro < 1000) {
        j0.alpha = scrollNum(850, 1000, scrollPro, -0.5, 1.5)
        j0.scale.x = scrollNum(850, 1000, scrollPro, 0.85, 1)
        j0.scale.y = scrollNum(850, 1000, scrollPro, 0.85, 1)
      }
      // 固定
      if (1000 < scrollPro && scrollPro < 1100) {
        j0.alpha = 1.5
        j0.scale.x = 1
        j0.scale.y = 1
        zi4.alpha = -0.5
      }
      if (1100 < scrollPro && scrollPro < 1200) {
        zi4.alpha = scrollNum(1100, 1200, scrollPro, -0.5, 1.5)
      }
      if (1200 < scrollPro && scrollPro < 1400) {
        zi4.alpha = 1.5
      }
      if (1400 < scrollPro && scrollPro < 1600) {
        zi5.alpha = scrollNum(1400, 1600, scrollPro, -0.5, 1.5)
      }
      if (1600 < scrollPro && scrollPro < 1700) {
        zi5.alpha = 1.5
        j1.alpha = -0.5
        j1.scale.x = 0.85
        j1.scale.y = 0.85
      }
      if (1700 < scrollPro && scrollPro < 2000) {
        j1.alpha = scrollNum(1700, 2000, scrollPro, -0.5, 1.5)
        j1.scale.x = scrollNum(1700, 2000, scrollPro, 0.85, 1)
        j1.scale.y = scrollNum(1700, 2000, scrollPro, 0.85, 1)
      }
      if (2000 < scrollPro && scrollPro < 2100) {
        j1.alpha = 1.5
        j1.scale.x = 1
        j1.scale.y = 1
      }
      if (2200 < scrollPro && scrollPro < 2300) {
        j2.alpha = -0.5
        j2.scale.x = 0.85
        j2.scale.y = 0.85
        zi6.alpha = -0.5
      }
      if (2300 < scrollPro && scrollPro < 2450) {
        j2.alpha = scrollNum(2300, 2450, scrollPro, -0.5, 1.5)
        j2.scale.x = scrollNum(2300, 2450, scrollPro, 0.85, 1)
        j2.scale.y = scrollNum(2300, 2450, scrollPro, 0.85, 1)
        zi6.alpha = scrollNum(2300, 2450, scrollPro, -0.5, 1.5)
      }
      if (2450 < scrollPro && scrollPro < 2550) {
        j2.alpha = 1.5
        j2.scale.x = 1
        j2.scale.y = 1
        zi6.alpha = 1.5
      }
      if (2700 < scrollPro && scrollPro < 2800) {
        zi7.alpha = scrollNum(2700, 2800, scrollPro, -0.5, 1.5)
      }
      // 滑动位置（500，1100）移动船精灵的位置
      if (500 < scrollPro && scrollPro < 1100) {
        boat.anchor.x = 1 // 固定锚点
        boat.scale.x = 1
        boat.x = scrollNum(500, 900, scrollPro, 530, 260)
        boat.y = scrollNum(500, 1100, scrollPro, 1290, 1940)
      }
      if (1100 < scrollPro && scrollPro < 1700) {
        boat.x = scrollNum(1100, 1700, scrollPro, 260, 900)
        boat.y = scrollNum(1100, 1700, scrollPro, 1940, 2500)
        boat.anchor.x = 0
        boat.scale.x = -1
      }
      if (2100 < scrollPro && scrollPro < 2900) {
        boat.x = scrollNum(2100, 2900, scrollPro, 900, 190)
        boat.y = scrollNum(2100, 2900, scrollPro, 2800, 3400)
        boat.anchor.x = 1
        boat.scale.x = 1
      }
    }, {
      zooming: true,  // 居中缩放
      bouncing: false // 弹跳特效
    });
    /* 使用原生touch事件绑定scroller */
    // 不能用正常move事件（因为canvas事件会覆盖move事件）
    var mousedown = false;
    // 屏蔽原生的touch滚动事件
    document.addEventListener('touchmove', function (event) {
      event.preventDefault();
      return false
    });
    $('.main')[0].addEventListener('touchmove', function (event) {
      event.preventDefault();
      return false
    });
    document.addEventListener("touchstart", function (e) {
      scroller.doTouchStart(e.touches, e.timeStamp);
      mousedown = true;
    }, false);

    document.addEventListener("touchmove", function (e) {
      if (!mousedown) {
        return;
      }
      scroller.doTouchMove(e.touches, e.timeStamp);
      // scroller.scrollTo(0, 2000);
      mousedown = true;
    }, false);

    document.addEventListener("touchend", function (e) {
      if (!mousedown) {
        return;
      }
      scroller.doTouchEnd(e.timeStamp);
      mousedown = false;
    }, false);
    console.log(scroller)
  }

  // 一些辅助轮子
  /**
   * 根据跨度区间的位置计算当前值
   * @param {*} minNum 跨度区间最小值
   * @param {*} maxNum 跨度区间最大值
   * @param {*} top    当前跨度
   * @param {*} start  原始值
   * @param {*} end    最终值
   */
  function scrollNum (minNum, maxNum, top, start, end) {
    return start + ((top - minNum) / (maxNum - minNum) * (end - start));
  }
  /**
   * 创建序列帧动画
   * @param {*} name 
   * @param {*} num 
   * @param {*} opt 
   * @param {*} start 
   */
  function createAnimatedSprite (name, num, opt, start) {
    // 用json 资源创建一个 AnimatedSprite 对象
    var Textures = [],
      i, AnimatedSpriteInstance;
    i = start || 0;
    for (; i < num; i++) {
      console.log(name + i + '.png');
      var Texture = PIXI.Texture.fromImage(name + i + '.png');
      Textures.push(Texture);
    }
    AnimatedSpriteInstance = new PIXI.extras.AnimatedSprite(Textures);
    if (opt) {
      _.forIn(opt, function (value, key) {
        AnimatedSpriteInstance[key] = value;
      });
    }
    return AnimatedSpriteInstance;
  }
  /**
   * 创建sprite对象
   * @param {*} name 
   * @param {*} opt 
   */
  function createSprite (name, opt) {
    var imgSrc = window.location.href.indexOf('163.com') > -1 ? basUrl + name : name;
    var newSprite = new PIXI.Sprite.fromImage(imgSrc)
    if (opt) {
      _.forIn(opt, function (value, key) {
        newSprite[key] = value;
      });
    }
    return newSprite;
  }
  function aniSprite (obj, sDuration, eDuration, scrollPro) {
    obj.ele[obj.key] = scrollNum(sDuration, eDuration, scrollPro, obj.sv, obj.ev);
  }
})(jQuery)