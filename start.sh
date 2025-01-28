#!/bin/bash
# 开发模式启动脚本

# 给脚本执行权限
chmod +x start.sh

# 安装依赖
npm install

# 启动开发服务器
npm run electron:dev 