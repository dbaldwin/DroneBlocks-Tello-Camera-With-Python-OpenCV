$(document).keydown(function(e) {

    switch(e.which) {
        case 37: // left arrow for fly left
        post("/send_command", JSON.stringify({"command": "left 20"}));
        break;

        case 38: // up arrow for fly forward
        post("/send_command", JSON.stringify({"command": "forward 20"}));
        break;

        case 39: // right arrow for fly right
        post("/send_command", JSON.stringify({"command": "right 20"}));
        break;

        case 40: // down arrow for fly backward
        post("/send_command", JSON.stringify({"command": "back 20"}));
        break;

        case 87: // W key for fly up
        post("/send_command", JSON.stringify({"command": "up 20"}));
        break;

        case 65: // A key for yaw left
        post("/send_command", JSON.stringify({"command": "ccw " + $("#yaw_slider").val()}));
        break;

        case 83: // S key for fly down
        post("/send_command", JSON.stringify({"command": "down 20"}));
        break;

        case 68: // D key for yaw right
        post("/send_command", JSON.stringify({"command": "cw " + $("#yaw_slider").val()}));
        break;

        default: return;
    }
    e.preventDefault();
});