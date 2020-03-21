import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuCategoryComponent } from './menu-category/menu-category.component';
import { AppRoutingModule } from '../app-routing.module';
import { PageTitleComponent } from './page-title/page-title.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ArticlesComponent } from './articles/articles.component';
import { BrowserModule } from '@angular/platform-browser';
import { UrlFormatPipe } from '../pipes/url-format.pipe';
import { MenuArticleMostViewComponent } from './menu-article-most-view/menu-article-most-view.component';
import { MenuArchiveComponent } from './menu-archive/menu-archive.component';
import { AddCommentComponent } from './add-comment/add-comment.component';
import { MaterialModule } from '../modules/material/material.module';
import { CommentListComponent } from './comment-list/comment-list.component';

@NgModule({
  declarations: [
    MenuCategoryComponent,
    PageTitleComponent,
    ArticlesComponent,
    UrlFormatPipe,
    MenuArticleMostViewComponent,
    MenuArchiveComponent,
    AddCommentComponent,
    CommentListComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    NgxPaginationModule,
    MaterialModule
  ],
  exports: [
    MenuCategoryComponent,
    MenuArticleMostViewComponent,
    MenuArchiveComponent,
    PageTitleComponent,
    ArticlesComponent,
    AddCommentComponent,
    CommentListComponent,
    UrlFormatPipe
  ]
})
export class ComponentsModule { }
