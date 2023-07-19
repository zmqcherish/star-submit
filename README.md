# 星空图片投稿工具
## 说明
- 此应用为方便星空摄影师进行创作投稿。目前支持的投稿方式为邮件，投稿渠道可选有CSVA、夜空中国、中国国家天文、北京天文馆。
- 此应用也可仅使用文本生成功能，在最后的步骤中复制相关文案后，使用自己常用的邮件客户端进行发送。如有使用疑问可私信咨询。
- 此应用还有更多改进空间，不定期更新。如有bug或其他改进建议，欢迎大家通过最后的联系方式私信指正

## 下载地址
- star-x.x.x.dmg为Mac安装包；star.Setup.x.x.x.exe为Windows安装包
- Github：[点击下载](https://github.com/zmqcherish/star-submit/releases)
- 百度云：[点击下载](https://pan.baidu.com/s/1qr5c1Eu4nI8FcU8730bz8Q?pwd=star)
- 阿里云：[点击下载](https://www.aliyundrive.com/s/S7sKNxBC3mr)
## 免责声明
- 此应用数据保存在本地，不会收集任何用户信息
- 请自行查阅发件箱是否有发件内容已确保邮件投递成功

## 邮箱配置
- 如果需要使用发送邮件功能，需要配置邮箱的发件人和对应邮箱授权码，不同邮箱授权码获取方式不同
1. QQ邮箱：[账号与安全](https://wx.mail.qq.com/account)-> 安全设置 -> 生成授权码。[点击查看详情](https://wx.mail.qq.com/list/readtemplate?name=app_intro.html#/agreement/authorizationCode)
2. 163邮箱：[点击查看详情](https://help.mail.163.com/faq.do?m=list&categoryID=90) -> 如何开启客户端协议？
3. GMail邮箱：较为繁琐不推荐，配置方法见下文
4. 其它邮箱获取方式可自行查阅（文档待更新）
### GMail邮箱配置方法
- 打开Gmail网页版：[https://mail.google.com/](https://mail.google.com/)
- 点击右上角“设置”图标，查看所有设置
- 点击转发和 POP/IMAP 标签页，在“IMAP 访问”部分，选择启用 IMAP
- 点击保存更改
- 开启账号两步验证：[帐号和导入](https://mail.google.com/mail/u/0/#settings/accounts) -> 更改密码恢复选项
- 生成16位应用专用密码：[https://security.google.com/settings/security/apppasswords](https://security.google.com/settings/security/apppasswords)
- 然后可使用邮箱和16位密码进行邮件发送
- [参考1](https://support.google.com/mail/answer/75725?hl=zh-CN) | [参考2](https://blog.csdn.net/bichir/article/details/51506474)


## 本地开发
```
npm install
npm run dev
```

### 发布release版本
```
git add *
git commit -m "***"
git push

git tag vx.x.x
git push origin --tags
```

### 帮助
1. Github下载速度较慢可以借助[DoGet](https://doget.nocsdn.com/#/)工具
2. electron-download 里模块的安装异常，可以通过设置electron代理解决：
```
npm config set electron_mirror https://npm.taobao.org/mirrors/electron/
```

## 关于我
- 风格Pixel成员 | 星联CSVA星空摄影师 ｜ RAW.cn 供稿人 ｜ 视觉中国签约摄影师
- 小红书：[冰山里求生的武装](https://www.xiaohongshu.com/user/profile/5d20bde80000000010013003) ｜ 微博：[甄星cherish](https://weibo.com/zmqcherish) ｜ 微信：cherish_hebe

## 软件截图
![alt 软件截图1](https://s1.ax1x.com/2023/07/18/pCTYwU1.png)
![alt 软件截图2](https://s1.ax1x.com/2023/07/18/pCTY04x.png)
![alt 软件截图3](https://s1.ax1x.com/2023/07/18/pCTYDC6.png)
![alt 软件截图4](https://s1.ax1x.com/2023/07/18/pCTYsgO.png)