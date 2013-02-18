// Generated by CoffeeScript 1.4.0
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.Robot = (function(_super) {
    var _this = this;

    __extends(Robot, _super);

    function Robot() {
      this.move = __bind(this.move, this);

      this.step = __bind(this.step, this);
      return Robot.__super__.constructor.apply(this, arguments);
    }

    Robot.prototype.defaults = {
      dir: 0,
      hp: 100,
      maxHP: 1,
      damage: function() {
        return console.log("ouch");
      },
      name: "robot",
      x: 0,
      y: 0,
      dx: 0,
      dy: 0,
      frequency: 1000 / 15,
      arena: {
        width: 600,
        height: 600
      },
      width: 40,
      height: 40
    };

    Robot.prototype.initialize = function() {
      this.missiles = [];
      this.set('script', ["move", "move", "move", "move", "left", "fire", "idle"]);
      return this.set('lineNum', 0);
    };

    Robot.prototype.maxX = function() {
      return this.attributes.arena.width - this.attributes.width;
    };

    Robot.prototype.minX = function() {
      return 0;
    };

    Robot.prototype.maxY = function() {
      return this.attributes.arena.height - this.attributes.height;
    };

    Robot.prototype.minY = function() {
      return 0;
    };

    Robot.prototype.deg = function() {
      return this.attributes.dir * 360 / Math.TAO;
    };

    Robot.prototype.noisy = false;

    Robot.prototype.die = function() {
      if (this.noisy) {
        console.log("" + this.attributes.name + " has died");
      }
      clearInterval(this.intervalID);
      return this.destroy();
    };

    Robot.prototype.start = function() {
      var _this = this;
      return this.intervalID = setInterval(function() {
        return _this.step();
      }, this.frequency);
    };

    Robot.prototype.step = function() {
      var command;
      command = this.attributes.script[this.attributes.lineNum];
      if (this[command]) {
        this[command]();
      }
      if (this.noisy) {
        console.log("from Step()", this.attributes);
      }
      return this.attributes.lineNum = (this.attributes.lineNum + 1) % this.attributes.script.length;
    };

    Robot.prototype.move = function() {
      var dx, dy, newx, newy;
      dx = Math.cos(this.get('dir'));
      dy = Math.sin(this.get('dir'));
      newx = this.attributes.x + dx;
      if (newx > this.maxX()) {
        newx = this.maxX();
      }
      if (newx < this.minX()) {
        newx = this.minX();
      }
      newy = this.attributes.y + dy;
      if (newy > this.maxY()) {
        newy = this.maxY();
      }
      if (newy < this.minY()) {
        newy = this.minY();
      }
      this.set('x', newx);
      this.set('y', newy);
      if (this.noisy) {
        return console.log("from Step()", this.attributes);
      }
    };

    Robot.prototype.left = function() {
      this.set('dir', (this.attributes.dir + 0.05) % Math.TAO);
      this.set('dx', Math.cos(this.get('dir')));
      return this.set('dy', Math.sin(this.get('dir')));
    };

    Robot.prototype.right = function() {
      this.set('dir', (Math.TAO + this.attributes.dir - 0.05) % Math.TAO);
      this.set('dx', Math.cos(this.get('dir')));
      return this.set('dy', Math.sin(this.get('dir')));
    };

    Robot.prototype.fire = function() {
      var missile, missileView;
      missile = new Missile({
        id: this.missile,
        x: this.get('x') + this.get('width') / 2,
        y: this.get('y') + this.get('height') / 2,
        dir: this.get('dir')
      });
      missileView = new MissileView({
        model: missile
      });
      return this.missiles.push({
        model: missile,
        view: missileView
      });
    };

    Robot.prototype.idle = function() {
      return this;
    };

    return Robot;

  }).call(this, Backbone.Model);

  window.RobotView = (function(_super) {

    __extends(RobotView, _super);

    function RobotView() {
      this.initialize = __bind(this.initialize, this);
      return RobotView.__super__.constructor.apply(this, arguments);
    }

    RobotView.prototype.className = 'robot';

    RobotView.prototype.initialize = function() {
      console.log(this.model);
      this.listenTo(this.model, 'change', this.render);
      return this.listenTo(this.model, 'destroy', this.remove);
    };

    RobotView.prototype.render = function() {
      this.$el.css("left", this.model.get('x'));
      this.$el.css("top", this.model.get('y'));
      this.$el.css("transform", "rotate(" + this.model.deg() + "deg)");
      this.$el.appendTo('.arena');
      return this;
    };

    return RobotView;

  })(Backbone.View);

  window.RobotCommandView = (function(_super) {

    __extends(RobotCommandView, _super);

    function RobotCommandView() {
      return RobotCommandView.__super__.constructor.apply(this, arguments);
    }

    RobotCommandView.prototype.className = 'commands';

    RobotCommandView.prototype.initialize = function() {
      this.listenTo(this.model, 'change:[script]', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
      $('.rightbar').append(this.$el);
      return this.render();
    };

    RobotCommandView.prototype.render = function() {
      var x, _i, _len, _ref;
      this.$el.html("<h3>" + (this.model.get('name')) + "'s control program</h3>");
      this.$el.append("<ol>");
      _ref = this.model.get('script');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        x = _ref[_i];
        this.$el.append("<li>" + x + "</li>");
      }
      this.$el.append("</ol>");
      return this;
    };

    return RobotCommandView;

  })(Backbone.View);

}).call(this);
