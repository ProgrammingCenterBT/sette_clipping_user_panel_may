import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Sales } from 'src/app/services/sales-service/sales';
import { SalesService } from 'src/app/services/sales-service/sales-service.service';

@Component({
  selector: 'app-sales-sidebar',
  templateUrl: './sales-sidebar.component.html',
  styleUrls: ['./sales-sidebar.component.css']
})
export class SalesSidebarComponent implements OnInit {

  sales: Sales;
  public salesList: Sales[] = [];
  constructor(private salesService: SalesService) { this.sales = new Sales(); }

  ngOnInit(): void {
    this.getSales();
  }
  public getSales(): void {
    this.salesService.getSales().subscribe(
      (response: Sales[]) => {
        let numberOfSales = 0;
        numberOfSales = response.length;
        if (numberOfSales > 0) {
          this.salesList = response;
          //order by
          this.salesList.sort((a, b) => {
            let sales_date_a = a.sales_date;
            let sales_date_b = b.sales_date;

            if (sales_date_a < sales_date_b) return -1;
            if (sales_date_a > sales_date_b) return 1;

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