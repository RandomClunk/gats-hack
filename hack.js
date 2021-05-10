// ==UserScript==
// @name         gats.io hack
// @match        gats.io
// @run-at      document-start
// @grant       none
// ==/UserScript==

// createElement('div') => <div></div>
// createElement('div#app') => <div id="app"></div>
// createElement('div.left') => <div class="left"></div>
// createElement('input', { type: 'text', disabled: true }, { fontSize: '14px '}) =>
// <input type="text" disabled="true" style="font-size: 14px;">
function createElement(data, attributes = {}, styles = {}) {
  const splits = data.split(/[#\.]/);

  const element = document.createElement(splits.shift());

  if(data.includes('#')) element.id = splits.shift();

  for(const cls of splits) element.classList.add(cls);

  for(const attr in attributes) element.setAttribute(attr, attributes[attr]);
  for(const prop in styles) element.style[prop] = styles[prop];

  return element;
}

// loadScript('https://example.com/test.js').then(displayResults).catch(displayError)
function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');

    script.addEventListener('load', resolve);
    script.addEventListener('error', reject);

    script.src = src;

    document.body.appendChild(script);
  });
}

const shortcuts = {};

function addShortcut(key, type, fn) {
  if(!shortcuts[key]) shortcuts[key] = [];

  shortcuts[key].push({ type, fn });
}

document.addEventListener('keydown', e => {
  const key = e.key;

  if(!shortcuts[key]) return;

  for (const { type, fn } of Object.values(shortcuts[key])) {
    if(type === 'keydown') fn(e);
  }
});

document.addEventListener('keyup', e => {
  const key = e.key;

  if(!shortcuts[key]) return;

  for (const { type, fn } of Object.values(shortcuts[key])) {
    if(type === 'keyup') fn(e);
  }
});

document.addEventListener('keypress', e => {
  const key = e.key;

  if(!shortcuts[key]) return;

  for (const { type, fn } of Object.values(shortcuts[key])) {
    if(type === 'keypress') fn(e);
  }
});

Object.defineProperties(window, {
  chatting: {
    get() {
      return j46;
    }
  },
  spawned: {
    get() {
      return c4;
    }
  },
  mapSizeWidth: {
    get() {
      return j11;
    }
  },
  mapSizeHeight: {
    get() {
      return j12;
    }
  },
  mapWidth: {
    get() {
      return j31;
    }
  },
  mapHeight: {
    get() {
      return j41;
    }
  },
  ctx: {
    get() {
      return j58;
    }
  }
});

Math.RADS2DEGS = 180 / Math.PI;
Math.DEGS2RADS = Math.PI / 180;

Math.dist = (p1, p2) => Math.hypot(p2.x - p1.x, p2.y - p1.y);

Math.angle = (p1, p2) => Math.atan2(p2.y - p1.y, p2.x - p1.x);

function chat(msg) {
  RF.list[0].send(`c,${msg}`);
}

function resizeCamera(width, height) {
  window.width = width;
  window.height = width / (16 / 9);

  a1({
    width: width,
    height: typeof height !== 'undefined' ? height : width / (16 / 9)
  });
}

function getClosestPlayerData(p) {
  const closestPlayer =  Object.values(RD.pool)
    .filter(p => p.teamCode === 0 || p.teamCode !== RD.pool[c3].teamCode)
    .sort((p1, p2) => Math.dist(p1, p) - Math.dist(p2, p))[0];

  return {
    player: closestPlayer,
    distance: closestPlayer ? Math.dist(RD.pool[c3], closestPlayer) : undefined
  };
}

let customAngle = false;
let angle = 0;

