$(document).keydown(function(e) {
    switch(e.which) {
        case 37: // left
        post("/send_command", JSON.stringify({"command": "left 20"}));
        break;

        case 38: // up
        post("/send_command", JSON.stringify({"command": "forward 20"}));
        break;

        case 39: // right
        post("/send_command", JSON.stringify({"command": "right 20"}));
        break;

        case 40: // down
        post("/send_command", JSON.stringify({"command": "back 20"}));
        break;

        default: return;
    }
    e.preventDefault();
});