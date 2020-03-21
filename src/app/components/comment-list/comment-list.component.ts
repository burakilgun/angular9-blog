import { Component, OnInit } from '@angular/core';
import { CommentService } from 'src/app/services/comment.service';
import { ActivatedRoute } from '@angular/router';
import { Comment } from 'src/app/models/comment';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit {
  comments: Comment[];
  loading:boolean;
  constructor(private commentService: CommentService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loading = true;
    let articleId = Number(this.route.snapshot.paramMap.get("id"));
    this.commentService.getComments(articleId).subscribe(resp=>{
      this.comments = resp;
      this.loading = false;
    })
  }

}
