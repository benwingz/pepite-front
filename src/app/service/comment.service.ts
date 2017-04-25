import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Observable } from 'rxjs/Rx';
import { Category } from '../models/category.model';
import { Comment } from '../models/comment.model';
import { User } from '../models/user.model';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { AppConfig } from '../app.config';

@Injectable()
export class CommentService {

  constructor(
    private authHttp: AuthHttp,
    private appConf: AppConfig
  ) {
  };

  getCategoryComments(categoryid: string, user?: string): Observable<Comment[]> {
    return this.authHttp.get(this.appConf.apiBaseUrl + 'category/' + categoryid + '/comments', {params: {user: user}}).map((comments) => {
      let commentsReturned = comments.json();
      if (commentsReturned.length > 0) {
        commentsReturned.forEach((commentsJson, index) => {
          commentsReturned[index] = new Comment(
            commentsJson._id,
            new Category(commentsJson._category._id, commentsJson._category.title, commentsJson._category.skills, commentsJson._category.order),
            new User (commentsJson._user._id, commentsJson._user.email, commentsJson._user.lastname, commentsJson._user.firstname, commentsJson._user.type),
            commentsJson.content,
            commentsJson.date
          );
        });
        return commentsReturned;
      } else {
        return [];
      }
    });
  }

  deleteComment(commentid: string): any {
    return this.authHttp.delete(this.appConf.apiBaseUrl + 'comment/' + commentid)
      .map(response => response.json());
  }

  createComment(text: string, userId: string, categoryId: string, userlink?: string): Observable<any> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    var content = new URLSearchParams();
    content.set('category', categoryId);
    content.set('user', userId);
    content.set('content', text);
    content.set('userlink', (userlink)? userlink: userId);
    return this.authHttp.post(this.appConf.apiBaseUrl + 'comment', content.toString(), {headers: headers})
      .map(response => response.json());
  }
}
