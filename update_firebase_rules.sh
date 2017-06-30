#!/bin/sh
echo 'Current rules:'
curl 'https://raccoon-c86bb.firebaseio.com/.settings/rules.json?auth=vTmi70GaTA2uIqbZ2bFWvpJvMGqoJvdhdcQMUxSr'

echo 'Updating Firebase rules...'
curl -X PUT --data-binary @database.rules.json 'https://raccoon-c86bb.firebaseio.com/.settings/rules.json?auth=vTmi70GaTA2uIqbZ2bFWvpJvMGqoJvdhdcQMUxSr'
