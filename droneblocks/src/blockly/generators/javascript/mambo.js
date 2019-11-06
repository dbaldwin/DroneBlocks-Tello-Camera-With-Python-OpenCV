Blockly.JavaScript['takeoff'] = function(block) {
  return 'mission+="takeoff";';
};

Blockly.JavaScript['set_speed'] = function(block) {
  var distance = Blockly.JavaScript.valueToCode(block, 'speed', Blockly.JavaScript.ORDER_NONE);
  var units = block.getFieldValue("units");

  if(isNaN(parseInt(distance))) {
    return 'mission+="|speed," + eval(' + distance + ') + ",' + units + '";';
  } else {
    return 'mission+="|speed,' + distance + ',' + units + '";';
  }
};

Blockly.JavaScript['fly_forward'] = function(block) {
  var time = Blockly.JavaScript.valueToCode(block, 'time', Blockly.JavaScript.ORDER_NONE);

  if(isNaN(parseInt(time))) {
    return 'mission+="|fly_forward," + eval(' + time + ');';
  } else {
    return 'mission+="|fly_forward,' + time + '";';
  }
};

Blockly.JavaScript['fly_backward'] = function(block) {
  var time = Blockly.JavaScript.valueToCode(block, 'time', Blockly.JavaScript.ORDER_NONE);

  if(isNaN(parseInt(time))) {
    return 'mission+="|fly_backward," + eval(' + time + ');';
  } else {
    return 'mission+="|fly_backward,' + time + '";';
  }
};

Blockly.JavaScript['fly_left'] = function(block) {
  var time = Blockly.JavaScript.valueToCode(block, 'time', Blockly.JavaScript.ORDER_NONE);

  if(isNaN(parseInt(time))) {
    return 'mission+="|fly_left," + eval(' + time + ');';
  } else {
    return 'mission+="|fly_left,' + time + '";';
  }
};

Blockly.JavaScript['fly_right'] = function(block) {
  var time = Blockly.JavaScript.valueToCode(block, 'time', Blockly.JavaScript.ORDER_NONE);

  if(isNaN(parseInt(time))) {
    return 'mission+="|fly_right," + eval(' + time + ');';
  } else {
    return 'mission+="|fly_right,' + time + '";';
  }
};

Blockly.JavaScript['fly_up'] = function(block) {
  var time = Blockly.JavaScript.valueToCode(block, 'time', Blockly.JavaScript.ORDER_NONE);

  if(isNaN(parseInt(time))) {
    return 'mission+="|fly_up," + eval(' + time + ');';
  } else {
    return 'mission+="|fly_up,' + time + '";';
  }
};

Blockly.JavaScript['fly_down'] = function(block) {
  var time = Blockly.JavaScript.valueToCode(block, 'time', Blockly.JavaScript.ORDER_NONE);

  if(isNaN(parseInt(time))) {
    return 'mission+="|fly_down," + eval(' + time + ');';
  } else {
    return 'mission+="|fly_down,' + time + '";';
  }
};

Blockly.JavaScript['hover'] = function(block) {
  var duration = Blockly.JavaScript.valueToCode(block, 'duration', Blockly.JavaScript.ORDER_NONE);

  if(isNaN(parseInt(duration))) {
    return 'mission+="|hover," + eval(' + duration + ') + "";';
  } else {
    return 'mission+="|hover,' + duration + '";';
  }
};

Blockly.JavaScript['yaw_right'] = function(block) {
  var angle = Blockly.JavaScript.valueToCode(block, 'angle', Blockly.JavaScript.ORDER_NONE);

  if(isNaN(parseInt(angle))) {
    return 'mission+="|yaw_right," + eval(' + angle + ') + "";';
  } else {
    return 'mission+="|yaw_right,' + angle + '";';
  }
};

Blockly.JavaScript['yaw_left'] = function(block) {
  var angle = Blockly.JavaScript.valueToCode(block, 'angle', Blockly.JavaScript.ORDER_NONE);

  if(isNaN(parseInt(angle))) {
    return 'mission+="|yaw_left," + eval(' + angle + ') + "";';
  } else {
    return 'mission+="|yaw_left,' + angle + '";';
  }
};

Blockly.JavaScript['flip_forward'] = function(block) {
  return 'mission+="|flip_forward";';
};

Blockly.JavaScript['flip_backward'] = function(block) {
  return 'mission+="|flip_backward";';
};

Blockly.JavaScript['flip_left'] = function(block) {
  return 'mission+="|flip_left";';
};

Blockly.JavaScript['flip_right'] = function(block) {
  return 'mission+="|flip_right";';
};

Blockly.JavaScript['land'] = function(block) {
  return 'mission+="|land";';
};

Blockly.JavaScript['loop'] = function(block) {
  var loopVar = Blockly.JavaScript.variableDB_.getDistinctName('count', Blockly.Variables.NAME_TYPE);
  var repeats = Blockly.JavaScript.valueToCode(block, 'TIMES', Blockly.JavaScript.ORDER_NONE);  
  var branch = Blockly.JavaScript.statementToCode(block, 'DO').trim();
  var code = "for(var " + loopVar + " = 0; " + loopVar + " < " + repeats + "; " + loopVar + "++){" + branch + "}";
  return code;  
};