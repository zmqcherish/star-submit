'use strict'
const path = require('path')
import { app, protocol, BrowserWindow, ipcMain, dialog, Menu } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import { createTransport } from 'nodemailer'

const electronStore = require('electron-store');
electronStore.initRenderer();
// import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
	{ scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow() {
	// Create the browser window.
	const win = new BrowserWindow({
		width: 1200,
		height: 880,
		resizable: false,
		webPreferences: {
			spellcheck: false,	//关闭拼写检查
			// Use pluginOptions.nodeIntegration, leave this alone
			// See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
			nodeIntegration: (process.env
				.ELECTRON_NODE_INTEGRATION as unknown) as boolean,
			contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
			preload: path.resolve(__dirname, './preload.js')
		}
	})

	Menu.setApplicationMenu(null);

	// nativeTheme.themeSource = 'dark';

	if (process.env.WEBPACK_DEV_SERVER_URL) {
		// Load the url of the dev server if in development mode
		await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string)
		if (!process.env.IS_TEST) win.webContents.openDevTools()	//开发面板
	} else {
		createProtocol('app')
		// Load the index.html when not in development
		win.loadURL('app://./index.html')
	}
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
	// On macOS it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
	//   if (isDevelopment && !process.env.IS_TEST) {
	//     // Install Vue Devtools
	//     try {
	//       await installExtension(VUEJS3_DEVTOOLS)
	//     } catch (e) {
	//       console.error('Vue Devtools failed to install:', e.toString())
	//     }
	//   }
	createWindow()
})


// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
	if (process.platform === 'win32') {
		process.on('message', (data) => {
			if (data === 'graceful-exit') {
				app.quit()
			}
		})
	} else {
		process.on('SIGTERM', () => {
			app.quit()
		})
	}
}

ipcMain.handle('send-email', async (event, mailConfig, mailData) => {
	const transporter = createTransport(mailConfig)
	try {
		// console.log(111, mailData);
		let sendRes = await transporter.sendMail(mailData)
		console.log('send mail success', sendRes);
		return {status: true};
	} catch (err) {
		console.log('send mail fail', err);
		return {status: false, msg: err};
	}
})


ipcMain.handle('get-img', async (event) => {
	let file = dialog.showOpenDialogSync({
		title: '请选择图片',
		buttonLabel: '确定',
		// defaultPath:,
		properties: ['openFile'],
		filters: [{
			name: 'img',
			extensions: ['jpg', 'png']
		}],
	})
	if (file) {
		return file[0];
	}
})

ipcMain.handle('save-img', async (event, fileName) => {
	let res = dialog.showSaveDialogSync({
		title: '保存图片',
		defaultPath: fileName
	})
	return res;
})

ipcMain.handle('get-tmp-path', async (event) => {
	return app.getPath('userData');
})

