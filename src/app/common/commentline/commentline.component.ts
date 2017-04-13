import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import{ Comment } from '../../models/comment.model';
import{ User } from '../../models/user.model';

@Component({
  selector: 'app-commentline',
  templateUrl: './commentline.component.html',
  styleUrls: ['./commentline.component.scss']
})
export class CommentlineComponent implements OnInit {

  @Input() private comment: Comment;
  @Input() private user: User;
  @Input() private editable: boolean;
  @Output() commentEvent = new EventEmitter();



  constructor() { }

  ngOnInit() {
  }

  emitCommentToDelete(event, commentid: string): void {
    if (this.editable) {
      this.commentEvent.emit({
        commentid: commentid,
        event: event
      });
    }
  }

}
