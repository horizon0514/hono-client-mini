# hono-client-mini

一个适配微信小程序的 Hono 客户端请求库。

## 特性

- 📱 **小程序适配** - 完全适配微信小程序网络请求
- 🔒 **类型安全** - 完整的 TypeScript 支持
- ⚡️ **高性能** - 基于 wx.request 实现
- 🍪 **Cookie 支持** - 自动处理 Cookie 存储与发送
- 📦 **FormData 支持** - 支持文件上传和表单数据
- 🛠 **可扩展** - 支持自定义请求配置
- 🔄 **无缝集成** - 与 Hono 服务端完美配合

## 安装

```bash
pnpm add hono-client-mini
```

## 使用示例

### 基础用法

```ts
import { hc } from 'hono-client-mini'

const client = hc('https://api.example.com')

// POST 请求
const res = await client.auth.$post({
  json: {
    username: 'test',
    password: '123456',
  }
})
const data = await res.json()
console.log(data)
```

### GET 请求

```ts
// 带查询参数的 GET 请求
const res = await client.users.$get({
  query: {
    page: '1',
    limit: '10'
  }
})
const users = await res.json()
```

### 携带 Cookie

```ts
// Cookie 会自动管理和发送
const client = hc('https://api.example.com', {
  credentials: 'include'
})
```

### 文件上传

```ts
// 使用 FormData 上传文件
const res = await client.upload.$post({
  form: {
    file: wx.chooseImage(/* ... */),
    description: 'My photo'
  }
})
```

## 与 Hono 服务端类型联动

```ts
// 服务端 (Hono)
import { Hono } from 'hono'

const app = new Hono()
  .post('/auth', async (c) => {
    const { username, password } = await c.req.json()
    return c.json({ token: 'xxx', userId: 123 })
  })

export type AppType = typeof app

// 客户端 (小程序)
import { hc } from 'hono-client-mini'
import type { AppType } from './server'

const client = hc<AppType>('https://api.example.com')

// 完整的类型提示和检查 ✨
const res = await client.auth.$post({
  json: { username: 'test', password: '123456' }
})
const data = await res.json() // 类型: { token: string, userId: number }
```

## License

MIT