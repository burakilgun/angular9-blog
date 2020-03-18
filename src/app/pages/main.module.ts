import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ComponentsModule } from '../components/components.module';
import { AppRoutingModule } from '../app-routing.module';


import { HomeComponent } from './home/home.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { ContactComponent } from './contact/contact.component';
import { MainNavComponent } from '../nav/main-nav/main-nav.component';
import { MainLayoutComponent } from '../layout/main-layout/main-layout.component';
import { ArticleComponent } from './article/article.component';
import { CategoryArticlesComponent } from './category-articles/category-articles.component';
import { SearchComponent } from './search/search.component';


@NgModule({
  declarations: [
    HomeComponent,
    AboutMeComponent,
    ContactComponent,
    MainNavComponent,
    MainLayoutComponent,
    ArticleComponent,
    CategoryArticlesComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ComponentsModule
  ]
})
export class MainModule { }
