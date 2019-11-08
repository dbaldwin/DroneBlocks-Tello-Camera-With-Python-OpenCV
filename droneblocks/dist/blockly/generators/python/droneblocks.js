Blockly.Python['takeoff'] = function(block) {
  var altitude = Blockly.Python.valueToCode(block, 'altitude', Blockly.JavaScript.ORDER_NONE);
  return 'takeoff(' + altitude + ');\n';
};

Blockly.Python['flight_path'] = function(block) {
  var path = block.getFieldValue("path");
  return 'flight_path("' + path + '");\n';
};

Blockly.Python['land'] = function(block) {
  return 'land();\n';
};

Blockly.Python['land_home'] = function(block) {
  return 'landHome();\n';
};

Blockly.Python['hover'] = function(block) {
  var duration = Blockly.Python.valueToCode(block, 'duration', Blockly.JavaScript.ORDER_NONE);
  return 'hover(' + duration + ');\n';
};

Blockly.Python['yaw_right'] = function(block) {
  var angle = Blockly.Python.valueToCode(block, 'angle', Blockly.JavaScript.ORDER_NONE);
  var velocity = block.getFieldValue("velocity");
  return 'yawRight(' + angle + ', ' + velocity + ');\n';
};

Blockly.Python['yaw_left'] = function(block) {
  var angle = Blockly.Python.valueToCode(block, 'angle', Blockly.JavaScript.ORDER_NONE);
  var velocity = block.getFieldValue("velocity");
  return 'yawLeft(' + angle + ', ' + velocity + ');\n';
};

Blockly.Python['orbit'] = function(block) {
  var radius = Blockly.Python.valueToCode(block, 'radius', Blockly.JavaScript.ORDER_NONE);
  var velocity = block.getFieldValue("velocity");
  return 'orbit(' + radius + ', ' + velocity + ');\n';
};

Blockly.Python['photo'] = function(block) {
  return 'takePhoto();\n';
};

Blockly.Python['photo_interval'] = function(block) {
  var photo_count = block.getFieldValue("photo_count");
  var interval = block.getFieldValue("interval");
  return 'takePhoto(' + photo_count + ', ' + interval + ');\n';
};

Blockly.Python['pitch_gimbal_to'] = function(block) {
  var angle = Blockly.Python.valueToCode(block, 'angle', Blockly.JavaScript.ORDER_NONE);
  return 'pitchGimbal(' + angle + ');\n';
};

Blockly.Python['fly_forward'] = function(block) {
  var distance = Blockly.Python.valueToCode(block, 'distance', Blockly.JavaScript.ORDER_NONE);
  var speed = block.getFieldValue("speed");
  return 'flyForward(' + distance + ', ' + speed + ');\n';
};

Blockly.Python['video'] = function(block) {
  var action = block.getFieldValue("video_status");
  return "video('" + action + "');\n";
};

Blockly.Python['video_duration'] = function(block) {
  var duration = block.getFieldValue("duration");
  return "video('start', " + duration + ");\n";
};

Blockly.Python['change_altitude'] = function(block) {
  var altitude = Blockly.Python.valueToCode(block, 'altitude', Blockly.JavaScript.ORDER_NONE);
  return 'change_altitude(' + altitude + ');\n';
};

Blockly.Python['loop'] = function(block) {
  var loopVar = Blockly.Python.variableDB_.getDistinctName('count', Blockly.Variables.NAME_TYPE);
  var repeats = Blockly.Python.valueToCode(block, 'TIMES', Blockly.JavaScript.ORDER_NONE);
  var branch = Blockly.Python.statementToCode(block, 'DO').trim();
  var code = "\nfor (var " + loopVar + " = 0; " + loopVar + " < " + repeats + "; " + loopVar + "++) {\n";
  code += '  ' + branch + '\n';
  code += "}\n\n";
  return code;
};

Blockly.Python['controls_if'] = function(block) {
  // If/elseif/else condition.
  var n = 0;
  var code = '', branchCode, conditionCode;
  do {
    conditionCode = Blockly.Python.valueToCode(block, 'IF' + n,
      Blockly.Python.ORDER_NONE) || 'false';
      branchCode = Blockly.Python.statementToCode(block, 'DO' + n) || '';
    code += (n == 0 ? 'if (' : '} else if (' ) + conditionCode + ') {\n' + branchCode;

    ++n;
  } while (block.getInput('IF' + n));

  if (block.getInput('ELSE')) {
    branchCode = Blockly.Python.statementToCode(block, 'ELSE') ||
        Blockly.Python.PASS;
    code += '} else {\n' + branchCode + '}\n';
  }
  return code + '}';
};

Blockly.Python['variables_set'] = function(block) {
  // Variable setter.
  var argument0 = Blockly.Python.valueToCode(block, 'VALUE',
      Blockly.Python.ORDER_NONE) || '0';
  var varName = Blockly.Python.variableDB_.getName(block.getFieldValue('VAR'),
      Blockly.Variables.NAME_TYPE);
  return varName + ' = ' + argument0 + ';\n';
};
