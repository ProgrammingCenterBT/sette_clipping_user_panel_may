import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.css']
})
export class LeftSidebarComponent implements OnInit {

  isLatin = sessionStorage.getItem('isLatin');
  viewClips = sessionStorage.getItem('viewClips');
  viewTenders = sessionStorage.getItem('viewTenders');
  viewNotifications = sessionStorage.getItem('viewNotifications');
  viewBankruptcies = sessionStorage.getItem('viewBankruptcies');
  viewSales = sessionStorage.getItem('viewSales');
  viewAnalytics = sessionStorage.getItem('viewAnalytics');

  constructor() { }

  ngOnInit(): void {
  }

  

}
