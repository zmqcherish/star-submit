const fs = require('fs')
const imginfo = require('imageinfo')
const sharp = require('sharp');
const { contextBridge, ipcRenderer, clipboard } = require('electron')

import { getStoreVal, setStoreVal } from './utils/db'


const getImg = async () => {
	let path = await ipcRenderer.invoke('get-img');
	if (!path) {
		return null;
	}
	// let sData = await sharp(path).resize(20, 20).toBuffer();
	// let sData = await sharp(path).resize(20, 20).toFile('C:\\a.jpg');
	let imgData = fs.readFileSync(path);
	let info = imginfo(imgData);
	const oldWidth = info.width;
	const oldHeight = info.height;
	let newWidth, newHeight;
	if(oldWidth > oldHeight) {
		newWidth = 800;
		newHeight = parseInt(newWidth * oldHeight / oldWidth);
	} else {
		newHeight = 600;
		newWidth = parseInt(newHeight * oldWidth / oldHeight);
	}
	console.log(11, newHeight);
	let newImgData = await sharp(path).resize(newWidth, newHeight).toBuffer();
	// console.log("Size:", data.length, "bytes");
	// console.log("Dimensions:", info.width, "x", info.height);
	return "data:image/jpg;base64," + newImgData.toString('base64');
}


const getData = (k) => {
	if(k == 'camera' || k == 'lens') {
		return getStoreVal(k) || [];
	}
}

const setData = (k, v) => {
	setStoreVal(k, v);
}

const copyText = (txt) => {
	clipboard.writeText(txt);
}

contextBridge.exposeInMainWorld('electronAPI', {
	getData,
	setData,
	getImg,
	copyText
})