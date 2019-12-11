# Test the MHZ14A Sensor library

from sensors.mhz14a import mhz14a
import time

co2 = mhz14a('/dev/serial0')

while True:
    co2.printPPM()

    res = co2.readPPM()
    print("CO2 PPM {0}".format(res))

    time.sleep(30)

