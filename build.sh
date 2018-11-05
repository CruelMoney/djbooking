#!/bin/bash

cd server
yarn install 
cd .. 
yarn cra-universal build 
cd dist 
yarn install