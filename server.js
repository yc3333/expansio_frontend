const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;

// 强制输出日志
console.log(`Starting server on port ${PORT}`);

// 静态文件服务
app.use(express.static(path.join(__dirname, 'build')));

// 健康检查 - 必须在 SPA 路由之前
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// SPA 路由支持 - 使用 '*' 而不是 '/*'，并且放在最后
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server successfully started on port ${PORT}`);
});