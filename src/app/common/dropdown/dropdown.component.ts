import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

export class DropdownValue {

  constructor(private value: string, private label: string, private defaultValue?: boolean) {}

  isDefault(): boolean {
    return this.defaultValue;
  }
}

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})

export class DropdownComponent implements OnInit {

  @Input()
  private values: DropdownValue[] = [];

  @Output()
  select = new EventEmitter();

  @Input()
  private btnLabel: string;

  @Input()
  private selectValue: string;

  private opened: boolean;

  constructor() {}

  ngOnInit() {
    let defaultValue: DropdownValue = this.values.find((v) => { return v.isDefault(); });
    if (defaultValue) {
      this.selectItem(defaultValue);
    }
  }

  toggle()  {
    this.opened = !this.opened;
  }

  selectItem(item) {
    this.select.emit(item.value);
    this.opened = false;
    this.selectValue = item.label;
  }

}
