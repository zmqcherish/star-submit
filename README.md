# 星空图片投稿工具

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

git tag v0.2.3
git push origin --tags
```

### 帮助
1. Github下载速度较慢可以借助[DoGet](https://doget.nocsdn.com/#/)工具
2. electron-download 里模块的安装异常，可以通过设置electron代理解决：
```
npm config set electron_mirror https://npm.taobao.org/mirrors/electron/
```

