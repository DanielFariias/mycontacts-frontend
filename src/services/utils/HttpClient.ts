import delay from '../../utils/delay'

interface IHttpClient {
  baseURL: string
  get: (path: string) => Promise<any>
  post: (path: string, body: any) => Promise<any>
}

class HttpCLient implements IHttpClient {
  baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  async get(path: string) {
    const response = await fetch(`${this.baseURL}${path}`)
    await delay(1000)

    return response.json()
  }

  async post(path: string, body: any) {}
}

export default HttpCLient
