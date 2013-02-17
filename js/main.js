// Generated by CoffeeScript 1.4.0
(function() {

  Math.TAO = Math.PI * 2;

  $(document).ready(function() {
    var robot, robotView;
    robot = new Robot({
      position: {
        x: 20,
        y: 40
      }
    });
    console.log(robot);
    robotView = new RobotView({
      model: robot
    });
    return $('.arena').append(robotView.render().el);
  });

}).call(this);