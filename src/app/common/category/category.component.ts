import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';


import { Category } from '../../models/category.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {

  public elementRef;

  @Input()
  private category: Category;
  private focused: boolean;
  private legendActive: boolean;
  private buttonBool: boolean;
  @Output()
  focus = new EventEmitter();

  constructor(
    myElement: ElementRef
  ) {
    this.elementRef = myElement;
  };

  ngOnInit(): void {
    this.focused = false;
    this.buttonBool = false;
  };

  handleClick(event) {
    this.focused = !this.focused;
  };

  toggleLegend(event): void {
    event.stopPropagation();
    this.legendActive = !this.legendActive;
  };

  expendCat(event): void {
     event.stopPropagation();
     this.buttonBool = true;
     this.handleClick(event);
  };

  changeGrade($event) {
  //  this.profileProvider.getCurrentProfile().addGrade(this.userProvider.getCurrentUser(), this.category, $event.value);
  }

}
