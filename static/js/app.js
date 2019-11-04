$(document).ready(function() {
    $("#connect").click(function() {
        $.getJSON("/connect", {}, function(response) {
            if (response.is_connected == true) {
                // This will light up all the buttons
                $('button').prop('disabled', function(i, v) { return !v; });
            }
        });
        
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

    // Populate Tello's state information
    setInterval(function() {
        $.getJSON("/status", {}, function(response) {
            if (response.battery != null) {
                $("#battery").text(response.battery + "%");
                $("#altitude").text(response.altitude + " cm");
                $("#tof").text(response.tof + " cm");
                $("#roll").text(response.roll + "°");
                $("#pitch").text(response.pitch + "°");
                $("#yaw").text(response.yaw + "°");
            }
        });
    }, 500);
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
