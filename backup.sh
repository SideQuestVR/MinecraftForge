#!/bin/bash
TODAY=$(date --iso-8601=minutes -u)
BACKDIR=/opt/minecraft-backups
MINECRAFTDIR=/var/lib/mc
case $1 in
    legacy)
      tar -zcvf $BACKDIR/LEGACY-$TODAY.tar.gz $MINECRAFTDIR
      find $BACKDIR/ -type f -mtime +10 -name 'LEGACY-*.tar.gz' -delete
    ;;
    recent)
      tar -zcvf $BACKDIR/RECENT-$TODAY.tar.gz $MINECRAFTDIR
      find $BACKDIR/ -type f -mtime +1 -name 'RECENT-*.tar.gz' -delete
    ;;
    latest)
      tar -zcvf $BACKDIR/LATEST.tar.gz $MINECRAFTDIR
    ;;
esac
