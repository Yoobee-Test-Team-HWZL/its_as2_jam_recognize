# Background
IntelliTraffic   AI-Powered Traffic Flow Management System
IntelliTraffic leverages the power of TensorFlow and OpenCV to create an intelligent traffic flow management system. By utilizing real-time data from camera feeds, this project aims to accurately monitor and analyze vehicle density on roads. The system uses computer vision techniques to detect and count vehicles, and machine learning models to predict traffic patterns. Based on this analysis, IntelliTraffic dynamically adjusts traffic light signals to optimize traffic flow, reduce congestion, and enhance road safety. This automated approach not only improves the efficiency of traffic management but also contributes to reducing emissions and fuel consumption by minimizing idle times for vehicles at traffic signals. 

 By improving the predictability and effectiveness of traffic operations, IntelliTraffic puts safety first. Traffic signal dynamic adjustment reduces collision risk and enhances overall road safety for drivers and pedestrians by utilizing real-time data. Furthermore, the system's scalability makes it possible to integrate it seamlessly into current traffic control infrastructures, guaranteeing compatibility and convenience of use in a variety of metropolitan situations. 

# Participants

- Yuqi Wang
- Chen Zhang
- Yonggang Li
- Yu Huang
- Vanshika

# Quick start
For easy operation, the model recognition part has been packaged as a docker image and published on dockerhub. The corresponding image name is: richardwong666/its_as2:v4. You can pull the image and start running the model to test it.

the DockerHub link: https://hub.docker.com/layers/richardwong666/its_as2/v4/images/sha256:f43dcf2de18bd59f33e509783f88ec3f074d98ee04429dc19c3d7c40ef1970d7?uuid=857fcb70-dc3d-466a-819b-e61765033a25%0A

```
docker run -d -p {local_host_port}:5000 {image_hash_id} /bin/bash /root/AS2_ITS/start.sh
``` 


# Tree explination

```
.
├── README.md 
├── Traffic_Jam_Model_Training.ipynb # model training code file, including all code regarding model training work
├── Traffic_Flow # front-end files
├── main.py # back-end API
└── models # the trianing result 
    ├── resnet50-traffic_dataset-test_acc_0.91250_epoch-96.pt
    └── traffic_dataset_model_classes.json


```
