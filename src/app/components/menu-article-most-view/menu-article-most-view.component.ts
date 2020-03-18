import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { Article } from 'src/app/models/article';

@Component({
  selector: 'app-menu-article-most-view',
  templateUrl: './menu-article-most-view.component.html',
  styleUrls: ['./menu-article-most-view.component.scss']
})
export class MenuArticleMostViewComponent implements OnInit {
  articles: Article[] = [];
  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
    this.articleService.getArticlesByMostView().subscribe(resp=>{
      this.articles = resp;
    })
  }

}
