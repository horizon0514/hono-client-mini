declare module '@zlyboy/wx-formdata' {
  export default class FormData {
    append(name: string, value: any, fileName?: string): void
    set(name: string, value: any, fileName?: string): void
    has(name: string): boolean
    delete(name: string): void
    get(name: string): any
    getAll(name: string): any[]
    forEach(callback: (value: any, name: string, formData: FormData) => void): void
    keys(): IterableIterator<string>
    values(): IterableIterator<any>
    entries(): IterableIterator<[string, any]>
  }
}

declare module 'wx' {
  export interface RequestOptions {
    data: any
    header: Record<string, string>
    method: string
    url: string
  }

  export interface RequestResponse {
    data: any
    statusCode: number
    header: Record<string, string>
  }

  export function request(options: RequestOptions): Promise<RequestResponse>
}