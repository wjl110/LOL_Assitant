# LOL 对战分析助手

基于 React + Electron 的英雄联盟对战分析工具，提供实时对局分析、对位推荐、数据可视化等功能。

## 技术栈

- 前端框架：React 18 + TypeScript
- 桌面框架：Electron 25
- 数据可视化：Ant Design Charts + D3.js
- 后端服务：Node.js + Express（内置）
- 数据存储：IndexedDB（本地）+ SQLite（数据分析）
- 游戏数据接口：Riot API + DDragon API
- AI分析引擎：TensorFlow.js（集成）

## 主要功能

1. 对局分析
   - 实时对局数据获取
   - 胜负因素分析
   - 关键数据可视化

2. 对位推荐
   - 英雄克制关系分析
   - 智能英雄推荐
   - 胜率统计

3. 数据趋势
   - 月度/年度数据统计
   - 个人战绩分析
   - 进步趋势追踪

## 开发指南

### 环境配置

1. 安装依赖

bash
npm install

2. 开发模式
bash
npm run dev
3. 打包应用
bash
npm run build

# MAC
## 1. 安装 Node.js (如果还没安装)
brew install node

# 2. 安装项目依赖
npm install

## 3. 开发模式运行
npm run electron:dev

## 4. 打包 Mac 应用
npm run electron:build

^Mac 上的调试提示：
使用 Command + Option + I 打开开发者工具
使用 Command + R 刷新应用
使用 Activity Monitor 监控应用性能
确保已安装 Node.js 和 npm
在终端中进入项目目录
运行 chmod +x start.sh 给启动脚本执行权限
运行 ./start.sh 启动应用

### 项目结构
src/
├── main/ # Electron 主进程
├── renderer/ # React 渲染进程
├── shared/ # 共享代码
└── types/ # TypeScript 类型定义


## API 密钥配置

在开始使用之前，需要配置 Riot Games API 密钥：

1. 访问 Riot Developer Portal 注册开发者账号
2. 创建新的应用并获取 API 密钥
3. 在 `.env` 文件中配置密钥

## 贡献指南

1. Fork 项目
2. 创建特性分支
3. 提交变更
4. 发起 Pull Request

## 许可证

MIT License

# 鸣谢
![](github.com/wjl110)