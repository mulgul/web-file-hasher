#!/bin/bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

install_wasm_pack() {
    WASM_PACK_VERSION=0.12.1
    WASM_PACK="wasm-pack"

    uname_out="$(uname -s)"
    case "${uname_out}" in
        Linux*)     machine=Linux;;
        Darwin*)    machine=Darwin;;
    esac

    if [ $(cargo install --list | grep -q "wasm-pack v${WASM_PACK_VERSION}"; echo $?) != 0 ]; then
        echo "$WASM_PACK v${WASM_PACK_VERSION} is not installed, and is required to build calc, would you like to install it now? (Y/N)";
        read response
        if [ "$response" == "y" ] || [ "$response" == "Y" ]; then
            ## Check if system is linux or mac for sudo or not.
            if [[ $machine = "Darwin" ]]
            then
                cargo install "$WASM_PACK" --vers 0.12.1;
            elif [[ $machine = "Linux" ]]
            then
                sudo cargo install "$WASM_PACK" --vers 0.12.1;
            fi
        else
            echo "Skipping the installation of $WASM_PACK...";
            echo "Please note that this Conky configuration will not work without the $WASM_PACK package.";
        fi
    else
        echo "The $WASM_PACK package has already been installed.";
    fi
}

install_wasm_pack

cd hashing-lib
wasm-pack build --target web --out-dir ../public

cd ..
cd dist
rm -rf .gitignore package.json *.d.ts
