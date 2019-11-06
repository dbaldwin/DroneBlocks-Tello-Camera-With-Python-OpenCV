Blockly.Python['takeoff'] = function(block) {
  return 'takeoff();\n';
};

Blockly.Python['set_speed'] = function(block) {
  var distance = Blockly.Python.valueToCode(block, 'speed', Blockly.JavaScript.ORDER_NONE);
  var units = block.getFieldValue("units");
  return 'setSpeed(' + distance + ', "' + units + '");\n';
};

Blockly.Python['fly_forward'] = function(block) {
  var time = Blockly.Python.valueToCode(block, 'time', Blockly.JavaScript.ORDER_NONE);
  return 'fly("forward", ' + time + ');\n';
};

Blockly.Python['fly_backward'] = function(block) {
  var time = Blockly.Python.valueToCode(block, 'time', Blockly.JavaScript.ORDER_NONE);
  return 'fly("backward", ' + time + ');\n';
};

Blockly.Python['fly_left'] = function(block) {
  var time = Blockly.Python.valueToCode(block, 'time', Blockly.JavaScript.ORDER_NONE);
  return 'fly("left", ' + time + ');\n';
};

Blockly.Python['fly_right'] = function(block) {
  var time = Blockly.Python.valueToCode(block, 'time', Blockly.JavaScript.ORDER_NONE);
  return 'fly("right", ' + time + ');\n';
};

Blockly.Python['fly_up'] = function(block) {
  var time = Blockly.Python.valueToCode(block, 'time', Blockly.JavaScript.ORDER_NONE);
  return 'fly("up", ' + time + ');\n';
};

Blockly.Python['fly_down'] = function(block) {
  var time = Blockly.Python.valueToCode(block, 'time', Blockly.JavaScript.ORDER_NONE);
  return 'fly("down", ' + time + ');\n';
};

Blockly.Python['yaw_right'] = function(block) {
  var angle = Blockly.Python.valueToCode(block, 'angle', Blockly.JavaScript.ORDER_NONE);
  return 'yaw("right", ' + angle + ');\n';
};

Blockly.Python['yaw_left'] = function(block) {
  var angle = Blockly.Python.valueToCode(block, 'angle', Blockly.JavaScript.ORDER_NONE);
  return 'yaw("left", ' + angle + ');\n';
};

Blockly.Python['flip_forward'] = function(block) {
  return 'flip("forward");\n';
};

Blockly.Python['flip_backward'] = function(block) {
  return 'flip("backward");\n';
};

Blockly.Python['flip_left'] = function(block) {
  return 'flip("left");\n';
};

Blockly.Python['flip_right'] = function(block) {
  return 'flip("right");\n';
};


Blockly.Python['land'] = function(block) {
  return 'land();\n';
};

Blockly.Python['hover'] = function(block) {
  var duration = Blockly.Python.valueToCode(block, 'duration', Blockly.JavaScript.ORDER_NONE);
  return 'hover(' + duration + ');\n';
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
