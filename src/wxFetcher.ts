import { HttpResponse } from "./HttpResponse";

// 微信小程序专用的 fetch 实现
export const wxFetch = (
    input: RequestInfo | URL,
    init?: RequestInit
  ): Promise<Response> => {
    return new Promise((resolve, reject) => {
      const url = typeof input === 'string' ? input : input.toString();
      const method = (init?.method || 'GET') as
        | 'GET'
        | 'POST'
        | 'PUT'
        | 'DELETE'
        | 'OPTIONS'
        | 'HEAD'
        | 'TRACE'
        | 'CONNECT';
  
      // 解析请求体
      let data: any;
      if (init?.body) {
        try {
          data =
            typeof init.body === 'string' ? JSON.parse(init.body) : init.body;
        } catch {
          data = init.body;
        }
      }
  
      // 解析请求头
      const headers: Record<string, string> = {};
      if (init?.headers) {
        if (Array.isArray(init.headers)) {
          // 处理 [key, value][] 格式
          init.headers.forEach(([key, value]) => {
            headers[key] = value;
          });
        } else if (typeof init.headers === 'object') {
          Object.assign(headers, init.headers);
        }
      }
  
      wx.request({
        url,
        method,
        data,
        header: headers,
        timeout: 10000,
        success: (res) => {
          // 构造符合 Web API Response 的对象
          const response = new HttpResponse({
            data: JSON.stringify(res.data),
            statusCode: res.statusCode,
            header: res.header as Headers,
          });
          resolve(response as Response);
        },
        fail: (err) => {
          reject(new Error(err.errMsg || 'Request failed'));
        },
      });
    });
  };