#include <ESP8266WiFi.h>

// network name
const char* ssid = "";
// network password
const char* password = "";
// server address
const char* host = "";
// server port
const int httpPort = 8081;

const char* wardNo = "W10";
const char* bedNo = "B20";

void setup() {
  // digital IR sensor input
  pinMode(D7, INPUT);

  // IR emitter output
  pinMode(D6, OUTPUT);

  // NodeMCU in-built LED
  pinMode(LED_BUILTIN, OUTPUT);
  
  Serial.begin(9600);

  Serial.println("Connecting to " + ssid);

  WiFi.begin(ssid, password);

  while(WiFi.status() != WL_CONNECTED){
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

  if (sensorInputValue == HIGH) {
    Serial.println("HIGH");
    digitalWrite(LED_BUILTIN, HIGH);
    sendDataToServer("normal");
  } else {
    Serial.println("LOW");
    digitalWrite(LED_BUILTIN, LOW);
    sendDataToServer("reached");
  }

  // run loop every 5 seconds
  delay(5000);
}

void sendDataToServer(String salineLevelStatus) {
  Serial.println("Connecting to " + host);

  WiFiClient client;
  
  if(!client.connect(host, httpPort)){
    Serial.println("Connection failed");
    return;
  }

  //String data = String(wardNo) + String(bedNo);
  String url = "/?wardNo=" + String(wardNo) + "&bedNo=" + String(bedNo) + "&status=" + salineLevelStatus;

  Serial.println("Requesting URL: " + url);

  Serial.println("Requesting GET: ");
  client.print(String("GET ") + url + " HTTP/1.1\r\n" +"Connection: close\r\n\r\n");
           
  unsigned long timeout = millis();
  while (client.available() == 0) {
    if (millis() - timeout > 5000) {
      Serial.println("Client Timeout!");
      client.stop();
      return;
    }
  }

  // read response from server and print
  while(client.available()){
    String line = client.readStringUntil('\r');
    Serial.print(line);
  }

  Serial.println("Closing connection");
}
