#!/bin/bash

cd server
yarn install 
cd .. 
cra-universal build 
cd dist 
yarn install