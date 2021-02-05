#!/usr/env/bin node

// 导入快速搭建命令号工具
const program = require('commander');

const path = require('path')

// 导入可选指令函数
const OptionHelps = require('./lib/core/help')
const createProjects = require('./lib/core/create')

// 获取到 package.json 对象中的 version 属性 以下两种方式都可
// program.version(require('./package.json').version) 
program.version(require(path.resolve(__dirname, 'package.json')).version)

// 调用可选指令函数
OptionHelps()

/**
 * 创建 create<my-project> 
 * 类式 vue create <my-project>
 */
createProjects()

// 解析 此函数放在最下方解析
program.parse(process.argv)

// 输入 <dest> 中的内容
// console.log(program.opts())