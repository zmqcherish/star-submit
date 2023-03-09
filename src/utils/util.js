const formatTime = (d) => {
	let t = new Date(d);
	const year = t.getFullYear() + '年';
	const month = t.getMonth() + 1 + '月';
	const date = t.getDate() + '日';
	return [year, month, date].join('');
}

const mailHosts = [
	{
		'k': 'qq',
		'name': 'QQ邮箱',
		'host': 'smtp.qq.com',
		'port': 456
	},
	{
		'k': 'else',
		'name': '其它',
		'host': '',
		'port': null
	}
]

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

const csvaKey = ["title", "name", "desc", "date", "place", "device", "param"];
const csvaName = [
	{
		"title": "作品标题",
		"name": "猎光者署名",
		"desc": "猎光者语",
		"date": "拍摄日期",
		"place": "拍摄地点",
		"device": "拍摄设备",
		"param": "拍摄参数"
	},
]

const getInfoRes = (data) => {
	console.log(data);
	data['device'] = data['camera'] + ' + ' + data['lens'];
	let other = data['other'] ? `, ${data['other']}` : '';
	data['param'] = `${data['aperture']}, ${data['shutter']}, iso ${data['iso']}${other}`;
	let csvaData = [];
	for (const key of csvaKey) {
		csvaData.push(`${csvaName[key]}: ${data[key]}`);
	}
	console.log(csvaData.join('\n'));
	return csvaData.join('\n');
}

const getRule = (msg='不能为空') => {
	return {
		required: true,
		trigger: ["blur"],
		message: msg
	}
}

export {
	uuid,getRule,
	getInfoRes,
	formatTime,
	mailHosts
}
