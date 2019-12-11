# Morbo

Set of high quality air sensors, display and control

## Hardware

* [Raspberry Pi Zero W](https://www.raspberrypi.org/products/raspberry-pi-zero-w/)
* [SDS011 Nova PM Sensor](https://aqicn.org/sensor/sds011/)
* [MQ-X Gas Sensors](https://tutorials-raspberrypi.com/configure-and-read-out-the-raspberry-pi-gas-sensor-mq-x/)
* [MH-Z14A CO2 Sensor](https://www.winsen-sensor.com/d/files/infrared-gas-sensor/mh-z14a_co2-manual-v1_01.pdf)
* [DHT22 Temperature and Humidity Sensor](https://www.adafruit.com/product/385)

## Usage

To test the SDS011 Nova PM Sensor run this (assuming you are using the USB to UART connector on /dev/ttyUSB0)
```
sudo python3 airquality.py
```

To test the MH-Z14A CO2 Sensor run this
```
sudo python3 co2.py
```
