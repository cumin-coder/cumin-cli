const ejs = require('ejs')
const path = require('path')
const fs = require('fs')

// 编译模板
const compiler = (templateName, data) => {
  // 根据用户执行的命令，拿到指定路径的模板，进行渲染创建
  const templateCurrentPath = `../templates/${templateName}`
  const templateAbsolutePath = path.resolve(__dirname, templateCurrentPath)
  // 读取HTML 标签
  return new Promise((resolve, reject) => {
    ejs.renderFile(templateAbsolutePath, { data }, {}, (err, result) => {
      if (err) {
        reject(err)
        return
        }
      resolve(result)
    })
  })
}


// 递归创建不存在的文件
const createNotFileName = (pathName) => {
  if (fs.existsSync(pathName)) {
    return true;
  } else {
    // 找到当前路径的父路径
    if (createNotFileName(path.dirname(pathName))) {
      fs.mkdirSync(pathName)
      return true;
    }
  }
}



// 写入文件夹操作
const writeToFile = (path, result) => {
  // path: 目标文件夹的绝对路径（只支持绝对路径）
    return fs.promises.writeFile(path, result)
}

module.exports = {
  compiler,
  writeToFile,
  createNotFileName
}

