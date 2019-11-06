Blockly.JavaScript['takeoff'] = function(block) {
  var altitude = Blockly.JavaScript.valueToCode(block, 'altitude', Blockly.JavaScript.ORDER_NONE);

  if(isNaN(parseInt(altitude))) {
    return 'mission+="takeoff," + eval(' + altitude + ') + "|";';
  } else {
    return 'mission+="takeoff,' + altitude + '|";';
  }
};

Blockly.JavaScript['flight_path'] = function(block) {
  var path = block.getFieldValue("path");
  return 'mission+="flight_path,' + path + '|";';
};

Blockly.JavaScript['heading_mode'] = function(block) {
  var mode = block.getFieldValue("mode");
  return 'mission+="heading_mode,' + mode + '|";';
};

Blockly.JavaScript['land'] = function(block) {
  return 'mission+="land";';
};

Blockly.JavaScript['land_home'] = function(block) {
  return 'mission+="land_home";';
};

Blockly.JavaScript['hover'] = function(block) {
  var duration = Blockly.JavaScript.valueToCode(block, 'duration', Blockly.JavaScript.ORDER_NONE);

  if(isNaN(parseInt(duration))) {
    return 'mission+="hover," + eval(' + duration + ') + "|";';
  } else {
    return 'mission+="hover,' + duration + '|";';
  }
};

Blockly.JavaScript['yaw_right'] = function(block) {
  var angle = Blockly.JavaScript.valueToCode(block, 'angle', Blockly.JavaScript.ORDER_NONE);
  var velocity = block.getFieldValue("velocity");

  if(isNaN(parseInt(angle))) {
    return 'mission+="yaw_right," + eval(' + angle + ') + ",' + velocity + '|";';
  } else {
    return 'mission+="yaw_right,' + angle + ',' + velocity + '|";';
  }
};

Blockly.JavaScript['yaw_left'] = function(block) {
  var angle = Blockly.JavaScript.valueToCode(block, 'angle', Blockly.JavaScript.ORDER_NONE);
  var velocity = block.getFieldValue("velocity");

  if(isNaN(parseInt(angle))) {
    return 'mission+="yaw_left," + eval(' + angle + ') + ",' + velocity + '|";';
  } else {
    return 'mission+="yaw_left,' + angle + ',' + velocity + '|";';
  }
};

Blockly.JavaScript['photo'] = function(block) {
  return 'mission+="photo|";';
};

Blockly.JavaScript['photo_interval'] = function(block) {
  var photo_count = block.getFieldValue("photo_count");
  var interval = block.getFieldValue("interval");
  return 'mission+="photo_interval,' + photo_count + ',' + interval + '|";';
};

Blockly.JavaScript['pitch_gimbal_to'] = function(block) {
  var angle = Blockly.JavaScript.valueToCode(block, 'angle', Blockly.JavaScript.ORDER_NONE);

  if(isNaN(parseInt(angle))) {
    return 'mission+="pitch_gimbal," + eval(' + angle + ') + "|";';
  } else {
    return 'mission+="pitch_gimbal,' + angle + '|";';
  }
};

Blockly.JavaScript['fly_forward'] = function(block) {
  var distance = Blockly.JavaScript.valueToCode(block, 'distance', Blockly.JavaScript.ORDER_NONE);
  var speed = block.getFieldValue("speed");

  if(isNaN(parseInt(distance))) {
    return 'mission+="::fly_forward," + eval(' + distance + ') + ",' + speed + '|";';
  } else {
    return 'mission+="::fly_forward,' + distance + ',' + speed + '|";';
  }
};

Blockly.JavaScript['video'] = function(block) {
  var action = block.getFieldValue("video_status");
  return 'mission+="video,' + action + '|";';
};

Blockly.JavaScript['video_duration'] = function(block) {
  var duration = block.getFieldValue("duration");
  return 'mission+="video_duration,' + duration + '|";';
};

Blockly.JavaScript['orbit'] = function(block) {
  var radius = Blockly.JavaScript.valueToCode(block, 'radius', Blockly.JavaScript.ORDER_NONE);
  var velocity = block.getFieldValue("velocity");

  if(isNaN(parseInt(radius))) {
    return 'mission+="orbit," + eval(' + radius + ') + ",' + velocity + '|";';
  } else {
    return 'mission+="orbit,' + radius + ',' + velocity + '|";';
  }
};

/*
Blockly.JavaScript['orbit'] = function(block) {
  var radius = block.getFieldValue('radius');
  var altitude = block.getFieldValue('altitude');
  var direction = block.getFieldValue('direction');
  var heading = block.getFieldValue('heading');
  var rotation = block.getFieldValue('rotation');
  return "orbit," + radius + "," + altitude + "," + direction + "," + heading + "," + rotation + "|";
};
*/

Blockly.JavaScript['loop'] = function(block) {
  var loopVar = Blockly.JavaScript.variableDB_.getDistinctName('count', Blockly.Variables.NAME_TYPE);
  var repeats = Blockly.JavaScript.valueToCode(block, 'TIMES', Blockly.JavaScript.ORDER_NONE);  
  var branch = Blockly.JavaScript.statementToCode(block, 'DO').trim();
  var code = "for(var " + loopVar + " = 0; " + loopVar + " < " + repeats + "; " + loopVar + "++){" + branch + "}";
  return code;  
};

Blockly.JavaScript['change_altitude'] = function(block) {
  var altitude = Blockly.JavaScript.valueToCode(block, 'altitude', Blockly.JavaScript.ORDER_NONE);

  if(isNaN(parseInt(altitude))) {
    return 'mission+="::change_altitude," + eval(' + altitude + ') + "|";';
  } else {
    return 'mission+="::change_altitude,' + altitude + '|";';
  }
};
