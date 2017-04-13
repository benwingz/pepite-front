/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { NgModel, FormsModule } from '@angular/forms';

import { User } from '../../model/user';
import { Profile } from '../../model/profile';
import { Comment } from '../../model/comment';
import { CommentLink } from '../../model/commentlink';
import { Skill } from '../skill/skill';
import { SkillLink } from '../../model/skilllink';

import { CommentlineComponentStub } from '../../../../stubs/commentline.component.stub';

import { ProfileProvider } from '../../service/common/profile/profile-provider.service';
import { UserProvider } from '../../service/common/user/user-provider.service';

import { CommentComponent } from './comment.component';

describe('CommentComponent', () => {
  let component: CommentComponent;
  let fixture: ComponentFixture<CommentComponent>;
  let de:      DebugElement;
  let el:      HTMLElement;

  let userProviderStub = {
    getCurrentUser: () => { return new User(1, 'toto', 'tata'); }
  };

  let profileStub = new Profile (new User(1, 'lastnameTest1', 'firstnameTest1'),
      [
        new SkillLink (new Skill(1, 'skill 1'), []),
        new SkillLink(new Skill(2, 'skill 2'), [])
      ],
      [
        new CommentLink([
          new Comment(1, 'test message', new User(1, 'toto', 'tata'), new Date()),
          new Comment(2, 'test message 2', new User(1, 'toto', 'tata'), new Date()),
          new Comment(3, 'test message 3', new User(1, 'toto', 'tata'), new Date())
          ], 1)
      ]
    );
  let profileProviderStub = {
    getCurrentProfile: () => { return profileStub; }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CommentComponent,
        CommentlineComponentStub
      ],
      providers: [
        {
          provide: UserProvider,
          useValue: userProviderStub
        },
        {
          provide: ProfileProvider,
          useValue: profileProviderStub
        }
      ],
      imports: [
        FormsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(CommentComponent);
    component = fixture.componentInstance;
    component.categoryId = 1;
    fixture.detectChanges();

  });

  it('should display comments when container is displayable', () => {
    component.commentsActive = true;
    fixture.detectChanges();

    de = fixture.debugElement.query(By.css('app-commentline'));
    el = de.nativeElement;

    expect(el).toBeDefined();
  });

  it('should not display comments when container is not displayable', () => {
    component.commentsActive = false;
    fixture.detectChanges();

    de = fixture.debugElement.query(By.css('app-commentline'));
    expect(de).toBeNull();
  });


  it('should not display comments when container is  displayable but without comments', () => {
    component.categoryId = 2;
    component.commentsActive = true;
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('app-commentline'));
    expect(de).toBeNull();
  });

  it('should create a comment', () => {
    component.commentsActive = true;
    component.editable = true;
    fixture.detectChanges();
    let I = fixture.debugElement.query(By.css('#category__comments-create-comment'));
    let event = {
      stopPropagation: () => { return true; }
    };
    component.textField = 'Coucou ! ';
    let tempo = component.textField;
    fixture.detectChanges();
    I.triggerEventHandler('click', event);
    fixture.detectChanges();
    expect(component.getComments()[component.getComments().length - 1].message).toBe(tempo);
    expect(component.textField).toBe('');
    expect(component.messageSent).toBe(true);

  });

  it('should delete a comment', () => {
    fixture.detectChanges();
    let commentsLength = component.getComments().length;

    component.commentsActive = true;
    component.editable = true;
    let event = {
      event : new Event('click'),
      value : 1
    };

    fixture.detectChanges();

    component.deleteComment(event);

    expect(component.getComments().length).toBe(commentsLength - 1);
    expect(component.getComments()[0].getId).not.toBe(1);
    expect(component.getComments()[1].getId).not.toBe(1);

  });

  it('should create', inject([ProfileProvider, UserProvider], (profileProvider: ProfileProvider, userProvider: UserProvider) => {
    expect(component).toBeTruthy();
  }));

});
