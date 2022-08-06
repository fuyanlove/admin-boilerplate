# Admin Boilerplate

## 初始化

-   `package.json`修改 name 字段为项目标识名

## 静态资源

-   `.env`指定静态资源路径
-   `.github/workflows`指定 oss 路径
-   配置 secrets：`ACCESS_TOKEN`，仓库写+包读取权限
-   配置 secrets：`ACCESSKEY_ID`和`ACCESS_KEY_SECRET`，oss 读写权限

## 私有包

-   `.github/workflows`指定包私有域`@org`
-   `.npmrc`修改`@org`为对应的组织名

## 其它

-   public/index.html 添加统计代码

## 开发

-   `npm install` 安装依赖
-   `npm run serve` 启动本地服务
-   `npm run build` 构建

---

# 项目结构

## 非业务关联配置文件

-   `.husky` 自动检查 hooks
-   `.editorconfig` 编辑器配置
-   `.eslintrc` js 检查配置
-   `.prettierrc` 格式化配置
-   `babel.config.js` babel 编译配置
-   `jsconfig.json` vscode 增强[notes](https://code.visualstudio.com/docs/languages/jsconfig)
-   `package.json` 依赖包说明文件

## 业务关联配置文件

-   `.github` github actions 构建与分发任务
-   `.env.production` 环境配置
-   `.npmrc` 私有包请求域声明
-   `vue.config.js` vue-cli 配置文件（包含 webpack 配置）

## 项目代码

-   `public`
    -   `favicon.ico` 浏览器窗口迷你图标
    -   `index.html` HTML 模板（存在多页面时可配置多个模板以适配不同端），可在此处添加第三方包，统计代码等
-   `src`
    -   `main.js`,`App.vue` 页面入口
    -   `permission.js` 权限逻辑
    -   `settings.js` 全局配置
    -   `router` 路由文件
        -   `index.js` 路由入口（需要根据请求接口重新生成一个动态路由）
        -   `*.js` 模块化路由，根据业务编写路由参数等
    -   `layouts` 布局文件
        -   `default.vue` 默认布局（单左侧边栏+无面包屑+公共头）
    -   `views` 路由对应页
    -   `components` 组件文件
    -   `store` 数据状态
    -   `service` 接口请求
    -   `utils` 工具函数
    -   `assets`
        -   `css` 样式文件
            -   `app.less` 项目根公用样式
            -   `normalize.less` 浏览器重置样式
            -   `var.less` 项目级复用全局变量
        -   `img` 图片文件
            -   `icon` 项目复用 svg 雪碧图，其它按需引用的非用于组件 svg 请不要放在此目录
