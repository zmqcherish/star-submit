const fs = require('fs')
const imginfo = require('imageinfo')
// const sharp = require('sharp');

const { contextBridge, ipcRenderer } = require('electron')





import { testFunc } from './utils/db'















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

const testdb = async () => {
// 	await db.push("/test1","super test");

// // It also create automatically the hierarchy when pushing new data for a DataPath that doesn't exists
// await db.push("/test2/my/test",5);

// // You can also push directly objects
// await db.push("/test3", {test:"test", json: {test:["test"]}});

// // If you don't want to override the data but to merge them
// // The merge is recursive and work with Object and Array.
// await db.push("/test3", {
//     new:"cool",
//     json: {
//         important : 5
//     }
// }, false);
}


contextBridge.exposeInMainWorld('electronAPI', {
	testdb,
	getImg
})