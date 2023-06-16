import HttpClient from './utils/HttpClient'

interface IContactService {
  httpClient: HttpClient
}

class ContactService implements IContactService {
  httpClient: HttpClient

  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001')
  }

  async listContacts(orderBy: 'asc' | 'desc' = 'asc') {
    return this.httpClient.get(`/contacsts?orderBy=${orderBy}`)
  }

  async createContact(contact: any) {
    return this.httpClient.post('/contacts', contact)
  }
}

export default new ContactService()
