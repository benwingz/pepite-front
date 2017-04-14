/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GradeComponent,  NUMBER_STAR } from './grade.component';

describe('GradeComponent', () => {
  let component: GradeComponent;
  let fixture: ComponentFixture<GradeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradeComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradeComponent);
    component = fixture.componentInstance;
    component.mainGrade = {
      value: 0,
      priority: 0
    };
    component.secondaryGrade = {
      value: 0,
      priority: 0
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose 5 i element (4 stars plus one icon for deleting grade) ' , () => {
    expect(fixture.nativeElement.querySelectorAll('i').length).toBe(NUMBER_STAR + 3);
  });

  it('should expose one full star when clicking on star)' , () => {
    let I = fixture.debugElement.query(By.css('.grade-star__icon'));
    expect(I.nativeElement.textContent).toMatch('star_border', 'before click');
    I.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(I.nativeElement.textContent).toMatch('star', 'after click');
  });

  it('should display done icon if one grade is validated)' , () => {
    component.mainGrade.priority = 1;
    component.mainGrade.value = 2;
    fixture.detectChanges();
    let I = fixture.debugElement.query(By.css('.category-grade__validated'));
    expect(I.nativeElement.textContent).toMatch('done', 'init');
  });

  it('should  find class grade-icon__hidden when a grade is not validated)' , () => {
    let I = fixture.debugElement.query(By.css('.grade-icon__hidden'));
    expect(I).toBeDefined();
  });


});
