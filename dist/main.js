import init, { hasher, hash_types } from './hashing_lib.js';

async function run() {
    // Initialize wasm
    await init();

    const files = [];

    addDragAndDrop(files);
    addDropDown();
}

const convertFileSize = (bytes, si = false, dp = 1) => {
	const thresh = si ? 1000 : 1024;

	if (Math.abs(bytes) < thresh) {
		return bytes + ' B';
	}

	const units = si
		? ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
		: ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
	let u = -1;
	const r = 10 ** dp;

	do {
		bytes /= thresh;
		++u;
	} while (
		Math.round(Math.abs(bytes) * r) / r >= thresh &&
		u < units.length - 1
	);

	return bytes.toFixed(dp) + ' ' + units[u];
};

function addDropDown() {
    const hashingTypes = hash_types();

    console.log(hashingTypes);
}

function addDragAndDrop(f) {
    let dropArea = document.getElementById('dropArea');
    let fileElem = document.getElementById('fileElem');

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
        console.log(e);
        let dt = e.dataTransfer
        let files = dt.files

        for(const file of files) {
            f.push(file)
            addFileToList(file)
        }
    }

    fileElem.onchange = () => {
        for (const file of fileElem.files) {
            f.push(file);
            addFileToList(file)
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

function addFileToList(file) {
    const item = document.getElementById('listFiles');
    const newLI = document.createElement('div');
    newLI.setAttribute('id', 'filename-div');
    // const fileNameContainer = document.createElement('div');
    // fileNameContainer.setAttribute('id', 'fileNameContainer');
    const fileName = document.createElement('p');
    fileName.textContent = file.name;
    const fileSize = document.createElement('p');
    fileSize.textContent = convertFileSize(file.size, true);
    item.appendChild(newLI);
    // fileNameContainer.appendChild(fileName);
    newLI.appendChild(fileName);
    newLI.appendChild(fileSize);
}

run();
