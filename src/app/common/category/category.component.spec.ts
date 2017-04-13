/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed, inject} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, ElementRef } from '@angular/core';

import { CategoryComponent } from './category.component';

import { SkillComponentStub } from '../../../../stubs/skill.component.stub';
import { CommentComponentStub } from '../../../../stubs/comment.component.stub';
import { SelfEvaluatedSkillsCountPipeStub } from '../../../../stubs/self-evaluated-skills-count.pipe.stub';
import {ValidatedSkillsCountPipeStub} from '../../../../stubs/validated-skills-count.pipe.stub';
import {Category} from './category';
import {Skill} from '../skill/skill';
import {User} from '../../model/user';
import {Profile} from '../../model/profile';
import {ProfileProvider} from '../../service/common/profile/profile-provider.service';
import {MockBackend} from '@angular/http/testing';
import {BaseRequestOptions, Http} from '@angular/http';
import {UserProvider} from '../../service/common/user/user-provider.service';

const categoryMock = new Category(1, 'category 1', [
    new Skill(1, 'skill 1'),
    new Skill(2, 'skill 2')
]);

describe('CategoryComponent', () => {

  let component: CategoryComponent;
  let fixture: ComponentFixture<CategoryComponent>;
  let profileProviderStub = {
    getCurrentProfile: () => { return new Profile(new User(1, 'jane', 'doe'), [], []); },
    load: () => { return Promise.resolve(); },
    getUser: () => { return new User(1, 'jane', 'doe'); }
  };
  let userProviderStub = {
    getCurrentUser: () => { return new User(1, 'jane', 'doe'); },
    getUser: () => { return new User(1, 'jane', 'doe'); },
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ElementRef,
          useValue: new MockElementRef()
        },
        {
          provide: ProfileProvider,
          useValue: profileProviderStub
        },
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) =>
            new Http(backendInstance, defaultOptions),
          deps: [MockBackend, BaseRequestOptions]
        },
        {
          provide: UserProvider,
          useValue: userProviderStub
        }
      ],
      declarations: [
        CategoryComponent,
        SkillComponentStub,
        SelfEvaluatedSkillsCountPipeStub,
        CommentComponentStub,
        ValidatedSkillsCountPipeStub
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('click on category title should raise focus event with event.focus true', inject([ProfileProvider, UserProvider], (profileProvider: ProfileProvider, userProvider: UserProvider) => {

    component.category = categoryMock;
    fixture.detectChanges();
    let focusedEvent: any;
    component.focus.subscribe((event: any) => focusedEvent = event);

    let titleElement = fixture.debugElement.query(By.css('.card-title'));    
    let mockedEvent = {
      stopPropagation: () => { return true; }
    };
      titleElement.triggerEventHandler('click', mockedEvent);
      fixture.detectChanges();
      expect(focusedEvent.focus).toBe(true);
  }));

  it('should display a legend icon', () => {
    component.focused = true;
    component.category = categoryMock;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('.grade-levels__icon').length).toBe(1);
  });

  it('should display a popover on legend icon hover', () => {
    component.category = categoryMock;
    component.focused = true;
    fixture.detectChanges();

    let el = fixture.debugElement.query(By.css('.grade-levels__icon'));

    let event = {
      stopPropagation: () => { return true; }
    };
    el.triggerEventHandler('mouseover', event);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('.grade-levels__tooltip').length).toBe(1);
  });

});

class MockElementRef implements ElementRef {
  nativeElement = {};
}
