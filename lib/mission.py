from time import sleep

class Mission():

    def __init__(self, udp, camera):
        self.udp = udp
        self.camera = camera
        self.test_command_string = "takeoff|fly_forward,20,in|yaw_right,90|land"


    def parse_mission(self, mission_code):

        # Clear out any previous commands
        self.udp.clear_response()

        # Split the mission into a command list
        commands = mission_code.split("|")

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

                x = command.split(",")[1]
                y = command.split(",")[2]
                z = command.split(",")[3]
                units = command.split(",")[4]

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

                command_to_execute = direction + " " + distance

            elif "curve" in command:
                
                params = command.split(",")

                command_to_execute = "curve " + params[1] + " " + params[2] + " " + params[3] + " " + params[4] + " " + params[5] + " " + params[6] + " 100"

            elif "hover" in command:

                delay = command.split(",")[1]

                print("Delaying for ", delay, " seconds")
                sleep(int(delay))
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
                    print("stop")
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
                print("finished executing command: " + command_to_execute + " with response: " + response)
                # Delay 1 second before issuing the next command
                sleep(1)
            else:
                print("Here we could implement some retry logic or maybe even land. Response was " + response)


        print("Mission is complete")

    
    def execute_mission(self, mission_commands):
        return



        
        


