import {Component, OnInit, Output, EventEmitter, Input, HostListener} from '@angular/core';
// import {PhaseProvider} from '../../service/common/phase/phase-provider.service';
// import {UserProvider} from '../../service/common/user/user-provider.service';
// import {ProfileProvider} from '../../service/common/profile/profile-provider.service';
// import {PdfGenerator} from '../../service/common/pdf/pdf-generator.service';
import { ReferenceService } from '../../service/reference.service';
import { AuthService } from '../../service/auth.service';
import { ExportService } from '../../service/export.service';

import { Phase } from '../../models/phase.model';
import { Category } from '../../models/category.model';
import { User } from '../../models/user.model';

const EXPORT_PDF_TOTAL = 1;
const EXPORT_PDF_AUTO_EVAL = 2;
const EXPORT_PDF_VALIDATED = 3;
export const TRESHOLD_OFFSET = 200;
export const OFFSET_STEP = 600;

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    private phases: Phase[] = [];
    private currentUser: User;
    private displayDetails: boolean = false;
    private visible: boolean = false;

    constructor(
      private referenceService: ReferenceService,
      private authService: AuthService,
      private exportService: ExportService
    ) {
    }

    exportPdf(strategy?: string) {
      switch (strategy) {
        case 'self':
          this.exportService.exportSelf(this.currentUser._id)
            .subscribe( (url) => {
              window.open(url);
            });
          break;
        case 'full':
          this.exportService.exportFull(this.currentUser._id)
            .subscribe( (url) => {
              window.open(url);
            });
          break;
        default:
          this.exportService.exportValidate(this.currentUser._id)
            .subscribe( (url) => {
              window.open(url);
            });
      }
    }

    ngOnInit() {
      // Then retrieve references
      this.authService.getCurrentUser()
        .subscribe( user => this.currentUser = user);
      this.referenceService.getPhases()
      .subscribe((phases) => {
        this.phases = phases;
      });
    }

    deliverCertificate() {

    }

    @HostListener('window:scroll', [])
    onScroll() {
      this.toggle(window.pageYOffset);
    }

    toggle(offset: number) {
      if (offset >= TRESHOLD_OFFSET) {
        this.visible = true;
      } else if (this.visible) {
        this.visible = false;
      }
    }


}
