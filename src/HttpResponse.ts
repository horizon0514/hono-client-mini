export class HttpResponse implements Response {
    headers: Headers;
    ok: boolean;
    redirected: boolean = false;
    status: number = 0;
    statusText: string = '';
    trailer: Promise<Headers> = Promise.resolve({} as Headers);
    type: ResponseType = 'basic';
    url: string = '';
    body: ReadableStream | any = null;
    bodyUsed: boolean = false;
    bytes: () => Promise<Uint8Array<ArrayBufferLike>> = () =>
      Promise.resolve(new Uint8Array());
    constructor(res: { data: any; statusCode: number; header: Headers }) {
      this.status = res.statusCode;
      this.headers = res.header;
      this.body = res.data;
      this.ok = res.statusCode >= 200 && res.statusCode < 300;
      this.bodyUsed = false;
    }
    /**
     * Copy
     */
    clone(): Response {
      return Object.assign(this);
    }
    arrayBuffer(): Promise<ArrayBuffer> {
      throw new Error('Method not implemented.');
    }
    blob(): Promise<Blob> {
      throw new Error('Method not implemented.');
    }
    formData(): Promise<FormData> {
      return new Promise((resolve, reject) => {
        let data = this.body;
        try {
          if (typeof data === 'string') {
            data = JSON.parse(data);
          }
          const formData = new FormData();
          for (let key in data) {
            formData.append(key, data[key]);
          }
          resolve(formData);
          this.bodyUsed = true;
        } catch (error) {
          reject(error);
        }
      });
    }
    /**
     * to json as promise
     */
    json(): Promise<any> {
      return new Promise((resolve, reject) => {
        try {
          resolve(JSON.parse(this.body));
          this.bodyUsed = true;
        } catch (error) {
          reject(error);
        }
      });
    }
    /**
     * to string as promise
     */
    text(): Promise<string> {
      return new Promise((resolve, reject) => {
        try {
          resolve(this.body);
          this.bodyUsed = true;
        } catch (error) {
          reject(error);
        }
      });
    }
  }
  