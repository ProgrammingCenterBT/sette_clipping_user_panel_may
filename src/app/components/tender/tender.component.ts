import { Component, OnInit,Input } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Tenders } from 'src/app/services/tenders-services/tenders';
import { TendersService } from 'src/app/services/tenders-services/tenders.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-tender',
  templateUrl: './tender.component.html',
  styleUrls: ['./tender.component.css']
})
export class TenderComponent implements OnInit {

  clientID = Number(sessionStorage.getItem('clientID'));
  client_validate_until = sessionStorage.getItem('validate_until');
  showMe: boolean;

 tenders: Tenders;
 public tendersList: Tenders[]=[];
 public searchString: string = '';
 filterBySubject:string       = '';
 filterByInstitution:string   = '';
  //Infinite scroll
  private offset = 0;
  private limit=50;

constructor( private tenderService: TendersService, private datePipe: DatePipe ) { this.tenders = new Tenders();}

  ngOnInit(): void {
    this.pagination(this.limit,this.offset);
  }
  getDataFromTenderSidebar(newItem: string) {this.filterBySubject=newItem;}
  getDataFromTenderSidebarInstitutions(newItem: string) {this.filterByInstitution=newItem;}
  getTendersByType(findBytender_type:string){
    console.log("Filter by type "+findBytender_type);
    return this.tendersList.filter(Tenders => Tenders.tender_type==findBytender_type);
  }
  toggleTag() {
    this.showMe = !this.showMe;
  }


transformDate(date) {
  var dateToDB = this.datePipe.transform(date, 'dd.MM.yyyy');
  return dateToDB;
}

formatDate(dateFrom: string) {
  var myDate = dateFrom;
  var chunks = myDate.split("-");
  var formattedDate = chunks[1] + "-" + chunks[0] + "-" + chunks[2];
  return this.datePipe.transform(formattedDate, 'yyyy-MM-dd', 'en-US');

}
onScrollUp(){
  console.log("Page scroll:"+this.offset);
  this.offset+=this.limit;
  this.pagination(this.limit,this.offset);
 }
 private pagination(limit,offset){
   this.tenderService.getTendersUtilPagination(this.client_validate_until.split(' ')[0],limit,offset).subscribe((response: Tenders[]) => {this.tendersList=[];this.tendersList.push(...response);});
 }
 filterData(){}
 
}