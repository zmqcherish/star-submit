const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    electronBuilder: {
      // nodeIntegration: true,
      preload: 'src/preload.js',
      builderOptions: {
        productName: "star", // 项目名，也是生成exe文件的前缀名
        appId: "star-v1.0.8", // 包名
        copyright: "@cherish", // 版权信息
        compression: "store", // "store" | "normal" | "maximum" 打包压缩情况(store 相对较快)，store 39749kb, maximum 39186kb
        directories: {
          output: "dist_electron" // 输出文件夹
        },
        asar: true, // asar打包
        win: {
          icon: "build/icons/icon.ico", // 图标路径
          target: [
            {
              target: "nsis", // 安装应用
              arch: [
                // ia32 | x64 | armv7l | arm64
                "ia32", // 即–arch=ia32， 32位操作系统，也可以在64位操作系统中安装
                "x64" // 即–arch=x64， 64位操作系统，使用本架构打包无法再32位操作系统中安装
              ]
            }
          ]
        },
        mac: {
          icon: "build/icons/icon.icns",
          target: [
            {
              target: "dmg"
            }
          ]
        },
        nsis: {
          oneClick: false, // 一键安装
          // "guid": "xxxx", //注册表名字，不推荐修改
          perMachine: false, // 是否开启安装时权限限制（此电脑或当前用户）
          allowElevation: true, // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
          allowToChangeInstallationDirectory: true, // 允许修改安装目录
          installerIcon: "build/icons/icon.ico", // 安装图标
          uninstallerIcon: "build/icons/icon.ico", //卸载图标
          installerHeaderIcon: "build/icons/icon.ico", // 安装时头部图标
          createDesktopShortcut: true, // 创建桌面图标
          createStartMenuShortcut: true, // 创建开始菜单图标
          shortcutName: "" // 图标名称
        }
      }
    }
  }
})
