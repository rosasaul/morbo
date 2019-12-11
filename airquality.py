# Test the SDS011 Nova Sensor library

from sensors.sds011 import sds011
import time

dust = sds011('/dev/ttyUSB0')

while True:
    dust.printPM()

    res = dust.readPM()
    print("PM2.5 {0} PM10 {1}".format(res["PM2.5"], res["PM10"]))
    dust.goToSleep()

    time.sleep(120)

