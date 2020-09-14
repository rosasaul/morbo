# Morbo

Morbo is an in home set of high quality low cost air sensors. This is designed to help monitor indoor air quality, but could work outdoor in a limited setting.

## TODO

Some items I'm planning on but haven't gotten to

* Add on a Carbon Monoxide sensor and VOC sensor
* Touch display to show current readings without the need for Wifi
* Chargable battery so it can run without wall power for portability

## BOM

These are the components I used, they can be obtained from other sources so shop around

* ~$28 [Raspberry Pi Zero W](https://www.amazon.com/gp/product/B0748MPQT4/)
* ~$7 [Samsung 32G SD Card](https://www.amazon.com/gp/product/B06XWN9Q99)
* ~$30 [SDS011 Nova PM Sensor](https://www.amazon.com/gp/product/B07M9TP393)
* ~$30 [MH-Z14A CO2 Sensor](https://www.amazon.com/gp/product/B07ZNZ28X7)
* ~$8 [DHT22 Temperature and Humidity Sensor](https://www.amazon.com/gp/product/B01N9BA0O4)
* ~$8 [Project Box](https://www.amazon.com/gp/product/B07W6SJGJM)
* ~$12 [Brass Standoffs](https://www.amazon.com/gp/product/B0756CW6Y2)

Total ~$123

## Hardware Documentation

* [Raspberry Pi Zero W](https://www.raspberrypi.org/products/raspberry-pi-zero-w/)
* [SDS011 Nova PM Sensor](https://aqicn.org/sensor/sds011/)
* [MH-Z14A CO2 Sensor](https://www.winsen-sensor.com/d/files/infrared-gas-sensor/mh-z14a_co2-manual-v1_01.pdf)
* [DHT22 Temperature and Humidity Sensor](https://www.adafruit.com/product/385)

## Notes
* SDS011 Should be placed in what looks like upside down so gravity sensor works as expected and sensor gets less dirty
* SDS011 has a running life of about 8000 hours or ~1yr continuous, so put it to sleep between usage
  * When this dies I'll replace it with the slightly more expensive Sensirion SPS30 which has a 10 year life and more reliable sensor, though the SDS011 has been very accurate so far
* SDS011 stops being accurate above 70% humidity, hence the humidity sensor
* DHT22 had a little burn in period where it first reported 10C higher temps then leveled out after about a day
* MH-Z14A sensor is on the top, there's blinking red lights keep that clear, clean, and facing upright

## Setup
- Get the [Raspberry Pi Image](https://www.raspberrypi.org/documentation/installation/installing-images/) and install it to the SD Card
- I used a USB keyboard and HDMI monitor to log in, update user account and password
- Enable and add 2-factor to SSH
- Configure Wifi
- Run updates
- Test Remoting in with SSH so you can do the rest remotly
- Install requirments
  - Python, Apache, PHP, MariaDB
  - pyserial, pymysql, Adafruit_DHT
- Sync this project
- Configure MariaDB table
- Copy Web Site
- Install sensors.service
- Start service

Now you can go to the IP of your Raspberry Pi to monitor air quality
![Morbo Website](/images/website.png)

## Usage

To test the SDS011 Nova PM Sensor run this (assuming you are using the USB to UART connector on /dev/ttyUSB0)
```
sudo python3 airquality.py
```

To test the MH-Z14A CO2 Sensor run this
```
sudo python3 co2.py
```
