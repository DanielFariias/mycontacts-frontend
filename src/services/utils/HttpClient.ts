import delay from '../../utils/delay'

interface IHttpClient {
  baseURL: string
  get: (path: string) => Promise<any>
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

    throw new Error(
      body?.error || `${response.status} - ${response.statusText}`,
    )
  }
}

export default HttpCLient
