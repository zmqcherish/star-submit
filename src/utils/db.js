const Store = require('electron-store');
const store = new Store();

const getStoreVal = (k) => {
	return store.get(k);
}

const setStoreVal = (k, v) => {
	store.set(k, v);
}

// const getCameras = () => {
// 	return getVal('camera') || [];
// }

// const setCameras = (data) => {
// 	return setVal('camera', data)
// }


export { getStoreVal, setStoreVal }