import init, { hasher, hash_types } from './hashing_lib.js';
import { convertFileSize, readFileAsUrlToBase64 } from './util.js';

/**
 * TODO:
 *
 * We should change the file logo to a folder if the passed in artifact is a folder.
 * We also have to account for that logic as well, as folders are handled differently than files.
 */

async function run() {
	// Initialize wasm
	await init();

	const files = [];

	addDragAndDrop(files);
	addDropDown();

	const hashBtn = document.getElementById('hash-btn');
	hashBtn.addEventListener('click', () => {
		let readers = [];

		if (!files.length) {
			// TODO: Handle the error.
			// This should print some read text saying
			// A file must be uploaded before hashing.
		}
		const selectedHash = document.querySelector('.placeholder');
		const selectedFiles = getSelectedFileTypes();
		const sFiles = files.filter((file) => selectedFiles.includes(file.name));
		for (let i = 0; i < sFiles.length; i++) {
			readers.push(readFileAsUrlToBase64(sFiles[i]));
		}
		Promise.all(readers).then((values) => {
			const concated = values.join('');
			const hash = hasher(selectedHash.textContent, concated);
			printHashedFile(hash);
		});
	});

	const copyButton = document.getElementById('copy-btn');
	copyButton.addEventListener('click', () => {
		const copyText = document.getElementById('returnFeild');
		copyText.select();
		navigator.clipboard.writeText(copyText.value).then(() => {
			// TODO: This should be a `Copied` message that shows up on the text area. then dissapears after 2 seconds.
			alert('Copied the text: ' + copyText.value);
		});
	});
}

/**
 * This will filter the selected files for the ones that are checked, and filter
 * their hash types.
 *
 * @returns {Array} Returns an array of selected file type.
 */
function getSelectedFileTypes() {
	const files = document.getElementsByClassName('filename-div');
	return Array.from(files)
		.filter((node) => node.firstChild.childNodes[0].checked)
		.map((node) => node.firstChild.innerText);
}

/**
 * Creates a dropdown for selecting hash types.
 *
 * @returns {void}
 */
function addDropDown() {
	// Hashing types available. From WASM.
	const hashingTypes = hash_types();

	const dropDiv = document.getElementById('dropdown-parent');
	const dropContainer = document.createElement('div');

	const input = createInput();
	const dropdown = showDropdown(hashingTypes);

	dropContainer.appendChild(input);
	dropContainer.appendChild(dropdown);
	dropDiv.appendChild(dropContainer);
}

/**
 * Creates the inital input for the dropdown.
 *
 * @returns {void}
 */
function createInput() {
	const input = document.createElement('div');
	input.classList = 'input';
	input.addEventListener('click', toggleDropdown);

	const inputPlaceholder = document.createElement('div');
	inputPlaceholder.classList = 'input__placeholder';

	const placeholder = document.createElement('p');
	placeholder.textContent = 'Select Hash';
	placeholder.classList.add('placeholder');

	// Appends the placeholder and chevron (stored in assets.js)
	const chevronPng = document.createElement('img');
	chevronPng.setAttribute('src', 'assets/chevron.png');
	chevronPng.setAttribute('id', 'chevron');
	inputPlaceholder.appendChild(placeholder);
	inputPlaceholder.appendChild(chevronPng);
	input.appendChild(inputPlaceholder);

	return input;
}

/**
 * This creates the logic to toggle the dropwdown.
 *
 * @param {*} hashingTypes
 * @returns {HTMLDivElement}
 */
function showDropdown(hashingTypes) {
	const structure = document.createElement('div');
	structure.classList.add('structure', 'hide');

	hashingTypes.forEach((hash) => {
		const option = document.createElement('div');
		option.addEventListener('click', () => selectOption(hash));
		option.setAttribute('id', 'option');

		const hashType = document.createElement('p');
		hashType.setAttribute('id', 'hashName');
		hashType.textContent = hash;

		option.appendChild(hashType);
		structure.appendChild(option);
	});
	return structure;
}

function selectOption(hash) {
	const text = document.querySelector('.placeholder');
	text.textContent = hash;
	text.classList.add('input__selected');
	toggleDropdown();
}

function toggleDropdown() {
	const dropdown = document.querySelector('.structure');
	dropdown.classList.toggle('hide');

	const input = document.querySelector('.input');
	input.classList.toggle('input__active');
}

function addDragAndDrop(f) {
	let dropArea = document.getElementById('dropArea');
	let fileElem = document.getElementById('fileElem');

	function preventDefaults(e) {
		e.preventDefault();
		e.stopPropagation();
	}

	function highlight() {
		dropArea.classList.add('highlight');
	}

	function unhighlight() {
		dropArea.classList.remove('highlight');
	}

	function handleDrop(e) {
		let dt = e.dataTransfer;
		let files = dt.files;

		for (const file of files) {
			f.push(file);
			addFileToList(file, f);
		}
	}

	fileElem.onchange = () => {
		for (const file of fileElem.files) {
			f.push(file);
			addFileToList(file, f);
		}
	};
	['dragenter', 'dragover', 'dragleave', 'drop'].forEach((eventName) => {
		dropArea.addEventListener(eventName, preventDefaults, false);
	});
	['dragenter', 'dragover'].forEach((eventName) => {
		dropArea.addEventListener(eventName, highlight, false);
	});
	['dragleave', 'drop'].forEach((eventName) => {
		dropArea.addEventListener(eventName, unhighlight, false);
	});

	dropArea.addEventListener('drop', handleDrop, false);
}

function addFileToList(file, files) {
	const item = document.getElementById('listFiles');
	const newLI = document.createElement('div');
	const fileNameContainerLeft = document.createElement('div');
	const fileNameContainerRight = document.createElement('div');
	const fileName = document.createElement('p');
	const fileSize = document.createElement('p');
	const checkBox = document.createElement('input');
	const filePng = document.createElement('img');
	const trashPng = document.createElement('img');

	newLI.setAttribute('class', 'filename-div');
	fileNameContainerLeft.setAttribute('id', 'fileNameContainerLeft');
	fileNameContainerRight.setAttribute('id', 'fileNameContainerRight');
	fileSize.setAttribute('id', 'file-size');
	trashPng.setAttribute('id', 'trash-png');
	fileName.textContent = file.name;
	fileSize.textContent = convertFileSize(file.size, true);

	checkBox.setAttribute('type', 'checkbox');
	trashPng.setAttribute('src', 'assets/trash.png');
	filePng.setAttribute('src', 'assets/file-icon.png');

	item.appendChild(newLI);
	fileNameContainerLeft.appendChild(checkBox);
	fileNameContainerLeft.appendChild(filePng);
	fileNameContainerLeft.appendChild(fileName);
	fileNameContainerRight.appendChild(fileSize);
	fileNameContainerRight.appendChild(trashPng);
	newLI.appendChild(fileNameContainerLeft);
	newLI.appendChild(fileNameContainerRight);

	checkBox.checked = true;

	trashPng.addEventListener('click', () => {
		const fName = file.name;
		for (let i = 0; i < files.length; i++) {
			if (files[i].name === fName) {
				files.splice(i, 1);
			}
		}
		newLI.remove();
	});
}

function printHashedFile(hashedFile) {
	const returnField = document.getElementById('returnFeild');
	returnField.value = hashedFile;
}

run();
