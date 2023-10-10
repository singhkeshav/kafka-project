# New Step for Single Container

# Make sure your docker-compose command is avialble as global

# Steps

     1. # Please Open your terminal on root level for example kakfa-project  folder is root
     2. run command  -> docker-compose up --build
     3. after run success fully all images on your local please open your chrome browser
     4. and run http://localhost:3000

#

# Project Title

React, Node, Kafka Zookeeper, and Websocket are being used in this system test to share real-time data.

# Project Tech Stack

1.  Node js and Express Framwork :
    :- For the server layer, which manages kafka consumers and producers.
    :- Additionally, when the consumer is calling in the background, we use Websocket to communicate data between the client and server.
2.  React js Libary :  
     Simply display the real-time count of emails sent using bootstrap and react, along with its save and input elements.
3.  Docker Kafka and Zookeeper Image :
    I utilised the Docker Kafka Image and the Zookeeper Image to create a distributed system in node js.

    # Image Names

          :- Image Name for Zookeeper : zookeeper:latest
          :- Image Name For Kafka     : confluentinc/cp-kafka:latest

4.  Websocket :
    :- Node and React Js have installed ws and use WebSocket instance

# Project prerequisites

1.  Local Node Env must be required.
2.  If Apache kafka is already installed locally, we can ignore it. On local docker must be necessary for kafka or zookeeper.
3.  React env, such as react-script command as global, is also necessary in the local environment.
4.  These ports, 3000, 3001, and 3002, shouldn't be reserved or blocked with other services. If it's blocking, we must manually adjust the port number.
    # Ports are using diffrent purpose.
         1. 3000 : for react app listing.
         2. 3001 : for server app listing.
         3. 3002 : for websocket real time data sharing.

# Project Run Steps

1.  # Docker Zookeeper Image Command for active
    1. docker run -p <default port>2181:<default port>2181 zookeeper (docker run -p 2181:2181 zookeeper)
2.  # Docker Kafka Image Command for active

    1.  docker run -p <default port for kafka>9092:<default port for kafka>9092 (for window ^ or for safari and ubuntu /)
        -e KAFKA_ZOOKEEPER_CONNECT=<your sys private ip>192.168.1.5:<default port>2181 ^
        -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://<private sys ip add>:9092 ^
        -e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 ^
        <kafka image name>confluentinc/cp-kafka

                for real command for my system.

                docker run -p 9092:9092  ^
                  -e KAFKA_ZOOKEEPER_CONNECT=192.168.1.5:2181 ^
                  -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://192.168.1.5:9092 ^
                  -e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 ^
                  confluentinc/cp-kafka

    2.  after pull and run successfully kafka and zookeeper on local
    3.  We can uselessly run Node JS and React applications.
        # commands for run node and react
        # React App.
        1. cd client
        2. npm install
        3. npm start
        # Node App.
        1. cd server
        2. npm install
        3. npm start