function loaded() {
const hack = (() => {
  let exports = {};

  const folders = {};

  const modules = {};

  function createGUI() {
    const gui = exports.gui = new dat.GUI({ width: 300 });

    folders.modules = gui.addFolder('Modules');

    for(const module in modules) modules[module]();

    gui.domElement.parentElement.style.zIndex = '1000';
  }

  loadScript('https://unpkg.com/dat.gui@0.7.7/build/dat.gui.min.js').then(createGUI);

  exports.folders = folders;
  exports.modules = modules;

  return exports;
})();

// Thermal module
hack.modules.thermal = (() => {
  const options = {
    enabled: false,
    showEnemyNames: true
  };

  const folder = hack.folders.modules.addFolder('Thermal');

  const enabled = folder.add(options, 'enabled').name('Enabled');
  const showEnemyNames = folder.add(options, 'showEnemyNames').name('Show Enemy Names');

  let int;

  enabled.onChange(value => {
    if(value) {
      int = setInterval(() => {
        if(c4) RD.pool[c3].thermal = 1;
      });
    } else {
      clearInterval(int);
    }
  });

  RD.prototype.drawBody = function (style, specialChars) {
    if (!this.activated) {
      return;
    }
    var position = specialChars.getRelPos(this.getAttr());
    if (!this.ghillie || this.spdX != 0 || this.spdY != 0 || this.beingHit || this.shooting) {
      if (this.isLeader) {
        style.globalAlpha = 0.3;
        style.strokeStyle = this.color.a;
        style.lineWidth = 10;
        j22(style, position.x, position.y, this.radius * 1.65);
      }
      if (this.invincible) {
        style.globalAlpha = 0.3;
      } else {
        style.globalAlpha = 1;
      }
      style.lineWidth = 2;
      style.strokeStyle = this.isPremiumMember ? "#000" : "#666";
      style.fillStyle = this.isPremiumMember ? "#000" : "#666";
      j22(style, position.x, position.y, this.radius + 1);
      style.fill();
      style.lineWidth = 1;
      style.strokeStyle = this.color.b;
      style.fillStyle = this.color.b;
      j22(style, position.x, position.y, this.radius - this.armorAmount / 10);
      style.fill();
      if (this.dashing) {
        style.strokeStyle = "#bababa";
        j21(style, position.x, position.y, position.x - this.spdX * 5, position.y - this.spdY * 5, 1);
        j21(style, position.x, position.y + 20, position.x - this.spdX * 5, position.y + 20 - this.spdY * 5, 1);
        j21(style, position.x, position.y - 20, position.x - this.spdX * 5, position.y - 20 - this.spdY * 5, 1);
        j21(style, position.x + 20, position.y, position.x + 20 - this.spdX * 5, position.y - this.spdY * 5, 1);
        j21(style, position.x - 20, position.y, position.x - 20 - this.spdX * 5, position.y - this.spdY * 5, 1);
      }
      style.lineWidth = 1;
      style.strokeStyle = this.color.a;
      style.fillStyle = this.color.a;
      j22(style, position.x, position.y, this.hpRadius + 1);
      style.fill();
      if (c37 && this.id != c3) {
        style.fillStyle = this.isPremiumMember ? "#000" : "#666";
        style.font = "bold 12px Arial";
        style.textAlign = "center";
        if (this.isPremiumMember) {
          style.globalAlpha = 0.75;
          var width = style.measureText(this.username).width;
          style.fillText(this.username, position.x - 9, position.y + this.radius * 1.75);
          drawImage(j30.vip, position.x + width / 2 - 6, position.y + this.radius * 1.75 - 9, 18, 10);
          style.globalAlpha = 1;
        } else {
          style.fillText(this.username, position.x, position.y + this.radius * 1.75);
        }
        style.textAlign = "start";
      }
      style.globalAlpha = 1;
    } else {
      if (this.id != c3 && RD.pool[c3].thermal == 1) {
        if (this.teamCode > 0 && this.teamCode == RD.pool[c3].teamCode) {
          style.strokeStyle = "#107a24";
          style.font = "bold 12px Arial";
          style.textAlign = "center";
          style.fillStyle = "#107a24";
          style.fillText(this.username, position.x, position.y + this.radius * 1.75);
          style.textAlign = "start";
        } else if(showEnemyNames.getValue()) {
          style.strokeStyle = "red";
          style.font = "bold 12px Arial";
          style.textAlign = "center";
          style.fillStyle = "red";
          style.fillText(this.username, position.x, position.y + this.radius * 1.75);
          style.textAlign = "start";
          style.strokeStyle = "#ff0000";
        }
      } else {
        style.strokeStyle = "#efeff5";
      }
      style.lineWidth = 2;
      j22(style, position.x, position.y, this.radius);
      style.fillStyle = "#efeff5";
      style.fill();
    }
    if (c37) {
      var obj = this.j47;
      if (obj == "" && this.chatBoxOpen) {
        obj = "...";
      }
      if (obj[obj.length - 1] == " ") {
        obj = obj.substring(0, obj.length - 1);
      }
      if (obj.length > 0) {
        style.font = "bold 12px Arial";
        style.textAlign = "center";
        var targetHeight = style.measureText(obj).width;
        style.globalAlpha = 0.7;
        style.fillStyle = this.isPremiumMember ? "#000" : "#7a7a7a";
        style.fillRect(position.x - targetHeight / 2 - 3, position.y + this.radius * 2.7 - 13, targetHeight + 6, 18);
        style.globalAlpha = 1;
        style.fillStyle = this.isPremiumMember ? "#deb34c" : "#FFF";
        style.fillText(obj, position.x, position.y + this.radius * 2.7);
        style.textAlign = "start";
      }
    }
  };
});

// Binoculars module
hack.modules.binocs = (() => {
  const options = {
    enabled: false,
    width: 2200
  };

  const folder = hack.folders.modules.addFolder('Binoculars');

  const enabled = folder.add(options, 'enabled').name('Enabled');
  const width = folder.add(options, 'width').name('Width').min(100).max(6000).step(100);

  let int;

  enabled.onChange(value => {
    if(value) {
      int = setInterval(() => {
        if(spawned) resizeCamera(width.getValue());
      });
    } else {
      clearInterval(int);

      resizeCamera(parseInt(c2.width), parseInt(c2.height));
    }
  });

  addShortcut('-', 'keypress', () => width.setValue(width.getValue() + 100));
  addShortcut('=', 'keypress', () => width.setValue(width.getValue() - 100));
});

// Aimbot module
hack.modules.aimbot = (() => {
  const options = {
    enabled: false,
    predictionFactor: 30
  };

  const folder = hack.folders.modules.addFolder('Aimbot');

  const enabled = folder.add(options, 'enabled').name('Enabled');
  const predictionFactor = folder.add(options, 'predictionFactor').name('Prediction Factor')
    .min(10).max(100).step(10);

  window.a57 = function(res) {
    var eventPage = c2.getRelPos(RD.pool[c3].getAttr());
    var a = eventPage.x * j6;
    var r = eventPage.y * j5;
    var from = Math.atan2(r - res.clientY, a - res.clientX) * 180 / Math.PI + 180;
    var until = Math.round(from + Math.asin(18 / Math.sqrt(Math.pow(a - res.clientX, 2) + Math.pow(r - res.clientY, 2))) * 180 / Math.PI);
    j39 = Math.sqrt(Math.pow(r - res.clientY, 2) + Math.pow(a - res.clientX, 2));
    j16 = [
      Math.round(a - res.clientX),
      Math.round(r - res.clientY),
      customAngle ? angle : Math.round(from)
    ];
    RD.pool[c3].mouseAngle = Math.round(from);
    if (until > 360) {
      until = until - 360;
    } else {
      if (!until) {
        until = from;
      }
    }
    if(!customAngle) RD.pool[c3].playerAngle = until;
  };

  window.a37 = function() {
    if (RF.list[0] === undefined) {
      return;
    }

    if(customAngle) {
      RF.list[0].send(a59("mouse-move", {
        mouseX: j16[0],
        mouseY: j16[1],
        mouseAngle: angle
      }));

      RD.pool[c3].playerAngle = angle;
    } else if (!_.isEqual(j16, j15)) {
      RF.list[0].send(a59("mouse-move", {
        mouseX: j16[0],
        mouseY: j16[1],
        mouseAngle: j16[2]
      }));
      j16 = j15;
    }
  };

  let int;

  addShortcut('Shift', 'keydown', () => {
    clearInterval(int);

    if(!enabled.getValue() || chatting) return;

    const me = RD.pool[c3];

    customAngle = true;

    int = setInterval(() => {
      const { player, distance } = getClosestPlayerData({
        x: me.x + (j9[0] - innerWidth / 2),
        y: me.y + (j9[1] - innerHeight / 2)
      });

      if(!player) return;

      const factor = predictionFactor.getValue();

      const dOverF = (distance / factor);

      angle = Math.angle(me, {
        x: player.x + player.spdX * dOverF - me.spdX,
        y: player.y + player.spdY * dOverF - me.spdX
      }) * Math.RADS2DEGS;

      if(angle < 0) angle += 360;
    });
  });

  addShortcut('Shift', 'keyup', () => {
    clearInterval(int);

    customAngle = false;
  });
});
}

window.addEventListener('load', loaded);
