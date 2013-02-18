// Generated by CoffeeScript 1.4.0
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Math.TAO = Math.PI * 2;

  window.Game = (function(_super) {

    __extends(Game, _super);

    function Game() {
      return Game.__super__.constructor.apply(this, arguments);
    }

    Game.prototype.initialize = function() {
      $(document).ready(function() {});
      return window.silo = new MissileCollection({});
    };

    Game.prototype.addRobot = function(options) {
      var cmdv, r, rView;
      r = new Robot(options);
      rView = new RobotView({
        model: r
      });
      cmdv = new RobotCommandView({
        model: r
      });
      r.start();
      cmdv.render();
      return $('.arena').append(rView.render().el);
    };

    return Game;

  })(Backbone.Model);

  $(document).ready(function() {
    window.game = new Game();
    $('.addRobot').click(game.addRobot);
    return game.addRobot({
      name: "somebot"
    });
  });

}).call(this);
