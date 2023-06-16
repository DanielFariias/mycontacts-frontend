interface IAPIError {
  response: Response
  body: any
}

class APIError extends Error implements IAPIError {
  response: Response
  body: any

  constructor(response: Response, body: any) {
    super()

    this.name = 'APIError'
    this.response = response
    this.body = body
    this.message = body?.error || `${response.status} - ${response.statusText}`
  }
}

export default APIError
