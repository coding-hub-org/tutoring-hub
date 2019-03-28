#!/bin/bash

echo "Setting up..."
cd back-end && npm install
cd ..
cd front-end && npm install
cd .. 
echo "Completed setup"
