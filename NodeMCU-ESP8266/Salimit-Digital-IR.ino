#include <ESP8266WiFi.h>

// network name
const char* ssid = "";
// network password
const char* password = "";
// server address
const char* host = "https://salimit-iot.herokuapp.com";
// server port
const int httpPort = 80;

const char* deviceId = "d4000";
const char* wardNo = "";
const char* bedNo = "";

void setup() {
  // digital IR sensor input
  pinMode(D7, INPUT);

  // IR emitter output
  pinMode(D6, OUTPUT);

  // NodeMCU in-built LED
  pinMode(LED_BUILTIN, OUTPUT);
  
  Serial.begin(9600);

  Serial.println("Connecting to " + String(ssid));

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("WiFi connected");
  Serial.println("IP address: " + WiFi.localIP());
}

void loop() {
  // power out to IR emitter
  digitalWrite(D6, HIGH);
  
  // read input from IR sensor
  int sensorInputValue = digitalRead(D7);

  Serial.println(sensorInputValue);

  String salineLevelStatus = "";

  if (sensorInputValue == HIGH) {
    Serial.println("HIGH");
    digitalWrite(LED_BUILTIN, HIGH);
    salineLevelStatus = "normal";
  } else {
    Serial.println("LOW");
    digitalWrite(LED_BUILTIN, LOW);
    salineLevelStatus = "reached";
    sendSalineStatus(salineLevelStatus);
  }

  //sendSalineStatus(salineLevelStatus);

  // delay loop
  delay(2000);
}

void sendSalineStatus(String salineLevelStatus) {
  Serial.println("Connecting to " + String(host));

  WiFiClient client;
  
  if (!client.connect(host, httpPort)) {
    Serial.println("Connection failed");
    return;
  }

  //String data = String(wardNo) + String(bedNo);
  //String data = "?wardNo=" + String(wardNo) + "&bedNo=" + String(bedNo) + "&status=" + salineLevelStatus;
  String url = "/saline-status";
  String data = "?deviceId=" + String(deviceId) + "&salineStatus=" + salineLevelStatus;

  Serial.println("Requesting URL: " + url + data);

  Serial.println("Requesting GET: ");
  client.print(String("GET ") + url + data + " HTTP/1.1\r\n" +"Connection: close\r\n\r\n");
           
  unsigned long timeout = millis();
  while (client.available() == 0) {
    if (millis() - timeout > 5000) {
      Serial.println("Client Timeout!");
      client.stop();
      return;
    }
  }

  // read response from server and print
  while (client.available()) {
    String line = client.readStringUntil('\r');
    Serial.print(line);
  }

  Serial.println();
  Serial.println("Closing connection");
}
