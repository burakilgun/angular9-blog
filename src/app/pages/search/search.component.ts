import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  page: number = 1;
  pageSize: number = 5;
  articles: Article[] = [];
  totalCount: number;
  loadingItem: number = 5;
  ajax;
  searchTerm: string;

  constructor(private articleService: ArticleService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.url.subscribe(params => {

      if (this.ajax != null) this.ajax.unsubscribe();

      this.articleService.loading = true;
      this.articles = [];
      this.totalCount = 0;

      if (this.route.snapshot.paramMap.get("page")) {
        this.page = Number(this.route.snapshot.paramMap.get("page"));
      }

      if (this.route.snapshot.queryParamMap.get("s")) {
        this.searchTerm = this.route.snapshot.queryParamMap.get("s");
      }

      this.ajax = this.articleService.getSearchArticles(this.searchTerm, this.page, this.pageSize).subscribe(resp => {
        this.articles = resp.articles;
        this.totalCount = resp.totalCount;
      })

    });
  }

}
