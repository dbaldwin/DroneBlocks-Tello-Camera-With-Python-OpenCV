Blockly.Blocks['hover'] = {
  init: function() {
    this.jsonInit(
      {
        "message0": "hover %1 seconds",
        "args0": [
          {
            "type": "input_value",
            "name": "duration"
          }
        ],
        "previousStatement": true,
        "nextStatement": true,
        "colour": "#2A9D8F"
      });
  }
};