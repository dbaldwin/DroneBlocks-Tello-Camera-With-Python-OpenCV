Blockly.Blocks['fly_backward'] = {
  init: function() {
    this.jsonInit(
      {
        "message0": "fly backward %1 %2",
        "args0": [
          {
            "type": "input_value",
            "name": "distance"
          },
          {
            "type": "field_dropdown",
            "name": "units",
            "options":
              [["cm", "cm"],
              ["in", "in"]]
          }
        ],
        "previousStatement": true,
        "nextStatement": true,
        "colour": "#2A9D8F"
      });
  }
};