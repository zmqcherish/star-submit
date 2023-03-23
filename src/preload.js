const path = require('path')
const sharp = require('sharp');
const { contextBridge, ipcRenderer, clipboard } = require('electron')

import { getStoreVal, setStoreVal } from './utils/db'


const getImg = async () => {
	// await getEmailAttach('nc')
	let imgPath = await ipcRenderer.invoke('get-img');
	if (!imgPath) {
		return null;
	}
	const imgInfoRaw = await sharp(imgPath).metadata();
	const imgInfo = {
		width: imgInfoRaw.width,
		height: imgInfoRaw.height,
		format: imgInfoRaw.format,
		path: imgPath
	}
	// console.log('info', imgInfo);
	const newSize = getNewSize(imgInfo);
	let newImgData = await sharp(imgPath).resize(newSize[0], newSize[1]).toBuffer();
	setData('imgInfo', imgInfo);
	return "data:image/jpg;base64," + newImgData.toString('base64');
}

//夜空中国 窄边至少800像素，长边至多2000像素，文件大小在1M以内，拼接作品可适当放宽
//csva 正常横图长边1080、正常竖图短边1080、特殊接片短边1080
//国家天文 10M内
const sizeType = {
	'csva': 1080, 'nc':2000
}

const getEmailAttach = async (type) => {
	const tempPath = await ipcRenderer.invoke('get-tmp-path');
	const imgOutPath = path.join(tempPath, `${type}.jpg`)
	const imgRawInfo = getData('imgInfo');
	const imgRawPath = imgRawInfo['path'];
	try {
		let newSize;
		if(type == 'csva' || type == 'nc') {
			const newLen = sizeType[type];
			newSize = getNewSize(imgRawInfo, newLen, newLen);
		} else {
			newSize = getNewSize(imgRawInfo, 0, 0, 0.8);
		}
		
		let resDataInfo = await sharp(imgRawPath).resize(newSize[0], newSize[1]).toFile(imgOutPath);

		//用于展示
		const newShowSize = getNewSize(imgRawInfo, 200, 200);
		const t = await sharp(imgOutPath).resize(newShowSize[0], newShowSize[1]).toBuffer();
		const imgShowData = "data:image/jpg;base64," + t.toString('base64');

		let imgSize = resDataInfo['size'] / 1024;
		let imgSizeContent = '';
		let overSize = '';
		if(imgSize < 1024) {
			imgSizeContent = parseInt(imgSize) + ' KB';
		} else {
			imgSize = imgSize / 1024;
			imgSizeContent = Math.ceil(imgSize * 10) / 10 + ' MB';
			if(type == 'nc' && imgSize > 1) {
				overSize = '（限制1M，建议先压缩）';
			}
			if(type == 'cs' && imgSize > 10) {
				overSize = '（限制10M，建议先压缩）';
			}
		}
		resDataInfo['overSize'] = overSize;
		resDataInfo['sizeContent'] = imgSizeContent;
		resDataInfo['path'] = imgOutPath;
		resDataInfo['data'] = imgShowData;
		console.log(11, resDataInfo);
		return resDataInfo;
	} catch (error) {
		console.error('getEmailAttach error', error);
	}
	return null;
}


const sendEmail = async (mailData) => {
	const m = getData('mail');
	const mailConfig = {
		// secure: false,
		auth: {
			user: m['email'],
			pass: m['pwd'],
		}
	}

	const mailService = m.service;
	if(mailService == 'else') {
		mailConfig['host'] = m['host'];
		mailConfig['port'] = m['port'];
	} else {
		mailConfig['service'] = mailService;
	}

	// const mailData2 = {
	// 	from: m['email'],
	// 	to: 'zmqcherish@outlook.com',
	// 	subject: 'testt',
	// 	text: 'test',
	// 	attachments:[
	// 		{
	// 			filename : 'package.jpg',
	// 			path: 'C:\\Users\\zmqch\\AppData\\Roaming\\star-submit\\cs.jpg'
	// 		},
	// 	]
	// }
	mailData['from'] = m['email'];
	mailData['to'] = 'zmqhebetien19830330@gmail.com';

	let res = await ipcRenderer.invoke('send-email', mailConfig, mailData);
	return res;
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


const getNewSize = (imgInfo, maxWidth=800, maxHeight=560, scale=null) => {
	const oldWidth = imgInfo.width;
	const oldHeight = imgInfo.height;
	let newWidth, newHeight;
	if(oldWidth > oldHeight) {
		if(oldWidth > maxWidth) {
			newWidth = scale ? parseInt(oldWidth * scale) : maxWidth;
			newHeight = parseInt(newWidth * oldHeight / oldWidth);
		} else {
			newWidth = oldWidth;
			newHeight = oldHeight;
		}
	} else {
		if(oldHeight > maxHeight) {
			newHeight = scale ? parseInt(oldHeight * scale) : maxHeight;
			newWidth = parseInt(newHeight * oldWidth / oldHeight);
		} else {
			newHeight = oldHeight;
			newWidth = oldWidth;
		}
	}
	return [newWidth, newHeight];
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