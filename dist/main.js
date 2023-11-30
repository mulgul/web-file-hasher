import init, { hasher, hash_types } from './hashing_lib.js';

async function run() {
    // Initialize wasm
    await init();

    const files = [];
    let hashType = '';

    addDragAndDrop(files);
    addDropDown(hashType);
}

function convertFileSize(bytes, si = false, dp = 1) {
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
    const dropContainer = document.createElement('div');

    const input = createInput();
    const dropdown = showDropdown(hashingTypes);

    dropContainer.appendChild(input);
    dropContainer.appendChild(dropdown);
    const dropDiv = document.getElementById('dropdown-parent');
    dropDiv.appendChild(dropContainer);

    console.log(hashingTypes);
}

function createInput() {
    const input = document.createElement('div');
    input.classList ='input';
    input.addEventListener('click', toggleDropdown);

    const inputPlaceholder = document.createElement("div");
    inputPlaceholder.classList = "input__placeholder";
  
    const placeholder = document.createElement("p");
    placeholder.textContent = "Select Hash";
    placeholder.classList.add('placeholder')
  
    // Appends the placeholder and chevron (stored in assets.js)
    const chevronPng = document.createElement('img');
    chevronPng.setAttribute('src', 'chevron.png');
    chevronPng.setAttribute('id', 'chevron');
    inputPlaceholder.appendChild(placeholder);
    inputPlaceholder.appendChild(chevronPng);
    input.appendChild(inputPlaceholder);
  
    return input;
}

function showDropdown(hashingTypes) {
    const structure = document.createElement("div");
    structure.classList.add("structure", "hide");
  
    hashingTypes.forEach(hash => {
        const option = document.createElement("div");
        option.addEventListener("click", () => selectOption(hash));
        option.setAttribute("id", "option");

        const hashType = document.createElement("p");
        hashType.setAttribute("id", "hashName")
        hashType.textContent = hash;

        option.appendChild(hashType);
        structure.appendChild(option);
    });
    return structure;
};

function toggleDropdown() {
    const dropdown = document.querySelector(".structure");
    dropdown.classList.toggle("hide");
  
    const input = document.querySelector(".input");
    input.classList.toggle("input__active");
};

function selectOption(hash) {
    const text = document.querySelector('.placeholder');
    text.textContent = hash;
    text.classList.add('input__selected');
    toggleDropdown();
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
    const fileNameContainer = document.createElement('div');
    fileNameContainer.setAttribute('id', 'fileNameContainer');
    const fileName = document.createElement('p');
    fileName.textContent = file.name;
    const fileSize = document.createElement('p');
    fileSize.textContent = convertFileSize(file.size, true);
    const checkBox = document.createElement('input');
    checkBox.setAttribute('type', 'checkbox');
    const filePng = document.createElement('img');
    filePng.setAttribute('src', 'file-icon.png');
    item.appendChild(newLI);
    fileNameContainer.appendChild(checkBox);
    fileNameContainer.appendChild(filePng);
    fileNameContainer.appendChild(fileName);
    newLI.appendChild(fileNameContainer);
    newLI.appendChild(fileSize);
}


run();
