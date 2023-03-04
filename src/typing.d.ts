export interface IElectronAPI {
	getImg: () => Promise<void>;
	testdb: () => void;
}

declare global {
	interface Window {
		electronAPI: IElectronAPI;
	}
}
