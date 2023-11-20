import init, { hasher, hash_types } from './hashing_lib.js';

async function run() {
    await init();

    addDragAndDrop();
    addDropDown();
    //implement dropdown and hasher
}

function addDropDown() {
    const hashingTypes = hash_types();

    console.log(hashingTypes);
}

function addDragAndDrop() {
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
      
        handleFiles(files)
    }

    function handleFiles() {
        // TODO Need to handle files once they are dropped;
        console.log('TODO');
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
run();
