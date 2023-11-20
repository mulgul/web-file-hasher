#!/bin/bash

cd hashing-lib
wasm-pack build --target web --out-dir ../dist

cd ..
cd dist
rm -rf .gitignore package.json *.d.ts
