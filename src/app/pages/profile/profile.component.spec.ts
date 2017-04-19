/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {GlobalPhaseComponentStub} from '../../../../stubs/global-phase.component.stub';
import { ProfileComponent } from './profile.component';
import {MockBackend} from '@angular/http/testing';
import {BaseRequestOptions, Http} from '@angular/http';
import {PhaseProvider} from '../../service/common/phase/phase-provider.service';
import {User} from '../../model/user';
import {ProfileProvider} from '../../service/common/profile/profile-provider.service';
import { UserProvider } from '../../service/common/user/user-provider.service';
import {Profile} from '../../model/profile';
import {Phase} from '../../common/phase/phase';
import {Category} from '../../common/category/category';
import {Skill} from '../../common/skill/skill';
import {PdfGenerator} from '../../service/common/pdf/pdf-generator.service';
import {SkillLink} from '../../model/skilllink';
import {Grade} from '../../model/grade';


describe('ProfileComponent', () => {

  let phaseProviderStub = {
    getAll: () => { return new Promise ((resolve, reject) => { resolve(); }); },
  };

  let profileUser: User = new User(1, 'lastname', 'firstname');
  let profileProviderStub = {
    getCurrentProfile: () => { return new Profile(profileUser, [], []); },
  };

  let currentUser: User = new User(2, 'currentLastname', 'currentFirstname', false);
  let userProviderStub = {
    getCurrentUser: () => { return currentUser; },
    setCurrentUser: (user: User) => { currentUser = user; }
  };

  let pfdGeneratorProviderStub = {};

  let phase1Mocked = new Phase(1, 'phase 1',
    [
      new Category(1, 'category 1', [
        new Skill(1, 'skill 1'),
        new Skill(2, 'skill 2'),
        new Skill(3, 'skill 3'),
      ]),
      new Category(2, 'category 2', [
        new Skill(4, 'skill 4'),
        new Skill(5, 'skill 5'),
        new Skill(6, 'skill 6'),
      ]),
    ]
  );

  let phase2Mocked = new Phase(2, 'phase 2',
    [
      new Category(3, 'category 3', [
        new Skill(7, 'skill 7'),
        new Skill(8, 'skill 8'),
      ]),
      new Category(4, 'category 4', [
        new Skill(9, 'skill 9'),
      ]),
    ]
  );

  let phase3Mocked = new Phase(3, 'phase 3',
    [
      new Category(4, 'category 4', [
        new Skill(10, 'skill 10'),
      ])
    ]
  );

  let phasesMocked = [];
  phasesMocked.push(phase1Mocked, phase2Mocked, phase3Mocked);

  let skillLink1Mocked = new SkillLink(1, [
    new Grade(2, 3, false, null, 14587963, 1),
    new Grade(1, 2, false, null, 14584963, 0),
  ]);

  let skillLink2Mocked = new SkillLink(2, [
    new Grade(1, 1, false, null, 14587963, 0),
    new Grade(2, 4, false, null, 14584963, 1),
  ]);

  let skillLink3Mocked = new SkillLink(10, [
    new Grade(1, 4, false, null, 14587963, 0),
  ]);

  let skillLinksMocked = [];
  skillLinksMocked.push(skillLink1Mocked, skillLink2Mocked, skillLink3Mocked);

  let profileMocked = new Profile(profileUser, skillLinksMocked, []);

  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GlobalPhaseComponentStub, ProfileComponent],
      providers: [
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) =>
            new Http(backendInstance, defaultOptions),
          deps: [MockBackend, BaseRequestOptions]
        },
        {
          provide: PhaseProvider,
          useValue: phaseProviderStub
        },
        {
          provide: ProfileProvider,
          useValue: profileProviderStub
        },
        {
          provide: UserProvider,
          useValue: userProviderStub
        },
        {
          provide: PdfGenerator,
          useValue: pfdGeneratorProviderStub
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('if currentUser is not director of studies, there shouldn\'t be a button to deliver the certificate', () => {
    expect(fixture.nativeElement.querySelectorAll('.deliver-certificate-btn').length).toBe(0);
  });

  it('if currentUser is director of studies, there should be a button to deliver the certificate', () => {
    userProviderStub.setCurrentUser(new User(3, 'director', 'studies', true));
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('.deliver-certificate-btn').length).toBe(1);
  });

  it('click on .deliver-certificate-btn should update the user associated to the profil and change btn consequently', () => {
    expect(profileProviderStub.getCurrentProfile().getUser().isCertified()).toBeFalsy();
    let deliverCertificateBtn: DebugElement = fixture.debugElement.query(By.css('.deliver-certificate-btn'));
    expect(deliverCertificateBtn.classes['disabled']).toBeFalsy();
    deliverCertificateBtn.triggerEventHandler('click', {});
    fixture.detectChanges();
    expect(profileProviderStub.getCurrentProfile().getUser().isCertified()).toBeTruthy();
    expect(deliverCertificateBtn.classes['disabled']).toBeTruthy();
  });

  it('should not have phase 2 on validated pdf export', () => {
    component.phases = phasesMocked;
    fixture.detectChanges();
    let exportData = component.prepareExportData(phasesMocked, profileMocked, 3);
    expect(exportData.phases.length).toEqual(1);
  });

  it('should not have phase 2 on self evaluated pdf export', () => {
    component.phases = phasesMocked;
    fixture.detectChanges();
    let exportData = component.prepareExportData(phasesMocked, profileMocked, 2);
    expect(exportData.phases.length).toEqual(2);
  });

  it('should not have phase 2 on self evaluated pdf export', () => {
    component.phases = phasesMocked;
    fixture.detectChanges();
    let exportData = component.prepareExportData(phasesMocked, profileMocked, 1);
    expect(exportData.phases.length).toEqual(3);
  });
});
