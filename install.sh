mkdir /var/lib/mc
mkdir /var/lib/mc/minecraft
mkdir /var/lib/mc/override
mkdir /opt/minecraft-backups
chmod 777 /var/lib/mc -R
docker stack deploy -c compose.yml sq_mc
