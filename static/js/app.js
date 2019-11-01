$(document).ready(function() {
    $("#connect").click(function() {
        post("/send_command", JSON.stringify({"command": "command"}));
    });

    $("#streamon").click(function() {
        post("/send_command", JSON.stringify({"command": "streamon"}));
    });

    $("#streamoff").click(function() {
        post("/send_command", JSON.stringify({"command": "streamoff"}));
    });

    $("#takeoff").click(function() {
        post("/send_command", JSON.stringify({"command": "takeoff"}));
    });

    $("#fly_up").click(function() {
        post("/send_command", JSON.stringify({"command": "up 20"}));
    });

    $("#yaw_left").click(function() {
        post("/send_command", JSON.stringify({"command": "ccw 90"}));
    });

    $("#yaw_right").click(function() {
        post("/send_command", JSON.stringify({"command": "cw 90"}));
    });

    $("#fly_down").click(function() {
        post("/send_command", JSON.stringify({"command": "down 20"}));
    });

    $("#fly_forward").click(function() {
        post("/send_command", JSON.stringify({"command": "forward 20"}));
    });

    $("#fly_left").click(function() {
        post("/send_command", JSON.stringify({"command": "left 20"}));
    });

    $("#fly_right").click(function() {
        post("/send_command", JSON.stringify({"command": "right 20"}));
    });

    $("#fly_backward").click(function() {
        post("/send_command", JSON.stringify({"command": "back 20"}));
    });

    $("#flip_foward").click(function() {
        post("/send_command", JSON.stringify({"command": "flip l"}));
    });

    $("#flip_backward").click(function() {
        post("/send_command", JSON.stringify({"command": "flip b"}));
    });

    $("#flip_left").click(function() {
        post("/send_command", JSON.stringify({"command": "flip l"}));
    });

    $("#flip_right").click(function() {
        post("/send_command", JSON.stringify({"command": "flip r"}));
    });

    $("#land").click(function() {
        post("/send_command", JSON.stringify({"command": "land"}));
    });

    $("#take_photo").click(function() {
        $.get("/take_photo", function(data){});
    });
});

function post(url, command) {
    $.ajax({
        url: url,
        data: command,
        type: 'POST',
        contentType: 'application/json'
    }).done(function(data){
        console.log("done");
    });
}
