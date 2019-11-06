Blockly.Blocks['video'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(new Blockly.FieldDropdown([["start", "start"], ["stop", "stop"]]), "video_status")
          .appendField("recording video");
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour('#64c2d9');
    }
};

