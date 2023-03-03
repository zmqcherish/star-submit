function getColor() {
	let colorArr = ['yellow', 'orange', 'red', 'pink', 'mauve', 'purple', 'blue', 'cyan', 'green', 'olive', 'grey',
		'brown'
	];
	return colorArr[Math.floor(Math.random() * colorArr.length)]
}

export {
	// getUuid,
	getColor,
	// showTips,
	// copyText
}
