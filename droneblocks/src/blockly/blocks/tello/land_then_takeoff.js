Blockly.Blocks['land_then_takeoff'] = {
    /**
     * Show block.
     * @this Blockly.Block
     */
    init: function() {
      this.jsonInit(
        {
          "message0": "land for %1 seconds then takeoff",
          "args0": [
            {
                "type": "input_value",
                "name": "duration"
            }
          ],
          "previousStatement": true,
          "nextStatement": true,
          "colour": "#264653"
        });
    }
  };