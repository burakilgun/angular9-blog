import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/castegory';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl: string = "http://localhost:5000/api/categories";
  categories: Category[];
  constructor(private httpClient: HttpClient) { }

  public getCategories() {
    return this.httpClient.get<Category[]>(this.apiUrl);
  }

  public getCategoryById(categoryId: number) {
    let url = `${this.apiUrl}/${categoryId}`;
    return this.httpClient.get<Category>(url);
  }

}
