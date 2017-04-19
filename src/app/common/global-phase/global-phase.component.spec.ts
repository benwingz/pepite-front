/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GlobalPhaseComponent } from './global-phase.component';
import {SkillComponentStub} from '../../../../stubs/skill.component.stub';
import {CommentComponent} from '../comment/comment.component';
import {CommentlineComponent} from '../commentline/commentline.component';
import {GradeComponent} from '../grade/grade.component';
import {NgModel} from '@angular/forms';
import {Phase} from '../phase/phase';

describe('GlobalPhaseComponent', () => {
  let phase1 = new Phase(1, 'phase 1', []);
  let phase2 = new Phase(2, 'phase 2', []);
  let phases = [];
  phases.push(phase1, phase2);
  let component: GlobalPhaseComponent;
  let fixture: ComponentFixture<GlobalPhaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalPhaseComponent, SkillComponentStub, CommentComponent, CommentlineComponent, GradeComponent, NgModel ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalPhaseComponent);
    component = fixture.componentInstance;
    component.phase = phase1;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expand more when click' , () => {
    fixture.detectChanges();
    let I = fixture.debugElement.query(By.css('.global-phase__click'));
    expect(I.nativeElement.textContent).toMatch('add', 'before click');
    let event = {
      stopPropagation: () => { return true; }
    };
    I.triggerEventHandler('click', event);
    fixture.detectChanges();
    expect(I.nativeElement.textContent).toMatch('remove', 'after click');
  });
});
