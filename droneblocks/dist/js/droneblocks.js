var isCodeViewOpen = false;

// Called from the map preview iframe
function getMapPreviewCode() {
  var code = 'var mission="";'
  code += Blockly.JavaScript.workspaceToCode(workspace);
  code = eval(code);
  return code;
}

var blockIndex = 0;

function highlightBlock(id) {
  var id = parseInt(id); // This is the index of the waypoint block we're highlighting
  var blocks = Blockly.mainWorkspace.getAllBlocks();
  
  // Now let's loop until we find the next waypoint
  for(var i=blockIndex; i<=blocks.length; i++) {
    var type = blocks[i].type;
    
    blockIndex++;
    
    if(type == "takeoff" || type == "fly_forward" || type == "change_altitude" || type == "land") {
      blocks[i].select();
      
      if(type == "land") {
        blockIndex = 0; // Reset the block index
      }
      
      break;
    }
  }
}

function highlightBlockFromAndroid(id) {
  var id = parseInt(id);
  var blocks = Blockly.mainWorkspace.getAllBlocks();
  blocks[id].select();
}