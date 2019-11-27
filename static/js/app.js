$(document).ready(function() {

    var is_recording = false;
    var distance_units = "in";

    // Connect to Tello after wifi connection is established
    $("#connect").click(function() {
        $.getJSON("/connect", {}, function(response) {
            if (response.is_connected == true) {
                // This will light up all the buttons
                $('button').prop('disabled', function(i, v) { return !v; });
            }
        });
        
    });

    // Start the video stream
    $("#streamon").click(function() {
        post("/send_command", JSON.stringify({"command": "streamon"}));
        $("#video").attr("src", "/video_stream");
    });

    // Stop the video stream
    $("#streamoff").click(function() {
        post("/send_command", JSON.stringify({"command": "streamoff"}));
        $("#video").attr("src", "/static/img/blank_video.png");
    });

    // Takeoff
    $("#takeoff").click(function() {
        post("/send_command", JSON.stringify({"command": "takeoff"}));
    });

    // Fly up
    $("#fly_up").click(function() {
        var distance = getDistanceBasedOnUnits(distance_units);
        post("/send_command", JSON.stringify({"command": "up " + distance}));
    });

    // Yaw left
    $("#yaw_left").click(function() {
        post("/send_command", JSON.stringify({"command": "ccw " + $("#yaw_slider").val()}));
    });

    // Yaw right
    $("#yaw_right").click(function() {
        post("/send_command", JSON.stringify({"command": "cw " + $("#yaw_slider").val()}));
    });

    // Fly down
    $("#fly_down").click(function() {
        var distance = getDistanceBasedOnUnits(distance_units);
        post("/send_command", JSON.stringify({"command": "down " + distance}));
    });

    // Fly forward
    $("#fly_forward").click(function() {
        var distance = getDistanceBasedOnUnits(distance_units);
        post("/send_command", JSON.stringify({"command": "forward " + distance}));
    });

    // Fly left
    $("#fly_left").click(function() {
        var distance = getDistanceBasedOnUnits(distance_units);
        post("/send_command", JSON.stringify({"command": "left " + distance}));
    });

    // Fly right
    $("#fly_right").click(function() {
        var distance = getDistanceBasedOnUnits(distance_units);
        post("/send_command", JSON.stringify({"command": "right " + distance}));
    });

    // Fly backward
    $("#fly_backward").click(function() {
        var distance = getDistanceBasedOnUnits(distance_units);
        post("/send_command", JSON.stringify({"command": "back " + distance}));
    });

    // Forward flip
    $("#flip_forward").click(function() {
        post("/send_command", JSON.stringify({"command": "flip f"}));
    });

    // Back flip
    $("#flip_backward").click(function() {
        post("/send_command", JSON.stringify({"command": "flip b"}));
    });

    // Left flip
    $("#flip_left").click(function() {
        post("/send_command", JSON.stringify({"command": "flip l"}));
    });

    // Right flip
    $("#flip_right").click(function() {
        post("/send_command", JSON.stringify({"command": "flip r"}));
    });

    // Land
    $("#land").click(function() {
        post("/send_command", JSON.stringify({"command": "land"}));
    });

    // Take a photo
    $("#take_photo").click(function() {
        $.get("/take_photo", function(data){});
    });

    // Start or stop recording video
    $("#record_video").click(function() {

        if (!is_recording) {
            $.get("/start_recording", function(data){});
            $("#record_video").html("Stop Recording");
        } else {
            $.get("/stop_recording", function(data){});
            $("#record_video").html("Start Recording");
        }

        is_recording = !is_recording;
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


    // Listen for yaw and distance changes on range inputs
    $(document).on('input', '#yaw_slider', function() {
        $("#yaw_angle").text($(this).val());
    });

    $(document).on('input', '#distance_slider', function() {
        $("#distance").text($(this).val());
    });

    // Check for changes to units
    $("input[type=radio]").click(function() {
        distance_units = $(this).data('value');
        $("#display_units").text(distance_units);

        if (distance_units == "cm") {
            $("#droneblocks_iframe").attr('src', '/droneblocks/tello_metric.html');
        } else {
            $("#droneblocks_iframe").attr('src', '/droneblocks/tello.html');
        }
    });

});

// Called when a control command is being issued
function post(url, command) {
    $.ajax({
        url: url,
        data: command,
        type: 'POST',
        contentType: 'application/json'
    }).done(function(data){
        //
    });
}

// Cover distance based on units (in/cm)
function getDistanceBasedOnUnits(units) {

    var distance = $("#distance").html();

    if (units == "in") {

        // Convert distance to cm value to be sent (since that's what the SDK expects)
        distance = distance * 2.54;

    }

    return distance;

}