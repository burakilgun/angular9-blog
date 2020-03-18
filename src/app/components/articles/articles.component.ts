import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/models/article';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  @Input() page: number;
  @Input() pageSize: number;
  @Input() totalCount: number;
  @Input() articles: Article[];
  @Input() loadingItem: number;
  @Input() typeList: string;
  defaultArticleImage: string = "assets/article-empty.jpg";

  constructor(public articleService: ArticleService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.articleService.loading = true;
  }

  createRange() {
    var items: number[] = [];
    for (var i = 1; i <= this.loadingItem; i++) {
      items.push(i);
    }
    return items;
  }

  pageChanged(event) {
    this.articleService.loading = true;
    this.page = event;

    switch (this.typeList) {
      case "home":
        this.router.navigateByUrl(`/sayfa/${this.page}`);
        break;
      case "category":
        let categoryName = this.route.snapshot.paramMap.get("name");
        let categoryId = this.route.snapshot.paramMap.get("id");
        this.router.navigateByUrl(`/kategori/${categoryName}/${categoryId}/sayfa/${this.page}`);
        break;
      case "search":
        let searchText = this.route.snapshot.queryParamMap.get("s");
        this.router.navigateByUrl(`/arama/sayfa/${this.page}?s=${searchText}`);
        break;
    }
  }

}
