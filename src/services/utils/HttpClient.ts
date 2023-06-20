import APIError from '../../errors/APIError'
import delay from '../../utils/delay'

interface IOptions {
  method?: string
  body?: any
  headers?: { [key: string]: string }
}

interface IHttpClient {
  baseURL: string
  get?: (path: string, options?: IOptions) => Promise<any>
  post?: (path: string, options?: IOptions) => Promise<any>
  put?: (path: string, options?: IOptions) => Promise<any>
  delete?: (path: string, options?: IOptions) => Promise<any>
}

class HttpCLient implements IHttpClient {
  baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  get(path: string, options?: IOptions) {
    return this.MakeRequest(path, {
      method: 'GET',
      headers: options?.headers,
    })
  }

  post(path: string, options?: IOptions) {
    return this.MakeRequest(path, {
      method: 'POST',
      body: options?.body,
      headers: options?.headers,
    })
  }

  put(path: string, options?: IOptions) {
    return this.MakeRequest(path, {
      method: 'PUT',
      body: options?.body,
      headers: options?.headers,
    })
  }

  delete(path: string, options?: IOptions) {
    return this.MakeRequest(path, {
      method: 'DELETE',
      headers: options?.headers,
    })
  }

  async MakeRequest(path: string, options: IOptions) {
    await delay(1000)
    const headers = new Headers()

    if (options.body) {
      headers.append('Content-Type', 'application/json')
    }

    if (options.headers) {
      Object.entries(options.headers).forEach(([name, value]) => {
        headers.append(name, value)
      })
    }

    const response = await fetch(`${this.baseURL}${path}`, {
      method: options.method,
      body: JSON.stringify(options.body),
      headers,
    })

    const contentType = response.headers.get('Content-Type')

    let responseBody = null
    if (contentType?.includes('application/json')) {
      responseBody = await response.json()
    }

    if (response.ok) {
      return responseBody
    }

    throw new APIError(response, responseBody)
  }
}

export default HttpCLient
