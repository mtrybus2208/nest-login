#!/bin/bash

rm ormconfig.json; ts-node -r tsconfig-paths/register src/scripts/write-type-orm-config.ts