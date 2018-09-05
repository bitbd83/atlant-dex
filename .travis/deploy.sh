#!/bin/bash

eval "$(ssh-agent -s)" # Start ssh-agent cache
chmod 600 .travis/deploy-key # Allow read access to the private key
ssh-add .travis/deploy-key # Add the private key to SSH

# pass host authenticity check
echo -e "Host $IP\n\tStrictHostKeyChecking no\n" >> ~/.ssh/config
ssh-keyscan -p $PORT $IP >> ~/.ssh/known_hosts

# push changes to the deployment environment
git config --global push.default matching
git remote add deploy ssh://deploy@$IP:$PORT$DEPLOY_DIR
git push deploy dev

# build frontend after deploying
ssh deploy@$IP -p $PORT <<EOF
  cd $DEPLOY_DIR
  npm install
  npm run build
EOF
