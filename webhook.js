var http = require('http')
var createHandler = require('gitee-webhook-handler')
var handler = createHandler({ path: '/webhook', secret: '123456' })

function run_cmd(cmd, args, callback) {
  var spawn = require('child_process').spawn;
  var child = spawn(cmd, args);
  var resp = "";
  child.stdout.on('data', function (buffer) { resp += buffer.toString(); });
  child.stdout.on('end', function () { callback(resp) });
}

http.createServer(function (req, res) {
  console.log('The server is running at *: 6666')
  handler(req, res, function (err) {
    res.statusCode = 404
    res.end('no such location')
  })
}).listen(6666)

handler.on('error', function (err) {
  console.error('Error:', err.message)
})

handler.on('Push Hook', function (event) {
  let pname = event.payload.repository.name
  console.log('Received a push event for %s to %s', pname, event.payload.ref);
  // pname 是项目名字，和gitee项目名称对应
  console.log(pname, '项目准备构建')
  switch (pname) {
    // admin项目是vue项目
    case 'admin': 
      run_cmd('sh', ['./deploy-admin.sh'], function (text) { console.log(text) });// 需要执>行的脚本位置
      break;
    // server是node项目
    case 'server':
      run_cmd('sh', ['./deploy-server.sh'], function (text) { console.log(text) });// 需要执>行的脚本位置
      break;
  }
})