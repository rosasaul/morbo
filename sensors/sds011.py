# SDS011 Nova PM Sensor Library
# Sensor Details https://aqicn.org/sensor/sds011/
# Datasheet https://cdn-reichelt.de/documents/datenblatt/X200/SDS011-DATASHEET.pdf

import serial, time

class sds011:
    wake_time = 60 # Minimum spec is 30sec, but that didn't work, fan needed 10 sec to spin up, 30sec to stabalize, plus buffer
    cmd_sleep = bytearray([0xAA,0xB4,0x06,0x01,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0xFF,0xFF,0x05,0xAB])
    cmd_wake = bytearray([0xAA,0xB4,0x06,0x01,0x01,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0xFF,0xFF,0x06,0xAB])

    def __init__(self, tty):
        self.tty = tty # If using USB dongle typically /dev/ttyUSB0
        self.ser = serial.Serial(tty, baudrate=9600, stopbits=1, parity="N", timeout=2)
        self.sleeping = True

    def goToSleep(self):
        self.ser.write(sds011.cmd_sleep)
        self.sleeping = True

    def wakeUp(self):
        self.ser.write(sds011.cmd_wake)
        time.sleep(sds011.wake_time)
        self.sleeping = False

    def readPM(self):
        if self.sleeping:
            self.wakeUp()
        data = self.ser.read(9)
        pmtwofive = ((data[3] * 256) + data[2]) / 10
        pmten = ((data[5] * 256) + data[4]) / 10
        return {"PM2.5": pmtwofive, "PM10": pmten}

    def printPM(self):
        results = self.readPM()
        print("PM2.5 {0} PM10 {1}".format(results["PM2.5"], results["PM10"]))

