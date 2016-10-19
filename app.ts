/// <reference path="./typings/index.d.ts" />

import * as fs from 'fs';

const minStringEqualLength = 8;
let files: string[] = getFileList();

function getFileList(): string[] {
	let fileData = fs.readFileSync('files.txt');
	return fileData.toString().split('\n').map(file => file.trim()).filter(file => file.length > 0);
}

function getBaseFilename(files: string[]): string {
	if (files.length === 0) return '';
	let prefix = '';
	while (true) {
		let consideredLetter = files[0].charAt(prefix.length);
		for (let file of files) {
			if (file.length === prefix.length || file.charAt(prefix.length) !== consideredLetter) {
				return prefix;
			}
		}
		prefix += consideredLetter;
	}
}

function isSimilar(file: string, crtSimilarFiles: string | string[]): boolean {
	let crtSimilarFile = '';
	if (typeof crtSimilarFiles === 'string') crtSimilarFile = crtSimilarFiles;
	if (typeof crtSimilarFiles === 'array') {
		if (crtSimilarFiles.length === 0) return true;
		crtSimilarFile = crtSimilarFiles[0];
	}
	return crtSimilarFile.startsWith(file.substr(0, minStringEqualLength));
}
/*
files
	.sort()
	.map(file => file.substr(0, file.lastIndexOf('.')))
	.reduce((prev, crt, index, array) => {
		return prev;
	}, {prevFile: '', crtSimilarFiles: <string[]>[], similarFiles: <string[]>[]});
*/

console.log(
	files
		.sort()
		.map(file => file.substr(0, file.lastIndexOf('.')))
		.slice(0, 20)
);