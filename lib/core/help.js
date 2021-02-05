
const program = require('commander')

// OptionHelps()函数
const OptionHelps = () => {

  // 创建属于自己的 --help
  program.option('-d --dest <dest>', 'a destination folder |=> example: /src/components')
  program.option('-c --cumin <cumin>', 'a destination folder |=> example: /src/components')

  /*
    // 监听命令和选项可以执行自定义函数。
    // 在 --help 中创建其他选项
    program.on('--help', () => {
      console.log("") // 空行
      console.log('Outer:')
      console.log('  -d --dest <dest>', '  a destination folder |=> example: /src/components')
      console.log("") // 空行
    })
  */

}

module.exports = OptionHelps