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
		// 'host': 'smtp.qq.com',
		// 'port': 465
	},
	{
		'k': 'gmail',
		'name': 'GMail',
	},
	{
		'k': 'hotmail',
		'name': 'Outlook',
	},
	{
		'k': '163',
		'name': '163邮箱',
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

const resMaps = {
	"csva": {
		"name": "CSVA",
		"email": "csvastars@163.com",
		"keys": ["title", "nick", "desc", "dateStr", "place", "device", "param"],
		"kvName": {
			"title": "作品标题",
			"nick": "猎光者署名",
			"desc": "猎光者语",
			"dateStr": "拍摄时间",
			"place": "星空打卡地",
			"device": "拍摄器材",
			"param": "拍摄参数"
		}
	},
	"nc": {
		"name": "夜空中国",
		"email": "Steed@Mounstar.com",
		"keys": ["fileName", "nick", "title", "desc", "dateStr", "place", "param2"],
		"kvName": {
			"fileName": "作品文件名",
			"nick": "署名",
			"title": "作品标题",
			"desc": "文字说明",
			"dateStr": "拍摄日期",
			"place": "拍摄地点",
			"param2": "拍摄参数"
		}
	},
	"cs": {
		"name": "中国国家天文",
		"email": "cinastronomy@163.com",
		"keys": ["title", "userName", "device", "param", "place", "dateStr", "desc"],
		"kvName": {
			"title": "作品名称",
			"userName": "作者名字",
			"device": "拍摄器材",
			"param": "拍摄参数",
			"place": "拍摄地点",
			"dateStr": "拍摄日期",
			"desc": "图片说明"
		}
	},
	"apod": {
		"name": "北京天文馆",
		"email": "apod@bjp.org.cn",
		"keys": ["title", "userName", "dateStr", "place", "device", "param", "desc"],
		"kvName": {
			"title": "作品名称",
			"userName": "作者名字",
			"dateStr": "拍摄日期",
			"place": "拍摄地点",
			"device": "拍摄器材",
			"param": "拍摄参数",
			"desc": "图片说明"
		}
	}
}

let attachNameMap = {
	"csva": "",
	"nc": "",
	"cs": "",
	"apod": ""
}

let subjectMap = {
	"csva": "",
	"nc": "",
	"cs": "",
	"apod": ""
}


const getResData = (type, data) => {
	let typeMap = resMaps[type];
	let typeData = [];
	for (const key of typeMap['keys']) {
		typeData.push(`${typeMap['kvName'][key]}： ${data[key]}`);
	}
	return {
		type,
		typeName: typeMap['name'],
		to: typeMap['email'],
		subject: subjectMap[type],
		attachName: attachNameMap[type],
		text: typeData.join('\n')
	}
}

const getInfoRes = (data, userInfo) => {
	// console.log(data);
	const title = data['title'];
	data["nick"] = userInfo["nick"];
	data['userName'] = userInfo["name"];

	data['dateStr'] = formatTime(data['date'])
	data['device'] = data['camera'] + ' + ' + data['lens'];
	const otherDevice = data['otherDevice'] || [];
	if(otherDevice.length > 0) {
		data['device'] = data['device'] + ' + ' + otherDevice.join(' + ')
	}
	let paramArr = [];
	if(data['aperture']) {
		paramArr.push(data['aperture']);
	}
	if(data['shutter']) {
		paramArr.push(data['shutter']);
	}
	if(data['iso']) {
		paramArr.push(`iso ${data['iso']}`);
	}
	if(data['other']) {
		paramArr.push(data['other']);
	}
	if(paramArr.length == 0) {
		return null;	//参数不能都不填
	}
	data['param'] = paramArr.join(", ");

	data['fileName'] = title + "." + data['imgType']
	data['param2'] = data['device'] + '，' + data['param']

	attachNameMap["csva"] = data["nick"] + "-" + data['fileName'];
	attachNameMap["nc"] = data['fileName']
	attachNameMap["cs"] = data['fileName']
	attachNameMap["apod"] = data['userName'] + " - " +  data['fileName']

	subjectMap["csva"] = data["nick"] + "-" + title;
	subjectMap["nc"] = "【作品投稿】- " + title;
	subjectMap["cs"] = subjectMap["nc"];
	subjectMap["apod"] = "“星空之美”影像作品投稿 - " + data['userName'];

	return [getResData('csva', data), getResData('nc', data), getResData('cs', data), getResData('apod', data)];
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
