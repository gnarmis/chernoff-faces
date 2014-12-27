#!/bin/bash

exec brew update && brew install node
exec npm install
exec npm install -g bower
exec bower install
