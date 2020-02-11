from time import sleep

class Mission():

    def __init__(self, udp, camera, drone):
        self.udp = udp
        self.camera = camera
        self.drone = drone
        self.test_command_string = "takeoff|fly_forward,20,in|yaw_right,90|land"
        self.current_command_index = 0
        self.is_mission_paused = False
        self.resumed_mission = ""# This will contain the commands to resume the mission


    def parse_mission(self, mission_code):

        # Clear out any previous commands
        self.udp.clear_response()

        # Reset the paused mission varables
        self.current_command_index = 0
        self.is_mission_paused = False
        self.resumed_mission = ""

        # Split the mission into a command list
        commands = mission_code.split("|")

        # Used so we can update pause/resume UI button
        self.drone.is_running_droneblocks_mission = True
        self.drone.is_paused = False

        # Remove any empty strings from the list. This can happen in cases where there is a mission without a takeoff block
        while ("" in commands):
            commands.remove("")

        print("Mission is: ", mission_code)
        print("Commands are: ", commands)

        for command in commands:

            command_to_execute = None
            
            if "takeoff" in command:

                command_to_execute = "takeoff"

            elif "speed" in command:

                speed = command.split(",")[1]
                units = command.split(",")[2]

                # Deal with units later
                command_to_execute = "speed " + speed

            elif "fly_xyz" in command:

                units = command.split(",")[4]
                x = self.convert_distance(command.split(",")[1], units)
                y = self.convert_distance(command.split(",")[2], units)
                z = self.convert_distance(command.split(",")[3], units)

                command_to_execute = "go " + x + " " + y + " " + z + " 100"

            elif "fly" in command:

                direction = ""
                distance = command.split(",")[1]
                units = command.split(",")[2]

                if "forward" in command:
                    direction = "forward"
                elif "backward" in command:
                    direction = "back"
                elif "left" in command:
                    direction = "left"
                elif "right" in command:
                    direction = "right"
                elif "up" in command:
                    direction = "up"
                elif "down" in command:
                    direction = "down"

                command_to_execute = direction + " " + self.convert_distance(distance, units)

            elif "curve" in command:
                
                params = command.split(",")
                units = params[7]
                x1 = self.convert_distance(params[1], units)
                y1 = self.convert_distance(params[2], units)
                z1 = self.convert_distance(params[3], units)
                x2 = self.convert_distance(params[4], units)
                y2 = self.convert_distance(params[5], units)
                z2 = self.convert_distance(params[6], units)

                command_to_execute = "curve " + x1 + " " + y1 + " " + z1 + " " + x2 + " " + y2 + " " + z2 + " 100"

            elif "hover" in command:

                delay = command.split(",")[1]

                print("Hovering for ", delay, " seconds")
                sleep(int(delay))
                print("Done hovering")
                command_to_execute = "command"

            elif "yaw_right" in command:
                
                angle = command.split(",")[1]
                command_to_execute = "cw " + angle

            elif "yaw_left" in command:
                
                angle = command.split(",")[1]
                command_to_execute = "ccw " + angle

            elif "photo" in command:

                self.camera.take_photo()
                command_to_execute = "command"

            elif "video" in command:
                
                action = command.split(",")[1]

                if action == "start":
                    self.camera.start_recording()
                elif action == "stop":
                    self.camera.stop_recording()

                command_to_execute = "command"
            
            elif "flip" in command:

                flip = "flip " 

                if "forward" in command:
                    flip = flip + " f"
                elif "backward" in command:
                    flip = flip + " b"
                elif "left" in command:
                    flip = flip + " l"
                elif "right" in command:
                    flip = flip + " r"

                command_to_execute = flip

            elif "land" in command:

                command_to_execute = "land"

            # Send the command
            self.udp.send_command(command_to_execute)

            # Get the response
            # This will block and wait for the response
            response = self.udp.get_response()

            if response == "ok":
                print("Finished executing command: " + command_to_execute + " with response: " + response)

                # Increment the command counter (used for pausing and resuming missions)
                self.current_command_index = self.current_command_index + 1

                # Delay 1 second before issuing the next command
                sleep(1)

                # If mission is paused let's break out of the command loop
                if self.is_mission_paused:

                    # Used to update the status so we can change the UI button to "Resume"
                    self.drone.is_paused = True
                    
                    # Store the resumed mission in the string format so we can resume later
                    self.resumed_mission = "|".join(commands[self.current_command_index:])
                    print("Mission is paused. We'll resume mission with: " + self.resumed_mission)
                    break

            else:
                print("Here we could implement some retry logic or maybe even land. Response was " + response)

        # Let's not trigger this code in cases where the mission is paused
        if self.is_mission_paused is False:
            print("Mission is complete!")
            self.drone.is_running_droneblocks_mission = False

    # Allow the user to pause the mission
    # The mission will complete the current command being executed and then pause
    def pause_mission(self):
        self.is_mission_paused = True

    # Pick up where we left off
    def resume_mission(self):
        self.parse_mission(self.resumed_mission)


    
    # Tello only flies in units of cm so we need to convert from in to cm
    def convert_distance(self, distance, units):

        if units == "in":
            distance = int(distance) * 2.54

        return str(distance)



        
        


