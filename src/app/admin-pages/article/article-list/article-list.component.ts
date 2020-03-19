import { Component, OnInit, ViewChild } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { Article } from 'src/app/models/article';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {
  articles: Article[] = [];
  displayedColumns: string[] = ["picture", "title", "category", "publishDate", "viewCount", "commentCount"];
  dataSource;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
    this.articleService.getArticlesWithoutPg().subscribe(resp => {
      this.articles = resp;
      this.dataSource = new MatTableDataSource<Article>(resp);
      this.dataSource.paginator = this.paginator;
    })
  }

}
