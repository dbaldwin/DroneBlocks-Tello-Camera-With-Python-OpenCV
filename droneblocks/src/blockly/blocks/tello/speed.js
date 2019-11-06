Blockly.Blocks['set_speed'] = {
  init: function() {
    this.jsonInit(
      {
        "message0": "set speed to %1 %2",
        "args0": [
          {
            "type": "input_value",
            "name": "speed"
          },
          {
            "type": "field_dropdown",
            "name": "units",
            "options":
              [["in/s", "in/s"],
               ["cm/s", "cm/s"]]
          }
        ],
        "previousStatement": true,
        "nextStatement": true,
        "colour": "#2A9D8F"
      });
  }
};