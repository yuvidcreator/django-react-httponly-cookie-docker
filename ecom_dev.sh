#! /bin/bash
set -e

# git pull origin main

sudo chown -cR $USER:$USER .
sudo chown -cR $USER:$USER .*

docker compose up -d --build

