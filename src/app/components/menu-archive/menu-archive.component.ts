import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { Archive } from 'src/app/models/archive';

@Component({
  selector: 'app-menu-archive',
  templateUrl: './menu-archive.component.html',
  styleUrls: ['./menu-archive.component.scss']
})
export class MenuArchiveComponent implements OnInit {
  archives: Archive[] = [];
  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
    this.articleService.getArticlesArchive().subscribe(
      resp => {
        this.archives = resp;
      },
      error => {
        console.log("Bir hata oluştu :" + error);
      }
    );
  }

}
