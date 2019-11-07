function launchMission(mission_code) {
    post("/launch_mission", JSON.stringify({"mission_code": mission_code}));
}