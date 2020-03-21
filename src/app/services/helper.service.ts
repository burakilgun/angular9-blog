import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from '../models/contact';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  private apiUrl: string = `${environment.baseUrl}/helper`;

  constructor(private httpClient: HttpClient) { }

  sendContactEmail(contact: Contact) {
    let api = `${this.apiUrl}/SendContactEmail`;
    return this.httpClient.post(api, contact);
  }
}
