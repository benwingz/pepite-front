/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CommentlineComponent } from './commentline.component';
import { User} from '../../model/user';
import { Comment} from '../../model/comment';



describe('CommentlineComponent', () => {
  let component: CommentlineComponent;
  let fixture: ComponentFixture<CommentlineComponent>; 
  let de:      DebugElement;
  let el:      HTMLElement;
  let date: Date;
  let expectedComment;
  let expectedUserId;
  let expectedEditable;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentlineComponent);
    component = fixture.componentInstance;
    date = new Date();
    expectedComment = new Comment(1, 'test message', new User(1, 'toto', 'tata'), date);
    expectedUserId =  1;
    expectedEditable =  true;
    component.comment = expectedComment;   
    component.editable = expectedEditable;
    component.userId = expectedUserId;
    fixture.detectChanges();
  });

  it('should display firstname and lastname of creator ', () => {

    de = fixture.debugElement.query(By.css('.title'));
    el = de.nativeElement;
    fixture.detectChanges();
    expect(el.textContent).toContain('toto');
    expect(el.textContent).toContain('tata');

  });

  it('should display date', () => {
    
    de = fixture.debugElement.query(By.css('.date'));
    el = de.nativeElement;
    fixture.detectChanges();
    expect(el.textContent).toContain(component.comment.getDate());

  });

  it('should display message', () => {
    
    de = fixture.debugElement.query(By.css('p'));
    el = de.nativeElement;
    fixture.detectChanges();
    expect(el.textContent).toContain('test message');

  });

  it('should display delete button if userId equals comment Id and editable is true', () => {
    
    de = fixture.debugElement.query(By.css('.secondary-content'));
    el = de.nativeElement;
    fixture.detectChanges();
    expect(el.textContent).toContain('clear');
  });

  it('should not display delete button if userId equals comment Id and editable is false', () => {

    component.editable = false;
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('.secondary-content'));
    fixture.detectChanges();
    expect(de).toBeNull();
  });

    it('should not display delete button if userId is not equals comment Id and editable is true', () => {
    
    component.userId = 2;
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('.secondary-content'));
    fixture.detectChanges();
    expect(de).toBeNull();
  });

  it('should emit delete event when clicked', () => {

    spyOn(component.commentEvent, 'emit');

    // trigger the click
    let nativeElement = fixture.nativeElement;
    let button = nativeElement.querySelector('i');
    button.dispatchEvent(new Event('click'));

    let mockedEvent: Event = new Event('click');
    fixture.detectChanges();

    expect(component.commentEvent.emit).toHaveBeenCalledWith({ value : expectedComment.getId(), event : mockedEvent});
  });
});
