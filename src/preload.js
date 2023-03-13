const fs = require('fs')
const path = require('path')
const imginfo = require('imageinfo')
const sharp = require('sharp');
const { contextBridge, ipcRenderer, clipboard } = require('electron')

import { getStoreVal, setStoreVal } from './utils/db'


const getImg = async () => {
	let imgPath = await ipcRenderer.invoke('get-img');
	if (!imgPath) {
		return null;
	}
	let imgData = fs.readFileSync(imgPath);
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
	let newImgData = await sharp(imgPath).resize(newWidth, newHeight).toBuffer();
	// console.log("info:", info);
	setData('imgInfo', {path: imgPath, info});
	return "data:image/jpg;base64," + newImgData.toString('base64');
}

const getEmailAttach = async (type) => {
	const tempPath = await ipcRenderer.invoke('get-tmp-path');
	const imgOutPath = path.join(tempPath, `${type}.jpg`)
	const imgRawPath = getData('imgInfo')['path'];
	try {
		let resDataInfo = await sharp(imgRawPath).resize(200, 200).toFile(imgOutPath);
		const t = await sharp(imgOutPath).resize(20, 20).toBuffer();
		const imgShowData = "data:image/jpg;base64," + t.toString('base64');
		// console.log(11, sData);
		return imgShowData;
	} catch (error) {
		console.error('getEmailAttach error', error);
	}
	return null;
}


const sendEmail = async (mailData) => {
	const m = getData('mail');
	const mailConfig = {
		host: m['host'],
		port: Number(m['post']),
		// secure: false,
		auth: {
			user: m['email'],
			pass: m['pwd'],
		}
	}

	// const mailData = {
	// 	from: m['email'],
	// 	to: 'zmqcherish@outlook.com',
	// 	subject: 'testt',
	// 	text: 'test',
	// 	attachments:[
	// 		{
	// 			filename : 'package.jpg',
	// 			path: 'C:\\Users\\zmqch\\OneDrive\\摄影\\摄影作品\\精选\\2022精选\\DSC06456-edit.jpg'
	// 		},
	// 	]
	// }
	mailData['from'] = m['email'];
	mailData['to'] = 'zmqcherish@outlook.com';

	let mailRes = await ipcRenderer.invoke('send-mail', mailConfig, mailData);
	console.log(mailRes);
}


const getData = (k) => {
	if(k == 'camera' || k == 'lens') {
		return getStoreVal(k) || [];
	}
	return getStoreVal(k);
}

const setData = (k, v) => {
	setStoreVal(k, v);
}

const copyText = (txt) => {
	clipboard.writeText(txt);
}

const checkDevice = () => {
	const t1 = getData("camera");
	const t2 = getData("lens");
	return t1 && t2 && t1.length > 0 && t2.length > 0;
}

contextBridge.exposeInMainWorld('electronAPI', {
	getData,
	setData,
	getImg,
	copyText,
	sendEmail,
	getEmailAttach,
	checkDevice
})