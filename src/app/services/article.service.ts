import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ArticlePg } from '../models/article-pg';
import { tap } from 'rxjs/operators';
import { Article } from '../models/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  public loading: boolean = true;
  private apiUrl: string = "http://localhost:5000/api/articles";
  constructor(private httpClient: HttpClient) { }

  getArticles(page: number, pageSize: number) {
    let api = `${this.apiUrl}/${page}/${pageSize}`;
    return this.httpClient.get<ArticlePg>(api).pipe(
      tap(x => {
        this.loading = false;
      })
    );
  }

  getArticlesWithCategory(categoryId: number, page: number, pageSize: number) {
    let api = `${this.apiUrl}/GetArticlesWithCategory/${categoryId}/${page}/${pageSize}`;
    return this.httpClient.get<ArticlePg>(api).pipe(
      tap(x => {
        this.loading = false;
      })
    )
  }

  getSearchArticles(searchText: string, page: number, pageSize: number) {
    let api = `${this.apiUrl}/SearchArticles/${searchText}/${page}/${pageSize}`;
    return this.httpClient.get<ArticlePg>(api).pipe(
      tap(x => {
        this.loading = false;
      })
    )
  }

  getArticleById(id: number) {
    let api = `${this.apiUrl}/${id}`;
    return this.httpClient.get<Article>(api).pipe(
      tap(x => {
        this.loading = false;
      })
    );
  }

}