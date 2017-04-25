import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PepiteHomeComponent } from './pepite-home.component';

describe('PepiteHomeComponent', () => {
  let component: PepiteHomeComponent;
  let fixture: ComponentFixture<PepiteHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PepiteHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PepiteHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
