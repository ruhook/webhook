VUE_PATH='/www/wwwroot/admin/' # 项目部署的根目录，需要先通过git clone xxx.git admin是项目名称

echo "开始准备构建项目" # 日志打印
cd $VUE_PATH # cd 到项目根目录
echo "拉取git最新代码"
git pull # 拉取代码
echo "npm install 安装最新模块"
# 切换node(暂时不需要)
# nvm use v10.14.1
# install，避免添加了新的模块而找不到依赖
npm install # 安装依赖

echo "删除dist目录下老版本代码"
# 删除原来的代码
rm -rf dist/* # 删除原来编译的dist目录

echo "npm run build构建项目"
# build
npm run build # 构建项目

echo "发布完成"
exit 0;