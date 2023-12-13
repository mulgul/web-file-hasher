export function readFileAsUrlToBase64(file) {
	return new Promise(function (resolve, reject) {
		let fr = new FileReader();

		fr.onloadend = function () {
			const base64String = fr.result.replace('data:', '').replace(/^.+,/, '');
			resolve(base64String);
		};

		fr.onerror = function () {
			reject(fr);
		};

		fr.readAsDataURL(file);
	});
}

/**
 * Credit: https://stackoverflow.com/questions/10420352/converting-file-size-in-bytes-to-human-readable-string
 */
export function convertFileSize(bytes, si = false, dp = 1) {
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
}
