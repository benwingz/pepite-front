/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DropdownComponent } from './dropdown.component';
import { DropdownValue} from './dropdown.component';


const DropDownValuesMocked = [
  new DropdownValue('first', 'First'),
  new DropdownValue('second', 'Second'),
];

describe('DropdownComponent', () => {
  let component: DropdownComponent;
  let fixture: ComponentFixture<DropdownComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the right number of li element', async( () =>  {
    fixture.whenStable().then(() => {
      component.values = DropDownValuesMocked;
      component.opened = true;

      fixture.detectChanges();
      let de = fixture.nativeElement.querySelectorAll('li');
      expect(de.length).toBe(DropDownValuesMocked.length);
    });
  }));

  it('should display the right title', async( () => {
    fixture.whenStable().then(() => {
      component.btnLabel = 'Test' ;
      component.values = DropDownValuesMocked;
      component.opened = true;
      fixture.detectChanges();

      let a = fixture.debugElement.query(By.css('a'));
      let li = fixture.debugElement.query(By.css('li'));
      expect(a.nativeElement.textContent).toMatch('Test');

      // Click on the first li () "First" label
      li.triggerEventHandler('click', null);
      fixture.detectChanges();

      expect(a.nativeElement.textContent).toMatch('First');

    });
  }));

  it('should change toggle when clicking on a', async( () =>  {
    fixture.whenStable().then(() => {
      component.values = DropDownValuesMocked;
      let a = fixture.debugElement.query(By.css('a'));
      expect(component.opened).toBeFalsy();
      a.triggerEventHandler('click', null);
      fixture.detectChanges();
      expect(component.opened).toBeTruthy();
    });
  }));

  it('should change toggle when clicking an li', async( () =>  {
    fixture.whenStable().then(() => {
      component.opened = true ;
      component.values = DropDownValuesMocked;
      fixture.detectChanges();
      let li = fixture.debugElement.query(By.css('li'));
      li.triggerEventHandler('click', null);
      fixture.detectChanges();
      expect(component.opened).toBeFalsy();
    });
  }));

  it('should emit on click', () => {
    fixture.whenStable().then(() => {
      component.opened = true ;
      component.values = DropDownValuesMocked;
      fixture.detectChanges();
      // spy on event emitter
      spyOn(component.select, 'emit');

      // trigger the click
      let li = fixture.debugElement.query(By.css('li'));
      li.triggerEventHandler('click', null);
      fixture.detectChanges();

      expect(component.select.emit).toHaveBeenCalledWith('first');
    });
  });

});
