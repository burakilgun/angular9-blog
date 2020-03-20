import { Component, OnInit, ViewChild } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { Article } from 'src/app/models/article';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {
  articles: Article[] = [];
  displayedColumns: string[] = ["picture", "title", "category", "publishDate", "viewCount", "commentCount", "action"];
  dataSource;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private articleService: ArticleService, private router:Router) { }

  ngOnInit(): void {
    this.articleService.getArticlesWithoutPg().subscribe(resp => {
      this.articles = resp;
      this.dataSource = new MatTableDataSource<Article>(resp);
      this.dataSource.paginator = this.paginator;
    })
  }

  deleteArticle(articleId) {
    if(confirm("Silmek istediğine emin misin?")){
      this.articleService.deleteArticle(articleId).subscribe(resp => {
        //this.router.navigateByUrl("/admin/makale/liste");
        let article = this.articles.find(p=> p.id == articleId);
        let index = this.articles.indexOf(article);
        this.articles.splice(index,1);
        this.dataSource = new MatTableDataSource<Article>(this.articles);
        this.dataSource.paginator = this.paginator;
      })
    }
  }

}
