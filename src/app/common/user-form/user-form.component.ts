import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UsersService } from '../../service/users.service';

import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  @Input()
  userinfo: User;
  @Input()
  account: string;
  @Input()
  redirectRoute: string = 'login'

  errorMessage: String;
  studyLevels: Array<number> = [0,1,2,3,4,5,6,7,8];
  accountId: string;
  countrySource: Array<string> = ["Afghanistan","Afrique du Sud","Albanie","Algérie","Allemagne","Andorre","Angola","Anguilla","Antarctique","Antigua-et-Barbuda","Arabie saoudite","Argentine","Arménie","Aruba","Australie","Autriche","Azerbaïdjan","Bahamas","Bahreïn","Bangladesh","Barbade","Belgique",
  "Belize","Bénin","Bermudes","Bhoutan","Biélorussie","Bolivie","Bosnie-Herzégovine","Botswana","Brésil","Brunéi Darussalam","Bulgarie","Burkina Faso","Burundi","Cambodge","Cameroun","Canada","Cap-Vert","Ceuta et Melilla","Chili","Chine","Chypre","Colombie","Comores","Congo-Brazzaville","Congo-Kinshasa",
  "Corée du Nord","Corée du Sud","Costa Rica","Côte d’Ivoire","Croatie","Cuba","Curaçao","Danemark","Diego Garcia","Djibouti","Dominique","Égypte","El Salvador","Émirats arabes unis","Équateur","Érythrée","Espagne","Estonie","État de la Cité du Vatican","États fédérés de Micronésie","États-Unis","Éthiopie","Fidji","Finlande","France",
  "Gabon","Gambie","Géorgie","Ghana","Gibraltar","Grèce","Grenade","Groenland","Guadeloupe","Guam","Guatemala","Guernesey","Guinée","Guinée équatoriale","Guinée-Bissau","Guyana","Guyane française","Haïti","Honduras","Hongrie","Île Christmas","Île de l’Ascension","Île de Man","Île Norfolk","Îles Åland",
  "Îles Caïmans","Îles Canaries","Îles Cocos","Îles Cook","Îles Féroé","Îles Géorgie du Sud et Sandwich du Sud","Îles Malouines","Îles Mariannes du Nord","Îles Marshall","Îles mineures éloignées des États-Unis","Îles Salomon","Îles Turques-et-Caïques","Îles Vierges britanniques","Îles Vierges des États-Unis","Inde","Indonésie","Irak","Iran","Irlande","Islande","Israël","Italie","Jamaïque","Japon","Jersey",
  "Jordanie","Kazakhstan","Kenya","Kirghizistan","Kiribati","Kosovo","Koweït","La Réunion","Laos","Lesotho","Lettonie","Liban","Libéria","Libye","Liechtenstein","Lituanie","Luxembourg","Macédoine","Madagascar","Malaisie","Malawi","Maldives","Mali","Malte","Maroc",
  "Martinique","Maurice","Mauritanie","Mayotte","Mexique","Moldavie","Monaco","Mongolie","Monténégro","Montserrat","Mozambique","Myanmar","Namibie","Nauru","Népal","Nicaragua","Niger","Nigéria","Niue","Norvège","Nouvelle-Calédonie","Nouvelle-Zélande","Oman","Ouganda","Ouzbékistan",
  "Pakistan","Palaos","Panama","Papouasie-Nouvelle-Guinée","Paraguay","Pays-Bas","Pays-Bas caribéens","Pérou","Philippines","Pitcairn","Pologne","Polynésie française","Porto Rico","Portugal","Qatar","R.A.S. chinoise de Hong Kong","R.A.S. chinoise de Macao","République centrafricaine","République dominicaine","République tchèque","Roumanie","Royaume-Uni","Russie","Rwanda","Sahara occidental",
  "Saint-Barthélemy","Saint-Christophe-et-Niévès","Saint-Marin","Saint-Martin (partie française)","Saint-Martin (partie néerlandaise)","Saint-Pierre-et-Miquelon","Saint-Vincent-et-les-Grenadines","Sainte-Hélène","Sainte-Lucie","Samoa","Samoa américaines","Sao Tomé-et-Principe","Sénégal","Serbie","Seychelles","Sierra Leone","Singapour","Slovaquie","Slovénie","Somalie","Soudan","Soudan du Sud","Sri Lanka","Suède","Suisse",
  "Suriname","Svalbard et Jan Mayen","Swaziland","Syrie","Tadjikistan","Taïwan","Tanzanie","Tchad","Terres australes françaises","Territoire britannique de l’océan Indien","Territoires palestiniens","Thaïlande","Timor oriental","Togo","Tokelau","Tonga","Trinité-et-Tobago","Tristan da Cunha","Tunisie","Turkménistan","Turquie","Tuvalu","Ukraine","Uruguay","Vanuatu",
  "Venezuela","Vietnam",
  "Wallis-et-Futuna","Yémen","Zambie","Zimbabwe"];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService
  ) { }

  ngOnInit() {

  }

  patchUser(): void{
    this.usersService.doActivateUser(this.userinfo, this.account).subscribe((response) => {
      if(response.nModified) {
        this.router.navigate([this.redirectRoute]);
      } else {
        this.errorMessage = response.message;
      }
    });
  }

}
