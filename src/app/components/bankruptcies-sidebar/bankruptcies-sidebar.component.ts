import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Bankruptcies } from 'src/app/services/bankruptcies-service/bankruptcies';
import { BankruptciesService } from 'src/app/services/bankruptcies-service/bankruptcies-service.service';

@Component({
  selector: 'app-bankruptcies-sidebar',
  templateUrl: './bankruptcies-sidebar.component.html',
  styleUrls: ['./bankruptcies-sidebar.component.css']
})
export class BankruptciesSidebarComponent implements OnInit {

  bankruptcy: Bankruptcies;
 public bankruptciesList: Bankruptcies[]=[];
  constructor( private bankruptciesService: BankruptciesService,) { this.bankruptcy = new Bankruptcies();}

  ngOnInit(): void {
    this.getBankruptcies();
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

}
