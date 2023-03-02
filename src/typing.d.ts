export interface IElectronAPI {
	getImg: () => Promise<void>;
  }
  
  declare global {
	interface Window {
	  electronAPI: IElectronAPI;
	}
  }