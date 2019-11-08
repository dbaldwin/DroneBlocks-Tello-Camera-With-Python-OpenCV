Blockly.Blocks['fly_forward'] = {
  init: function() {
    this.jsonInit(
      {
        "message0": "fly forward %1 %2",
        "args0": [
          {
            "type": "input_value",
            "name": "distance"
          },
          {
            "type": "field_dropdown",
            "name": "units",
            "options":
              [["in", "in"],
               ["cm", "cm"]]
          }
        ],
        "previousStatement": true,
        "nextStatement": true,
        "colour": "#2A9D8F"
      });
  }
};