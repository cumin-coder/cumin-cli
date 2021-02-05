
const program = require('commander')

// 导入
const {
  createProjectAction,
  createVueComponentTemplateAction,
  createPageComponentTemplateAction,
  createStoreComponentTemplateAction
} = require('./action')

const createProjects = () => {
  program
    /**
     * 自定义的命令 create 
     * 项目名称 <project>
     * 紧跟项目名称后面的值 [others...]
     * cumin create my-cuminProject abc cba
     */
    .command('create <project> [others...]')
    // 描述
    .description('clone a respsitory into a folder') // 译：将存储库克隆到文件夹中
    /**
     * project: 项目名称
     * outher: 返回一个数组 紧跟项目名称后面所有的内容都会被拼进这个数据中并返回 (这个参数不常用)
     */
    .action(createProjectAction)


  // 1. 创建vue组件模板
  program
    .command('cVue <project> [others...]')
    .description('create a VUE component template')
    .action((filename) => {
      createVueComponentTemplateAction(filename, program.opts().dest || 'src/components')
    })

  program
    .command('cPage <project> [others...]')
    .description('create a PAGE template')
    .action((filename) => {
      createPageComponentTemplateAction(filename, program.opts().dest || `src/pages`)
    })


  program
    .command('cStore <project> [others...]')
    .description('create a STORE template')
    .action((filename) => {
      createStoreComponentTemplateAction(filename, program.opts().dest || 'src/store/modules')
    })

  /**
   * 1. 创建vue组件模板
   * cumin cVue <project>
   * 
   * 2. 创建router路由模板
   * cumin cRouter <project>
   * 
   * 3. 创建vuex状态管理模板
   * cumin cVuex <project>
   * 
   */
}

module.exports = createProjects