export interface IElectronAPI {
	getImg: () => Promise<void>;
	saveImg: (fileName, srcPath) => Promise<void>;
	getData: (k) => Any;
	setData: (k, v) => void;
	copyText: (data) => void;
	sendEmail: (data) => object;
	getEmailAttach: (type) => string;
	checkDevice: () => boolean;
}

declare global {
	interface Window {
		electronAPI: IElectronAPI;
	}
}
