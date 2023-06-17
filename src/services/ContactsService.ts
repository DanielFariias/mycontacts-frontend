import HttpClient from './utils/HttpClient'

interface IContactService {
  httpClient: HttpClient
}

class ContactService implements IContactService {
  httpClient: HttpClient

  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001')
  }

  async list(orderBy: 'asc' | 'desc' = 'asc') {
    return this.httpClient.get(`/contacts?orderBy=${orderBy}`)
  }

  async create(contact: any) {
    return this.httpClient.post('/contacts', contact)
  }
}

export default new ContactService()
