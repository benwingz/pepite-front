import { Injectable } from '@angular/core';

@Injectable()
export class NavigationService {

  public breadcrumb: Array<Object> = [];
  public phases: Array<string> = [];

  constructor() {
  };

  getNextPhase(currentPhase: string): string{
    if (this.phases.length > 0) {
      const currentIndex = this.phases.indexOf(currentPhase);
      if (currentIndex == this.phases.length -1) {
        return this.phases[0];
      } else {
        return this.phases[currentIndex +1];
      }
    }
  }

  getPreviousPhase(currentPhase: string): string{
    if (this.phases.length > 0) {
      const currentIndex = this.phases.indexOf(currentPhase);
      if (currentIndex == 0) {
        return this.phases[this.phases.length -1];
      } else {
        return this.phases[currentIndex -1];
      }
    }
  }

}
