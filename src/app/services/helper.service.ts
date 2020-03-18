import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  private apiUrl: string = "http://localhost:5000/api/helper";

  constructor(private httpClient: HttpClient) { }

  sendContactEmail(contact: Contact) {
    let api = `${this.apiUrl}/SendContactEmail`;
    return this.httpClient.post(api, contact);
  }
}
