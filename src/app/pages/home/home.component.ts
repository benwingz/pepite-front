import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { AuthService } from '../../service/auth.service';
import { ReferenceService } from '../../service/reference.service';
import { GradeService } from '../../service/grade.service';

import { User } from '../../models/user.model';
import { Phase } from '../../models/phase.model';
import { Category } from '../../models/category.model';
import { Grade } from '../../models/grade.model';


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
  private currentValidatedUser: User;
  private reference: Phase[] = [];

  private userId: string;

  constructor(
    private referenceService: ReferenceService,
    private authService: AuthService,
    private gradeService: GradeService,
    private router: Router,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit() {
    // Get url parameter
    this.route.params.subscribe((params) => {
      this.userId = params['id'];
    });

    //Test if user is logged in
    if (!this.authService.currentUser) {
      this.router.navigate(['login']);
    } else {
      // Start by retrive user
      this.authService.getCurrentUser()
      .subscribe((user) => {
        this.currentUser = user;
      });
      // Get user validated if there is url params
      if (this.userId) {
        this.authService.getUser(this.userId)
          .subscribe((user) => {
            this.currentValidatedUser = user;
          });
      }
      //Then retrieve references
      this.referenceService.getPhases()
      .subscribe((phases) => {
        phases.forEach((phase, index) => {
          let getGradesByPhaseObserver: any;
          if (this.userId) {
            getGradesByPhaseObserver = this.referenceService.getGradesByPhase(phase, this.userId)
          } else {
            getGradesByPhaseObserver = this.referenceService.getGradesByPhase(phase)
          }
          getGradesByPhaseObserver.subscribe((grades) => {
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
      var getGradesObserver: any;
      if (!this.userId) {
        getGradesObserver = this.gradeService.getGrades();
      } else {
        getGradesObserver = this.gradeService.getUserGrades(this.userId);
      }
      getGradesObserver
      .subscribe((grades) => { this.grades = grades });
    }
  };

  downloadCertificate(): void {
    // let user: User = this.profileProvider.getCurrentProfile().getUser();
    // let certification: Certification = user.getCertification();
    // let givenBy: User = this.userP.getUser(certification.getGivenBy());
    // this.pdfGenerator.buildCertificatePDF(user, givenBy, certification);
  }

}
