Blockly.Blocks['fly_xyz'] = {
  init: function() {
    this.jsonInit(
      {
        "message0": "fly to x %1 y %2 z %3 %4",
        "args0": [
          {
            "type": "input_value",
            "name": "xdistance"
          },
          {
            "type": "input_value",
            "name": "ydistance"
          },
          {
            "type": "input_value",
            "name": "zdistance"
          },
          {
            "type": "field_dropdown",
            "name": "units",
            "options":
              [["in", "in"],
               ["cm", "cm"]]
          },
        ],
        "previousStatement": true,
        "nextStatement": true,
        "colour": "#2A9D8F"
      });
  }
};