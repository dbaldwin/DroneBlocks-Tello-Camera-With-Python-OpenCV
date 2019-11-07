from time import sleep

class Mission():

    def __init__(self, udp, camera):
        self.udp = udp
        self.camera = camera
        self.test_command_string = "takeoff|fly_forward,20,in|yaw_right,90|land"


    def parse_mission(self, mission_code):
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


            elif "yaw_right" in command:
                print("yaw right")

            elif "yaw_left" in command:
                print("yaw left")

            elif "photo" in command:
                self.camera.take_photo()

            elif "video" in command:
                self.camera.take_photo()
                

            print(command_to_execute)


            

            
            # self.udp.send_command(command)

            # sleep(1)

            # response = self.udp.get_response()

            # print(response)
    
    def execute_mission(self, mission_commands):
        return



        
        


