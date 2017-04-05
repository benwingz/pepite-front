import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { ReferenceService } from '../../service/reference.service';
import { GradeService } from '../../service/grade.service';
// import { ProfileProvider, PROFILE_DATA_URI } from '../../service/common/profile/profile-provider.service';
// import { PhaseProvider } from '../../service/common/phase/phase-provider.service';
// import { PdfGenerator } from '../../service/common/pdf/pdf-generator.service';
// import { Phase } from '../../common/phase/phase';
// import { Skill } from '../../common/skill/skill';
// import { Category } from '../../common/category/category';
import { User } from '../../models/user.model';
import { Phase } from '../../models/phase.model';
import { Category } from '../../models/category.model';
import { Grade } from '../../models/grade.model';
// import { Certification } from '../../model/certification';
import { RouterModule } from '@angular/router';


declare var pdfMake: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  //private phases: Phase[];

  private icons: string[] = [
  'work',
  'explore',
  'build',
  'play_circle_outline'
  ];
  private referenceLoaded = false;
  private grades: Grade[] = [];
  private categories: Category[] = [];

  private currentUser: User;
  private reference: Phase[] = [];

  constructor(
    private referenceService: ReferenceService,
    private userService: UserService,
    private gradeService: GradeService
  ) {

  }

  ngOnInit() {
    // Start by retrive user
    this.userService.getCurrentUser()
    .subscribe((user) => {
      this.currentUser = user;
    });
    //Then retrieve references
    this.referenceService.getPhases()
    .subscribe((phases) => {
      phases.forEach((phase, index) => {
        this.referenceService.getGradesByPhase(phase)
          .subscribe((grades) => {
            phase.grades = grades;
            this.referenceService.getPhaseCategories(phase)
              .subscribe((categories) => {
                phase.setCategories(categories);
                categories.forEach((category) => {
                  this.categories.push(category);
                });
                this.reference[phase.order] = phase;
              });
          });
      });
    });

    //And finally grades
    this.gradeService.getGrades()
    .subscribe((grades) => { this.grades = grades });
  };

  downloadCertificate(): void {
    // let user: User = this.profileProvider.getCurrentProfile().getUser();
    // let certification: Certification = user.getCertification();
    // let givenBy: User = this.userP.getUser(certification.getGivenBy());
    // this.pdfGenerator.buildCertificatePDF(user, givenBy, certification);
  }

}
