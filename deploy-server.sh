VUE_PATH='/www/wwwroot/server/' # 项目部署的根目录，需要先通过git clone xxx.git server是项目名称

echo "开始准备构建项目"
cd $VUE_PATH # cd 到项目根目录
echo "拉取git最新代码"
git pull # 拉取代码
echo "npm install 安装最新模块"
# 切换node(暂时不需要)
# nvm use v10.14.1
# install，避免添加了新的模块而找不到依赖
npm install # 安装依赖

echo "pm2 重启项目"
# build
pm2 restart server  # pm2 重启项目

echo "发布完成"
exit 0;