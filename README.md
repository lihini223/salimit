# salimit
## Introduction
This project is a saline level detection and alerting system. Saline is given when patient’s body is dehydrated and the saline level in the given bottle requires constant monitoring. As per the technology is growing Internet of Things (IOT) has become a major in the field. Since IOT connects electronic devices and other embedded items with software over the internet, this project came up as a IOT solution for the requirement of the constant saline level monitoring.
In this project, a critical saline level is detected, and an alert will be sent to the nurse’s mobile application and to the nurse station. There will be a mobile application to track all the patients who has been given saline and nurse will be able to monitor each patient in the ward. When the system triggers an alert nurse can easily identify which patient’s saline is going to be finished. Also, nurse can set a timer for patients who need continuous attention after giving the saline. 

## Definition of the problem 
Saline is given when patient’s body is dehydrated and the saline level in the given bottle requires constant monitoring. The saline bottle needs to be replaced/remove immediately when the bottle is fully consumed. Otherwise, Blood rushes outward into the saline because of the pressure differential between the patient's blood pressure and the empty saline container. This kind of situations can lead to harmful threats to patient’s health. 

## Project Objectives 
-	Prevent patient’s blood rushing outwards.
-	Nurse can monitor each patient saline.
-	Nurse can track timing of each saline bottle that has been given to patients. 
-	Nurse can set a timer for the patients who needs continuous attention.
-	Develop a mobile app and a desktop/web app to monitor the live status of patient’s saline given. 

## Current System
Current system in hospitals is, they just give the saline to the patient and roughly record the time given. And manually monitor each patient who has been given saline. Nurses need to monitor saline level constantly to remove/ replace the saline bottle. Or else, patient’s caretaker needs to inform nurse about the saline level.

## Basic flow of the developed system

A nurse will give saline to patient and assign it to the relevant patient on the mobile app. And nurse input patient name, saline volume and saline dropping speed to the mobile app. Mobile app itself start a time countdown according to given inputs. The sensors will constantly monitor the saline level until it they detect the critical saline level. When saline level reaches the critical level, an alert will be sent to the mobile application and nurse station desktop app indicating the relevant patient. Also, nurse can set a timer through the mobile app for the patients who needs a special attention constantly. Patient details on giving saline is recorded in a cloud database every time a nurse give saline to a patient.

There will be another special feature for the patients in the developed device which is an emergency buzzer. Patients or their care takers can easily push the buzzer when an emergency occurs such as saline needle pulled out from the patient’s hand or the nurse did not come on time to replace/ remove saline even if the alert sent to them already.

The saline level will be detected by the IR/RFID sensors constantly and the sensor data is processed by a Node MCU. The Node MCU is connected to a web server. The mobile app, desktop app and cloud database are connected to the web server through a local WI-FI network. The Node MCU will send a request to the web server when the saline level reaches to the critical saline level. Then the alert will be sent to the mobile application and desktop application. Meanwhile the database is updated with the details of the patient, given saline volume, speed of the saline dropping and the time saline given.

## Devices 
-	Node MCU esp8266
-	IR sensors 
-	RFID sensors

## Tools and Technologies
-	Arduino IDE
-	C programming language to program the micro controller.
-	Node JS for backend server
