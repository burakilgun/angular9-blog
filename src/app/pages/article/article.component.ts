import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/models/article';
import { Category } from 'src/app/models/castegory';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  article: Article;
  category: Category;

  constructor(public articleService: ArticleService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.articleService.loading = true;
      let id = Number(params.get("id"));
      this.articleService.getArticleById(id).subscribe(resp => {
        this.article = resp;
        this.category = resp.category;
      });

      this.articleService.articleViewCountUp(id).subscribe();
    });
  }

}
