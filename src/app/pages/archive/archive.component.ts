import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {
  page: number = 1;
  pageSize: number = 5;
  articles: Article[] = [];
  totalCount: number;
  loadingItem: number = 5;
  ajax;

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

      let year = Number(params.get("year"));
      let month = Number(params.get("month"));

      this.ajax = this.articleService.getArticlesArchiveList(year, month, this.page, this.pageSize).subscribe(resp => {
        this.totalCount = resp.totalCount;
        this.articles = resp.articles;
      })
    });
  }

}
