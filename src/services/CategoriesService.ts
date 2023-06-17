import HttpClient from './utils/HttpClient'

interface ICategoriesService {
  httpClient: HttpClient
}

class CategoriesService implements ICategoriesService {
  httpClient: HttpClient

  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001')
  }

  async list() {
    return this.httpClient.get(`/categories`)
  }

  async create(category: any) {
    return this.httpClient.post('/categories', category)
  }
}

export default new CategoriesService()
