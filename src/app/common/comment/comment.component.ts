import { Component, OnInit, Input } from '@angular/core';
import {Comment} from '../../models/comment.model';
import {User} from '../../models/user.model';
import { CommentService } from '../../service/comment.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {

  @Input()
  private categoryId: string;
  @Input()
  private editable: boolean;

  private commentsActive: boolean;
  private textField: string;
  private messageSent: boolean;
  private comments: Comment[];
  private currentUser: User;
  private commentId: string;

  constructor(
    private commentService: CommentService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.getCurrentUser()
      .subscribe((user) => {
        this.currentUser = user;
        this.commentsActive = false;
        this.messageSent = false;
        this.textField = '';
        this.commentId = 'new-comment-textarea' + this.categoryId;
        this.getComments();
      });
  }

  getComments(): void {
    this.commentService.getCategoryComments(this.categoryId)
      .subscribe((comments) => {
        this.comments = comments;
      });
  }

  toggleComments(event): void {
    event.stopPropagation();
    this.commentsActive = !this.commentsActive;
    this.messageSent = false;
  };

  createComment(e): void {
    this.commentService.createComment(this.textField, this.currentUser._id, this.categoryId)
      .subscribe((response) => {
        if (response.success) {
          e.stopPropagation();
          this.textField = '';
          this.messageSent = true;
          this.getComments();
        }
      });
    // e.stopPropagation();
    // this.getComments().push(new Comment(new Date().valueOf(), this.textField, this.currentUser, new Date())); // Generate Random Id : DIRTY
    // this.textField = '';
    // this.messageSent = true;
  }

  deleteComment(e): void {
    if (e.event) {
      e.event.stopPropagation();
    }
    if (this.editable) {
      this.commentService.deleteComment(e.commentid)
        .subscribe((response) => {
          if (response.success) {
            this.getComments();
          } else {
            console.log('impossible de modifier ce commentaire');
          }
        });
    }
  }

  focusInput(event) {
    event.stopPropagation();
    event.target.control.click();
  }
}
