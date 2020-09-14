<?php

$servername = "localhost";
$username = "logger";
$password = "{UPDATE ME}";

// Create connection
$conn = new mysqli($servername, $username, $password);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT `timestamp`,`temperature`,`humidity`,`pm2.5`,`pm10`,`co2` FROM `raspi`.`sensors` WHERE `temperature` is not null and `humidity` is not null and `pm2.5` is not null and `pm10` is not null and `co2` is not null and `timestamp` > DATE_ADD(NOW(), INTERVAL -4 HOUR) order by `timestamp` desc;";
$result = $conn->query($sql);

echo "timestamp,temperature,humidity,pm2p5,pm10,co2\n";

if ($result->num_rows > 0) {
  while($row = $result->fetch_assoc()) {
    if($row["pm2.5"] == "0" or $row["pm10"] == "0"){ continue; }
    echo $row["timestamp"].",".$row["temperature"].",".$row["humidity"].",".$row["pm2.5"].",".$row["pm10"].",".$row["co2"]."\n";
  }
}
  
$conn->close();

?>
