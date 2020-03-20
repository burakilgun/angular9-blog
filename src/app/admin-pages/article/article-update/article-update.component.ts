import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';
import { ValidationService } from 'src/app/services/validation.service';
import { CategoryService } from 'src/app/services/category.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { Category } from 'src/app/models/castegory';
import { Article } from 'src/app/models/article';

@Component({
  selector: 'app-article-update',
  templateUrl: './article-update.component.html',
  styleUrls: ['./article-update.component.scss']
})
export class ArticleUpdateComponent implements OnInit {
  public editor = DecoupledEditor;

  fileData: File = null;
  uploadFilePath: string;
  articleForm: FormGroup;
  success: boolean;
  loading: boolean;
  isDataLoad:boolean = false;
  info: string;
  categories: Category[];
  articleId: number;
  article: Article;

  constructor(private articleService: ArticleService,
    private categoryService: CategoryService,
    public validationService: ValidationService,
    private router: Router,
    private route: ActivatedRoute) { }

  public onReady(editor) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );
  }

  ngOnInit(): void {
    this.getCategories();

    this.articleId = Number(this.route.snapshot.paramMap.get("id"));
    this.articleService.getArticleById(this.articleId).subscribe(resp => {
      this.uploadFilePath = resp.picture;
      this.article = resp;
      this.setValues(resp);
      this.isDataLoad = true;
    });


    this.articleForm = new FormGroup({
      title: new FormControl("", Validators.required),
      contentSummary: new FormControl("", Validators.required),
      contentMain: new FormControl("", Validators.required),
      category: new FormControl("", Validators.required),
      picture: new FormControl("")
    })
  }

  onSubmit() {
    if (this.articleForm.valid) {
      this.loading = true;
      this.articleService.updateArticle(this.articleId,this.articleForm.value).subscribe(
        resp => {
          this.success = true;
          this.router.navigateByUrl("/admin/makale/liste");
        },
        error => {
          this.success = false;
          this.info = "Bir hata oluştu.";
        });
    } else {
      return false;
    }
  }

  upload(event) {
    this.fileData = event.target.files[0];
    let formData = new FormData();
    formData.append("picture", this.fileData);
    this.articleService.saveArticlePicture(formData).subscribe(resp => {
      this.uploadFilePath = resp.path;
      this.articleForm.controls.picture.setValue(this.uploadFilePath);
    });
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(resp => {
      this.categories = resp;
    })
  }

  setValues(resp) {
    this.getControls.title.setValue(resp.title);
    this.getControls.contentSummary.setValue(resp.contentSummary);
    this.getControls.contentMain.setValue(resp.contentMain);
    this.getControls.category.setValue(resp.category);
    this.getControls.picture.setValue(resp.picture);
  }

  displayCategoryName(category) {
    return category.name;
  }

  get getControls() {
    return this.articleForm.controls;
  }

}
