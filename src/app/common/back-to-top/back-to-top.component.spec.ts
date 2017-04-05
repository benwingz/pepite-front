/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BackToTopComponent, TRESHOLD_OFFSET } from './back-to-top.component';

/**
  Component requires a scrollable window, however I didn't find how to mock the window.
  "Solution" : override Window.scrollTo function to update pageYOffset to any value, call the
  component.onScroll function cause no event is triggered
*/
describe('BackToTopComponent', () => {
  let component: BackToTopComponent;
  let fixture: ComponentFixture<BackToTopComponent>;

  /**
    Override scrollTo function to allow a scroll to any value
  */
  // window.scrollTo = function(x?: number, y?: number, options?: ScrollToOptions) {
  //   this.pageYOffset = Math.max(y, 0);
  // };

  let mockedScrollTo = function(x, y) {
    window.scrollTo(x, y);
    component.onScroll();
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackToTopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackToTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be hidden if offset < TRESHOLD_OFFSET', () => {
    expect(fixture.nativeElement.querySelectorAll('button').length).toBe(0);
  });

  it('should be visible if offset >= TRESHOLD_OFFSET', () => {
    component.toggle(TRESHOLD_OFFSET);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('button').length).toBe(1);
  });

  it('should scroll back to top on click', () => {
    component.toggle(TRESHOLD_OFFSET);
    fixture.detectChanges();
    let btn: DebugElement = fixture.debugElement.query(By.css('button'));
    btn.triggerEventHandler('click', {});
    fixture.detectChanges();
    fixture.whenStable().then(() => { expect(window.pageYOffset).toBe(0); });
  });

  it('should call onScroll on window:scroll', () => {
    let spy = spyOn(component, 'onScroll');
    let event = document.createEvent('UIEvent');
    event.initEvent('scroll', true, true);
    window.dispatchEvent(event);
    expect(spy.calls.any()).toBe(true);
  });
});
