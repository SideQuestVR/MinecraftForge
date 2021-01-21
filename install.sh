#!/bin/bash
apt-get install docker.io docker-compose gnupg2 pass -y
wget https://github.com/docker/docker-credential-helpers/releases/download/v0.6.3/docker-credential-secretservice-v0.6.3-amd64.tar.gz
tar -xf docker-credential-secretservice-v0.6.3-amd64.tar.gz
chmod +x docker-credential-secretservice
mv docker-credential-secretservice /usr/bin/
rm docker-credential-secretservice-v0.6.3-amd64.tar.gz
mkdir /opt/minecraft /opt/minecraft/plugins /opt/minecraft/worlds /opt/minecraft/mods /opt/minecraft/config
chmod 777 /opt/minecraft -R
docker build -t sidequest/express -f DockerFile-Express .
docker build -t sidequest/mohist -f DockerFile .
docker swarm init
docker stack deploy -c compose.yml sq_mc
