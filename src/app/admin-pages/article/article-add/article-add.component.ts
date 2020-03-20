import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/castegory';
import { ValidationService } from 'src/app/services/validation.service';
import { Router } from '@angular/router';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

@Component({
  selector: 'app-article-add',
  templateUrl: './article-add.component.html',
  styleUrls: ['./article-add.component.scss']
})
export class ArticleAddComponent implements OnInit {
  public editor = DecoupledEditor;

  fileData: File = null;
  uploadFilePath: string;
  articleForm: FormGroup;
  success: boolean;
  loading: boolean;
  info: string;
  categories: Category[];

  constructor(private articleService: ArticleService,
    private categoryService: CategoryService,
    public validationService: ValidationService,
    private router: Router) { }

  public onReady(editor) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );
  }

  ngOnInit(): void {
    this.getCategories();
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
      this.articleService.addArticle(this.articleForm.value).subscribe(
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

  displayCategoryName(category) {
    return category.name;
  }

  get getControls() {
    return this.articleForm.controls;
  }

}
