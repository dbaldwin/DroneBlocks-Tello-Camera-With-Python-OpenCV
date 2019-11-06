import * as firebase from './firebase';

let workspace, onresize;

const getUrlParam = (param) => {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
      sURLVariables = sPageURL.split('&'),
      sParameterName,
      i;
  
    for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');
  
      if (sParameterName[0] === param) {
        return sParameterName[1] === undefined ? true : sParameterName[1];
      }
    }
}
  

const init = () => {
    const blocklyArea = document.getElementById('blocklyArea');
    const blocklyDiv = document.getElementById('blocklyDiv');
    workspace = Blockly.inject(blocklyDiv,
        {media: 'blockly/media/',
         toolbox: document.getElementById('toolbox'),
          zoom:{controls: true,
              startScale: 1.0,
              maxScale: 3,
              minScale: 0.3,
            scaleSpeed: 1.2}});

    onresize = (e) => {
        var element = blocklyArea;
        var x = 0;
        var y = 0;
        do {
          x += element.offsetLeft;
          y += element.offsetTop;
          element = element.offsetParent;
        } while (element);
        // Position blocklyDiv over blocklyArea.
        blocklyDiv.style.left = x + 'px';
        blocklyDiv.style.top = y + 'px';
        blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
        blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';
        Blockly.svgResize(workspace); // Added to resize when code view is clicked
    };
    window.addEventListener('resize', onresize, false);

    onresize();

    workspace.addChangeListener(() => {
        const xml = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace));

        if(xml !== '<xml xmlns="http://www.w3.org/1999/xhtml"></xml>'){
            localStorage.setItem('backup', xml);
        }
  
        if(document.getElementById("code")) {
            document.getElementById("code").innerHTML = PR.prettyPrintOne(Blockly.Python.workspaceToCode(workspace));
        }
    })

    if(getUrlParam("share") != null || getUrlParam("view") != null) {
  
        // This is local and not a global
        const id = getUrlParam("missionId");
        const uid = getUrlParam("uid");

        if(id && uid){
            firebase.db.collection('users').doc(uid).get().then((user) => {
                if(user){
                    firebase.db.collection('missions').doc(id).get().then((mission) => {
                        const {missionXML, title} = mission.data();

                        Blockly.getMainWorkspace().clear();
                        Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(missionXML), workspace);


                        $("#missionTitle").text(title);
                        $('#saveMission').hide();
                        $('#d1').hide();
                    })
                }
            })
        }
    }
}

export {
    init,
    workspace,
    onresize
};