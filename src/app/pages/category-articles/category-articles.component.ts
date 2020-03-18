import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/models/article';

@Component({
  selector: 'app-category-articles',
  templateUrl: './category-articles.component.html',
  styleUrls: ['./category-articles.component.scss']
})
export class CategoryArticlesComponent implements OnInit {
  page: number = 1;
  pageSize: number = 5;
  articles: Article[] = [];
  totalCount: number;
  loadingItem: number = 5;
  ajax;
  categoryId: number;

  constructor(private articleService: ArticleService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (this.ajax) {
        this.ajax.unsubscribe();
      }

      this.articleService.loading = true;
      this.articles = [];
      this.totalCount = 0;

      if (params.get("page")) {
        this.page = Number(params.get("page"));
      }

      if (params.get("id")) {
        this.categoryId = Number(params.get("id"));
      }

      this.ajax = this.articleService.getArticlesWithCategory(this.categoryId, this.page, this.pageSize).subscribe(resp => {
        this.articles = resp.articles;
        this.totalCount = resp.totalCount;
      })

    });
  }

}
