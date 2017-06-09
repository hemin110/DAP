a software 
DAP简介
DAP(data analysis platform)是一款采用开源软件开发的开源数据分析平台，可供个人学习与企业决策提供参考，本平台易于扩展，可以方便的根据实际的业务进行修改定制，具有一定的实用价值
	本软件采用了上海某公司架构师GangTao的开源代码
 
本软件使用flask做服务器，充分利用python的数据分析功能，与机器学习能力，同时采用react.js的组件化开发，使得软件容易开发，易于维护。
	
安装说明
1.	Download本仓库代码到本地文件夹
2.	安装python，以及相关package(建议使用anaconda ,python版本为2.7)其中需要额外下载MySQL与python上mysql的包，安装flask-Bcrypt
3.	安装node.js
4.	进入命令窗，cd到.static 目录下使用
## install node first
## cd package/static
npm install -g babel-cli
npm install babel-preset-es2015 --save
npm install babel-preset-react --save
babel --presets es2015,react --watch js/ --out-dir lib/
5.	上面的命令会将文件编译好并输出至lib文件夹下
6.	同时每次对文件进行修改需要执行如下命令 node r.js -o build.js 将build.js中的js文件压缩至一个文件中，可以提高js的相应速度

开源软件介绍
前端使用react.js ---组件化开发
Select2.js---选择
Bootstrap---UI
JQuery datatables---数据展示
Fileinput---文件上传
Papaparse---解析文件
Echart---可视化
D3—可视化

写到最后
	欢迎各界喜欢玩数据的GEEK加入，对本工程提出建议以改进本软件
383974457@qq.com
