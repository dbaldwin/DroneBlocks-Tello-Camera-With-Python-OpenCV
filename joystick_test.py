import pygame, sys
from pygame.locals import *


pygame.init()
joy = pygame.joystick.Joystick(0)
joy.init()

print(joy.get_name())
numaxes = joy.get_numaxes()
print("numaxes: " + str(numaxes))
print("numbuttons: " + str(joy.get_numbuttons()))

axis = []
for i in range(numaxes):
    axis.append(joy.get_axis(i))




while True:

    yaw = joy.get_axis(0)
    throttle = joy.get_axis(1)
    pitch = joy.get_axis(2)
    roll = joy.get_axis(3)

    print(up)
    
    for event in pygame.event.get():

        if event.type == KEYDOWN:
            if event.key == K_ESCAPE:
                pygame.quit()
                sys.exit()

    
    

