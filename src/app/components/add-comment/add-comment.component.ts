import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommentService } from 'src/app/services/comment.service';
import { ActivatedRoute } from '@angular/router';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit {
  commentForm: FormGroup;
  success: boolean;
  info: string;

  constructor(public commentService: CommentService,
    private route: ActivatedRoute,
    public validationService: ValidationService) { }

  ngOnInit(): void {
    this.commentForm = new FormGroup({
      name: new FormControl("", Validators.required),
      contentMain: new FormControl("", Validators.required),
      articleId: new FormControl(""),
    })
  }

  onSubmit() {
    if (this.commentForm.valid) {
      let articleId = Number(this.route.snapshot.paramMap.get("id"));
      this.commentForm.controls.articleId.setValue(articleId);
      this.commentService.addComment(this.commentForm.value).subscribe(resp => {
        this.success = true;
        this.info = "Yorumunuz başarıyla eklenmiştir.";
      }, error => {
        this.success = false;
        this.info = "Bir hata meydana geldi, lütfen daha sonra tekrar deneyiniz.";
      });
    }
  }

  get getControls() {
    return this.commentForm.controls;
  }
}
