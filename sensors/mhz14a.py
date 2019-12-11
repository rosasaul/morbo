# MH-Z14A Sensor Library
# Datasheet https://www.openhacks.com/uploadsproductos/mh-z14_co2.pdf

import serial

class mhz14a:
    request_packet = bytearray([0xFF,0x01,0x86,0x00,0x00,0x00,0x00,0x00,0x79])

    def __init__(self, tty):
        self.tty = tty
        self.ser = serial.Serial(tty, baudrate=9600, timeout=1)

    def readPPM(self):
        self.ser.write(mhz14a.request_packet)
        data = self.ser.read(9)
        ppm = (256 * data[2]) + data[3]
        return ppm

    def printPPM(self):
        ppm = self.readPPM()
        print("CO2 PPM {0}".format(ppm))

