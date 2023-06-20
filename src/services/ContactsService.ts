import HttpClient from './utils/HttpClient'

interface IContactService {
  httpClient: HttpClient
}

class ContactService implements IContactService {
  httpClient: HttpClient

  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001')
  }

  getAll(orderBy: 'asc' | 'desc' = 'asc') {
    return this.httpClient.get(`/contacts?orderBy=${orderBy}`)
  }

  getById(id: string) {
    return this.httpClient.get(`/contacts/${id}`)
  }

  create(contact: any) {
    return this.httpClient.post('/contacts', {
      body: contact,
    })
  }

  update(id: string, contact: any) {
    return this.httpClient.put(`/contacts/${id}`, {
      body: contact,
    })
  }

  delete = (id: string) => {
    return this.httpClient.delete(`/contacts/${id}`)
  }
}

export default new ContactService()
