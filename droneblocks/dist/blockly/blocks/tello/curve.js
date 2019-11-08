Blockly.Blocks['curve'] = {
  init: function() {
    this.jsonInit(
      {
        "message0": "curve x1 %1 y1 %2 z1 %3 x2 %4 y2 %5 z2 %6 %7",
        "args0": [
          {
            "type": "input_value",
            "name": "x1distance"
          },
          {
            "type": "input_value",
            "name": "y1distance"
          },
          {
            "type": "input_value",
            "name": "z1distance"
          },
          {
            "type": "input_value",
            "name": "x2distance"
          },
          {
            "type": "input_value",
            "name": "y2distance"
          },
          {
            "type": "input_value",
            "name": "z2distance"
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