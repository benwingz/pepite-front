import { Component, OnInit, HostListener } from '@angular/core';

export const TRESHOLD_OFFSET = 200;
export const OFFSET_STEP = 600;
@Component({
  selector: 'app-back-to-top',
  templateUrl: './back-to-top.component.html',
  styleUrls: ['./back-to-top.component.scss']
})
export class BackToTopComponent implements OnInit {
  private visible: boolean;
  constructor() { }

  ngOnInit() {
  }

  scrollToTop() {
    window.scrollTo(0, window.pageYOffset - OFFSET_STEP);
    if (window.pageYOffset) {
      setTimeout(() => { this.scrollToTop(); }, 3);
    }
  }

  @HostListener('window:scroll', [])
  onScroll() {
    this.toggle(window.pageYOffset);
  }

  toggle(offset: number) {
    console.log(offset);
    if (offset >= TRESHOLD_OFFSET) {
      this.visible = true;
    } else if (this.visible) {
      this.visible = false;
    }
  }

}
