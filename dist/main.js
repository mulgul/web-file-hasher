import init, { hasher, hash_types } from './hashing_lib.js';

async function run() {
    // Initialize wasm
    await init();

    const files = [];

    addDragAndDrop(files);
    addDropDown();
}

function addDropDown() {
    const hashingTypes = hash_types();

    console.log(hashingTypes);
}

function addDragAndDrop(f) {
    let dropArea = document.getElementById('drop-area');

    function preventDefaults (e) {
        e.preventDefault()
        e.stopPropagation()
    }

    function highlight(e) {
        dropArea.classList.add('highlight');
    }
    
    function unhighlight(e) {
        dropArea.classList.remove('highlight');
    }

    function handleDrop(e) {
        let dt = e.dataTransfer
        let files = dt.files

        for(const file of files) {
            f.push(file)
            addFileToList(file.name)
        }
    }

    ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false)
    })

    ;['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, highlight, false)
      })
      
    ;['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, unhighlight, false)
    })

    dropArea.addEventListener('drop', handleDrop, false)
}

function addFileToList(fileName) {
    const item = document.getElementById('listFiles');
    const newLI = document.createElement('div');
    newLI.setAttribute('id', 'filename-div')
    newLI.textContent = fileName;
    item.appendChild(newLI);
}

run();
