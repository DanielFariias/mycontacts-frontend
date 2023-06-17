import APIError from '../../errors/APIError'
import delay from '../../utils/delay'

interface IHttpClient {
  baseURL: string
  get?: (path: string) => Promise<any>
  post?: (path: string, body: any) => Promise<any>
}

class HttpCLient implements IHttpClient {
  baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  async get(path: string) {
    await delay(1000)

    const response = await fetch(`${this.baseURL}${path}`)

    const contentType = response.headers.get('Content-Type')

    let body = null
    if (contentType?.includes('application/json')) {
      body = await response.json()
    }

    if (response.ok) {
      return body
    }

    throw new APIError(response, body)
  }

  async post(path: string, body: any) {
    await delay(1000)

    const headers = new Headers({
      'Content-Type': 'application/json',
    })

    const response = await fetch(`${this.baseURL}${path}`, {
      method: 'POST',
      body: JSON.stringify(body),
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
