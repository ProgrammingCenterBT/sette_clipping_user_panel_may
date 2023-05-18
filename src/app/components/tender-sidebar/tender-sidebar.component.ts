import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit,Output ,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-tender-sidebar',
  templateUrl: './tender-sidebar.component.html',
  styleUrls: ['./tender-sidebar.component.css']
})
export class TenderSidebarComponent implements OnInit {
  
  
public searchString: string = '';
searchBySubject:string            = "";
searchByInstitution:string        = "";
@Output() searchBySubjectEvent    = new EventEmitter<string>();
@Output() searchByInstitutionEvent = new EventEmitter<string>();
  constructor() {}

  ngOnInit(): void {}
  addSearchSubject(value: string){this.searchBySubjectEvent.emit(value);}
  addSearchInstitution(value: string){this.searchByInstitutionEvent.emit(value);}
}