import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Comment } from '../models/comment';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl: string = `${environment.baseUrl}/comments`;
  loading: boolean;
  constructor(private httpClient: HttpClient) { }

  addComment(comment: Comment) {
    this.loading = true;
    return this.httpClient.post<Comment>(this.apiUrl, comment).pipe(tap(p => {
      this.loading = false;
    }));
  }

  getComments(articleId: number) {
    this.loading = true;
    return this.httpClient.get<Comment[]>(`${this.apiUrl}/${articleId}`).pipe(tap(p=>{
      this.loading = false;
    }));
  }
}
