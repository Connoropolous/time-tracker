#!/bin/bash

npx rimraf ui.zip
npx rimraf build
npx react-scripts build
cd ./build
bestzip ../ui.zip *
cd ../
hc web-app pack web-happ