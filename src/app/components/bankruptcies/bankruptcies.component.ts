import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Bankruptcies } from 'src/app/services/bankruptcies-service/bankruptcies';
import { BankruptciesService } from 'src/app/services/bankruptcies-service/bankruptcies-service.service';

@Component({
  selector: 'app-bankruptcies',
  templateUrl: './bankruptcies.component.html',
  styleUrls: ['./bankruptcies.component.css']
})
export class BankruptciesComponent implements OnInit {

  clientID = Number(sessionStorage.getItem('clientID'));
 // client_account = sessionStorage.getItem('username');
 showMe: boolean;
 bankruptcy: Bankruptcies;
 public bankruptciesList: Bankruptcies[]=[];

 //Infinite scroll
 private offset = 0;
 private limit=50;

  constructor( private bankruptciesService: BankruptciesService,) { this.bankruptcy = new Bankruptcies();}

  ngOnInit(): void {
    console.log(this.clientID);
    this.getBankruptcies();
    this.pagination(this.limit,this.offset);
  }
  public getBankruptcies(): void {
    this.bankruptciesService.getBankruptcies().subscribe(
      (response: Bankruptcies[]) => {
        let numberOfBankruptcies = 0;
            numberOfBankruptcies = response.length;
        if (numberOfBankruptcies > 0) {
          this.bankruptciesList = response;
           //order by
          this.bankruptciesList.sort((a, b) => {
            let bankruptcy_date_a = a.bankruptcy_date;
            let bankruptcy_date_b = b.bankruptcy_date;

            if (bankruptcy_date_a < bankruptcy_date_b) return -1;
            if (bankruptcy_date_a > bankruptcy_date_b) return 1;

            return 0;
          })
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  toggleTag() {
    this.showMe = !this.showMe;
  }
  onScrollUp(){
    console.log("Page scroll:"+this.offset);
    this.offset+=this.limit;
    this.pagination(this.limit,this.offset);
   }
   pagination(limit,offset){
     console.log("Pagination "+offset);
     this.bankruptciesService.getBankruptciesPagination(limit,offset).subscribe((response:Bankruptcies[]) => {this.bankruptciesList=[];this.bankruptciesList.push(...response);});
   }
   filterData(){
   }
}

