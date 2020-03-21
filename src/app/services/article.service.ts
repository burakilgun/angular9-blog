import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ArticlePg } from '../models/article-pg';
import { tap } from 'rxjs/operators';
import { Article } from '../models/article';
import { Archive } from '../models/archive';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  public loading: boolean = true;
  private apiUrl: string = `${environment.baseUrl}/articles`;
  constructor(private httpClient: HttpClient) { }

  getArticlesWithoutPg() {
    return this.httpClient.get<Article[]>(this.apiUrl);
  }

  saveArticlePicture(image) {
    return this.httpClient.post<any>(`${this.apiUrl}/SaveArticlePicture`, image);
  }

  addArticle(article: Article) {
    return this.httpClient.post(`${this.apiUrl}`, article);
  }

  updateArticle(id: number, article: Article) {
    return this.httpClient.put<any>(`${this.apiUrl}/${id}`, article);
  }

  deleteArticle(id: number) {
    return this.httpClient.delete<any>(`${this.apiUrl}/${id}`);
  }

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
    );
  }

  getArticlesByMostView() {
    let api = `${this.apiUrl}/GetArticlesByMostView`;
    return this.httpClient.get<Article[]>(api);
  }

  getArticleById(id: number) {
    let api = `${this.apiUrl}/${id}`;
    return this.httpClient.get<Article>(api).pipe(
      tap(x => {
        this.loading = false;
      })
    );
  }

  getArticlesArchive() {
    let api = `${this.apiUrl}/GetArticlesArchive`;
    return this.httpClient.get<Archive[]>(api);
  }

  getArticlesArchiveList(year: number, month: number, page: number, pageSize: number) {
    let api = `${this.apiUrl}/GetArticleArchiveList/${year}/${month}/${page}/${pageSize}`;
    return this.httpClient.get<ArticlePg>(api).pipe(
      tap(x => {
        this.loading = false;
      })
    );
  }

  articleViewCountUp(id: number) {
    let api = `${this.apiUrl}/ArticleViewCountUp/${id}`;
    return this.httpClient.get(api);
  }

}
