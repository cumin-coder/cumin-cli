/**
 * 执行终端命令相关代码
 */

// Spawn 会衍生子进程，且不会阻塞 Node.js 事件循环
const { spawn } = require('child_process')

const execCommand = (...args) => {
  return new Promise((resolve, reject) => {
    // `sqawn()函数` 本质上会开启一个进程，并返回一个 子进程（childProcess）
    const childProcess = spawn(...args)
    /**
     * 在执行 `npm install` 的时候终端会打印很多信息（默认是不会打印的）
     * `childProcess`进程就是帮我们自动执行 `npm install` 的，所以我们希望在执行`chindProcess`进程中，
     * 打印执行过程中的信息（在执行命令过程中，进程会打印很多的信息）
     * 为了让它在执行过程中能显示很多打印信息我们可以这样做：
     */

    /**
     * `stdout` : 标准输出流
     * `stderr` : 标准错误流
     * `stdout`中返回一个 `pipe` 函数，简称`管道`
     * 这两个标准流是存在于 `childProcess` 进程中的，接下来我们可以这样使用它
     */

    /**
     * `process` 对象是一个全局变量，提供了有关当前 `Node.js` 进程的信息并对其进行控制。 
     * 作为全局变量，它始终可供 `Node.js` 应用程序使用，无需使用 `require()`。 它也可以使用 `require()` 显式地访问。
     */

    // 执行过程中能显示很多打印信息
    childProcess.stdout.pipe(process.stdout)
    childProcess.stderr.pipe(process.stderr)

    /**
     * `npm install` 是处于一个阻塞的状态的，执行完毕后，我们接下来要执行 `npm run serve` 
     * 为了可以让终端自动 npm install 完毕后执行 npm run serve，我们该这样做：
     */
    childProcess.on('close', () => {
      resolve('npm install execution')
    })
  })
  
}

module.exports = {
  execCommand
}