// const constKey = {
// }

// const getColor = () => {
// 	let colorArr = ['yellow', 'orange', 'red', 'pink', 'mauve', 'purple', 'blue', 'cyan', 'green', 'olive', 'grey',
// 		'brown'
// 	];
// 	return colorArr[Math.floor(Math.random() * colorArr.length)]
// }

const uuid = () => {
	let d = new Date().getTime();
	let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		let r = (d + Math.random() * 16) % 16 | 0;
		d = Math.floor(d / 16);
		return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
	});
	return uuid;
}


export {
	uuid,
	// getColor,
	// showTips,
	// copyText
}