

const { promisify } = require('util')
const download = promisify(require('download-git-repo'))

const path = require('path')

const { compiler, writeToFile, createNotFileName } = require('../util/utils')

// clone path
const { vueRepo } = require('../config/repo-config')

// auto Execution npm install
const { execCommand } = require('../util/terminal')

// callback -> promisify(callback) -> promise -> async await
const createProjectAction = async (project) => {
  console.log('In the process of cloning...')

  // 1. clone 克隆项目
  /**
   * vueRepo: 克隆地址
   * project: 项目名称
   * { clone: true }: 克隆整个项目
   * callback: 回到函数
   */
  await download(vueRepo, project, { clone: true })

  // 2. 执行 npm install

  /**
   * 
   * 其实在我们执行npm的时候，系统会默认帮我们执行npm.cmd的
   * 注意在`execCommand`的第一个参数中，在`Mac\linux`操作系统中执行没问题，是因为`Mac\linux`操作系统会默认自动帮我们调用 `npm.cmd`
   * 但是在 window 操作系统中会报错的，这是因为 window 操作系统 默认不会帮我们调用 `npm.cmd`
   * 解决：
   */

  //  兼容 window 操作系统
  let exec = process.platform === 'win32' ? 'npm.cmd' : 'npm'
  await execCommand(exec, ['install'], { cwd: `./${project}` })

  // 3. 执行 npm run serve
  execCommand(exec, ['run', 'serve'], { cwd: `./${project}` })

  // 4. 打开浏览器
  //  在下载模板中的 package.json 中加上了 "--open" 
  //  "serve": "vue-cli-service serve --open",
}

// create VUE component template
const createVueComponentTemplateAction = async (project, filepath) => {
  // 编译 ejs 模板
  const result = await compiler('vue-template.vue.ejs', { name: project, lowerName: project.toLowerCase() })

  // 将 result 写入 .vue 文件中
  const targetPath = path.resolve(filepath, `${project}.vue`)
  // write in file
  await writeToFile(targetPath, result)
}

// create Pages edit file
const createPageComponentTemplateAction = async (project, filepath) => {

  // 编译 ejs 模板
  const vueTemplate = await compiler('vue-template.vue.ejs', { name: project, lowerName: project.toLowerCase() })
  const routerTemplate = await compiler('vue-router.js.ejs', { name: project, lowerName: project.toLowerCase() })

  // 写入文件
  // 将 result 写入 .vue 文件中
  const lastPath = path.resolve(filepath,project)
  if (createNotFileName(lastPath)) {
    const targetPath = path.resolve(lastPath, `${project}.vue`)
    const routerPath = path.resolve(lastPath, 'router.js')
    writeToFile(targetPath, vueTemplate)
    writeToFile(routerPath, routerTemplate)
  }
}

//create store edit file
const createStoreComponentTemplateAction = async (project, filepath) => {
  // 返回 store 模板
  const storeResult = await compiler('../templates/vue-store.js.ejs')
  const storeTypeResult = await compiler('../templates/vue-store-types.js.ejs')

  const lastPath = path.resolve(filepath, project)
  if (createNotFileName(lastPath)) {
    const storePath = path.resolve(filepath, `${project}/index.js`)
    const storeTypePath = path.resolve(filepath, `${project}/types.js`)

    writeToFile(storePath, storeResult)
    writeToFile(storeTypePath, storeTypeResult)
  }
}

module.exports = {
  createProjectAction,
  createVueComponentTemplateAction,
  createPageComponentTemplateAction,
  createStoreComponentTemplateAction
}