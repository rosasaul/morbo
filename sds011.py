import serial, time

class sensors:
    class sds011:
        sleeping = True
        wake_time = 30 # Minimum per spec, though likely need more
        cmd_sleep = bytearray([0xAA,0xB4,0x06,0x01,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0xFF,0xFF,0x05,0xAB])
        cmd_wake = bytearray([0xAA,0xB4,0x06,0x01,0x01,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0xFF,0xFF,0x06,0xAB])

        def __init__(self, tty):
            self.tty = tty # If using USB dongle typically /dev/ttyUSB0
            self.ser = serial.Serial(tty, baudrate=9600, stopbits=1, parity="N", timeout=2)

        def goToSleep:
            self.ser.write(cmd_sleep)
            sleeping = True

        def wakeUp:
            self.ser.write(cmd_wake)
            time.sleep(self.wake_time)
            sleeping = False

        def readPM:
            if sleeping:
                self.wakeUp()
            data = self.ser.read(9)
            pmtwofive = ((data[3] * 256) + data[2]) / 10
            pmten = ((data[5] * 256) + data[4]) / 10
            return {"PM2.5": pmtwofive, "PM10", pmten}

        def printPM:
            results = self.readPM()
            print("PM2.5 {0} PM10 {1}".format(results["PM2.5"], results["PM10"]))

