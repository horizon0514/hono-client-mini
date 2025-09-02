# hono-client-mini

# hono-client-mini

一个适配微信小程序的 Hono 客户端请求库。

## 特性

- 📱 小程序适配 - 完全适配微信小程序网络请求
- 🔒 类型安全 - 完整的 TypeScript 支持
- ⚡️ 高性能 - 基于 wx.request 实现
- 🛠 可扩展 - 支持自定义请求配置
- 🔄 无缝集成 - 与 Hono 服务端完美配合

## 安装

```bash
pnpm add hono-client-mini
```

## 使用

```ts
import { hc } from 'hono-client-mini'

const client = hc('https://api.example.com')

client.auth.$post({
  username: 'test',
  password: '123456',
}).then((res) => {
  console.log(res.json())
})

```