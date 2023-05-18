import { Component, OnInit,Input } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { TenderTags } from 'src/app/services/tender-tags-services/tenderTags';
import { TenderTagsService } from 'src/app/services/tender-tags-services/tender-tags.service';
import { ClientTags } from 'src/app/services/client-tags-service/client-tags';
import { ClientTagsService } from 'src/app/services/client-tags-service/client-tags.service';
import { ClipTags} from 'src/app/services/clip-tag-service/clip-tag';
import { ClipTagsService } from 'src/app/services/clip-tag-service/clip-tag.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public selectedLang: string = 'mk';
  public languages = ['mk', 'en'];
  client_account = sessionStorage.getItem('username');
  
  clientID = Number(sessionStorage.getItem('clientID'));
  clientTags: ClientTags;
  tenderTags: TenderTags;
  clipTag: ClipTags;
  //filterByTagId:number;
  @Input() filterByTagId:any="";
  public clientTagsList: ClientTags[] = [];
  public clipTagList: ClipTags[] = [];
  public tenderTagsList: TenderTags[] = [];
  constructor(public translate: TranslateService,
    private clientTagsService: ClientTagsService,
    private tenderTagsService: TenderTagsService,
    private clipTagService: ClipTagsService) {
    this.clientTags   = new ClientTags();
    this.clipTag      = new ClipTags();
    this.tenderTags   = new TenderTags();
  }

  public changeLanguage(newLanguage: string): void {
    this.selectedLang = newLanguage;
    this.translate.use(newLanguage);
  }
 dropdownTags(tag_name:string, tag_id:number){
    this.filterByTagId=tag_id;
    console.log("Dropdown tag "+tag_name+" / "+tag_id+"="+this.filterByTagId);
    switch(tag_name){
      case 'tenders':
       //let getTendersTag:TenderTags[] = this.tenderTagsList.filter(TenderTags => TenderTags.tender_tag_id == tag_id);
       //console.log(getTendersTag);
      break;
    }
  }
  ngOnInit(): void {
    // this.getTransLanguage();
    this.getClientTags(this.clientID);
  }
  private getClientTags(clientID: number): void {
    this.clientTagsService.getClientWithAllTags(clientID).subscribe(
      (response: ClientTags[]) => {
        let numberOfTags = 0;
        numberOfTags = response.length;
        if (numberOfTags > 0) { this.clientTagsList = response; console.log("Tagovite");}
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  private getClipTags(tagtID: number): void {
    this.clipTagService.getClipWithAllTags(tagtID).subscribe(
      (response: ClipTags[]) => {
        let numberOfTags = 0;
        numberOfTags = response.length;
        if (numberOfTags > 0) { this.clipTagList = response; }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  private getTenderTags(tagID: number): void {
    this.tenderTagsService.getTagsWithTenders(tagID).subscribe(
      (response: TenderTags[]) => {
        let numberOfTenderTags = 0;
        numberOfTenderTags = response.length;
        if(numberOfTenderTags > 0) { this.tenderTagsList = response; }
      },
      (error: HttpErrorResponse) => {alert(error.message);}
    );
  }
}