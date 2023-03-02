const fs = require('fs')

const { contextBridge, ipcRenderer } = require('electron')

const setTitle = (title) => {
	ipcRenderer.send('set-title', title)
}
const getImg = async () => {
	let path = await ipcRenderer.invoke('get-img');
	if(!path) {
		return null;
	}
	let data = fs.readFileSync(path);
	return "data:image/jpg;base64," + data.toString('base64');
}
contextBridge.exposeInMainWorld('electronAPI', {
    setTitle,
	getImg
})