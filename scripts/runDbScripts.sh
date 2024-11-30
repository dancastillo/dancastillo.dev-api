#!/bin/sh

#-------------------------------------------
# Run db scripts
#-------------------------------------------

# Run db migrations
node ./scripts/migration.js

# Run db seeds
node ./scripts/seed.js
