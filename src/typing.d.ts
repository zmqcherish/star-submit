export interface IElectronAPI {
	getImg: () => Promise<void>;
	getData: (k) => Any;
	setData: (k, v) => void;
}

declare global {
	interface Window {
		electronAPI: IElectronAPI;
	}
}
