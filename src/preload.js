const fs = require('fs')
const imginfo = require('imageinfo')
// const sharp = require('sharp');
const { contextBridge, ipcRenderer } = require('electron')

import { getStoreVal, setStoreVal } from './utils/db'


const getImg = async () => {
	let path = await ipcRenderer.invoke('get-img');
	if (!path) {
		return null;
	}
	// let sData = await sharp(path).resize(20, 20).toBuffer();
	// let sData = await sharp(path).resize(20, 20).toFile('C:\\a.jpg');
	let data = fs.readFileSync(path);
	let info = imginfo(data);
	// console.log(sData);
	console.log(data);
	// console.log("Size:", data.length, "bytes");
	// console.log("Dimensions:", info.width, "x", info.height);
	return "data:image/jpg;base64," + data.toString('base64');
}


const getData = (k) => {
	if(k == 'camera' || k == 'lens') {
		return getStoreVal(k) || [];
	}
}

const setData = (k, v) => {
	setStoreVal(k, v);
}

contextBridge.exposeInMainWorld('electronAPI', {
	getData,
	setData,
	getImg
})