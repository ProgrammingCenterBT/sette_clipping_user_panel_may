import { Component, ElementRef, EventEmitter, Input, OnInit,Injectable} from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Clip } from 'src/app/services/clip-service/clip';
import { ClipService } from 'src/app/services/clip-service/clip.service';
import { FunClipService } from 'src/app/services/functions/fun-clip.service';
import { DatePipe } from '@angular/common';
import { FunClip } from 'src/app/services/functions/fun-clip';
import { FavoritePagesService } from 'src/app/services/favorite-pages-service/favorite-pages.service';
import { FavoritePages } from 'src/app/services/favorite-pages-service/favorite-pages';
import { shareReplay ,Observable} from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
@Injectable()
export class HomeComponent implements OnInit {

  clientID = Number(sessionStorage.getItem('clientID'));
  lang = String(sessionStorage.getItem('isLatin'));
  client_account = sessionStorage.getItem('username');
  emoji:string="bi bi-emoji-neutral-fill";
  emoji_clip_id:number=-1;
  stars_clip_id:boolean=false;

  clip: Clip;
  public clipList: Clip[] = [];
  public funClipList: FunClip[] = [];
  favoritePages: FavoritePages;
  favoritePk:number=0;
  public favoritePagesList:FavoritePages[]= [];
  //public favoritePagesList:Observable<FavoritePages[]>;
  private findMe:FavoritePages[] | undefined= [];
  // @Input() selected: boolean = false;
  // @Output() selectedChange = new EventEmitter<boolean>();

  // @Input() clicked: boolean = false;
  // @Output() clickedChange = new EventEmitter<boolean>();

  constructor(private clipService: ClipService, private funClipService: FunClipService, private datePipe: DatePipe,private http: HttpClient,
    private favoritePagesService: FavoritePagesService) {
    this.clip = new Clip();
    this.favoritePages = new FavoritePages();
  }
  //  @ViewChild('to') dateTo: ElementRef;
  //  @ViewChild('from') dateFrom: ElementRef;
  //  objPosition: number = 0;
  //  filterMode = false;
  date = new Date();
  //  minDate = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate() - 2);


  ngOnInit(): void {
    this.getFavoritePagesClient();
    this.getClips();
    this.getFunClip();
  }

  public getClips(): void {
    this.clipService.getClip().subscribe(

      (response: Clip[]) => {
        let numberOfClips = 0;
        numberOfClips = response.length;
        if (numberOfClips > 0) {
          this.clipList = response;
          //order by
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  // Read data from database
  public getFunClip(): void {
    this.funClipService.fun_clips().subscribe(
      (response: FunClip[]) => {
        let numberOfClips = 0;
        numberOfClips = response.length;
        if (response.length > 0) {
          this.funClipList = response;

        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  getFavoritePagesClient(): void {
    //this.favoritePagesService.getFavoritePagesByClient(this.clientID).subscribe((response: FavoritePages[]) => {this.favoritePagesList.push(...response);});
    //this.favoritePagesList =this.favoritePagesService.getFavoritePagesByClient(this.clientID).pipe(shareReplay());
 
    this.favoritePagesService.getFavoritePagesByClient(this.clientID).subscribe({     
      next:(response: FavoritePages[])      => {this.favoritePagesList = response;},// nextHandler
      error:    (error: HttpErrorResponse)  => {console.log(error.message); },// errorHandler 
      complete: ()                          => {console.log("completeHandler");} // completeHandler
     }
  );
  //this.favoritePagesService.getFavoritePagesByClient(this.clientID).subscribe({next:favoritePagesList => {this.favoritePagesList = favoritePagesList;}});
  }
  transformDate(date) {
    var dateToDB = this.datePipe.transform(date, 'dd.MM.yyyy');
    return dateToDB;
  }
  transformDateInsert(date) {
    var dateToDB = this.datePipe.transform(date, 'yyyy-MM-dd');
    return dateToDB;
  }
  formatDate(dateFrom: string) {
    var myDate = dateFrom;
    var chunks = myDate.split("-");
    var formattedDate = chunks[1] + "-" + chunks[0] + "-" + chunks[2];
    return this.datePipe.transform(formattedDate, 'yyyy-MM-dd', 'en-US');

  }

  // filterByDate(dateFrom: string, dateTo: string) {
  //   let dateFrom_format = this.formatDate(dateFrom);
  //   let dateTo_format = this.formatDate(dateTo);
  //   this.filterMode = true;
  //   return this.funClipList = this.funClipList.filter(FunClip => (
  //     FunClip.date_of_clip >= dateFrom_format && FunClip.date_of_clip <= dateTo_format

  //   ));
  // }
  public findfavoritePages(findClipId:number){
    let pk_id:number      =-1; 
    this.emoji_clip_id    = -1;
    this.favoritePk       = 0;
    this.stars_clip_id    = false;
    const fintMeArray:FavoritePages[] = this.favoritePagesList.filter(findMe => findMe.clip_id==findClipId && findMe.client_id==this.clientID);
    if(fintMeArray.length>0 && fintMeArray[0].fav_pages_id>0){
      let emoji_string:string = fintMeArray[0].rating.toLowerCase();
      pk_id                   = fintMeArray[0].fav_pages_id;
      this.emoji              = "bi bi-emoji-"+emoji_string+"-fill";
      this.emoji_clip_id      = fintMeArray[0].clip_id;
      this.favoritePk         = fintMeArray[0].fav_pages_id;
      this.stars_clip_id      = fintMeArray[0].favorite_pages_status;
    }
    return pk_id;
  }
  public favorites(clip_id: number,favoritePk_value:number,click_element:string, event:any) :void{
    //clicked element
    let getCurentIdValue  = event.target.id;
    let splitID           = getCurentIdValue.split("-");
    let clip_id_split     = splitID[1];
    let favorite_id_split = splitID[2];

    const fintMeArray:FavoritePages[] = this.favoritePagesList.filter(findMe => findMe.clip_id==clip_id && findMe.client_id==this.clientID);
    
    //const starsId             = stars.id.split("-").length>0 ?  stars.id.split("-")[1] :-1;
    const rating              = document.getElementById('rating-'+clip_id);
    //const ratingId             = rating.id.split("-")[1];
    const emoji               = document.getElementById('emoji-'+clip_id+'-'+favoritePk_value);//[NEUTRAL,SMILE,FROWN]
    //const emojiId             = emoji.id.split("-")[1];
    let rating_enum           = "NEUTRAL";//?
    let favorite_pages_status = false;//?

    switch(click_element) { 
        case 'stars': {
          const stars               = document.getElementById('stars-'+clip_id_split+'-'+favorite_id_split);//[true,false]
            if (stars != null) {
              if(stars.classList.contains("text-warning")){
                stars.classList.remove('text-warning');
                stars.classList.add('text-dark');
              }else{
                stars.classList.remove('text-dark');
                stars.classList.add('text-warning');
                favorite_pages_status = true;
              }
            }
          break; 
        } 
        case 'rating':{
          if (rating != null) {//neutral
              if(rating.classList.contains("text-warning")){
                rating.classList.remove('text-warning');
                emoji.classList.remove('bi-emoji-smile-fill');
                emoji.classList.add('bi-emoji-neutral-fill');
                rating.classList.add('text-dark');
              }else if(emoji.classList.contains("bi-emoji-neutral-fill")){//angry
                emoji.classList.remove('bi-emoji-neutral-fill');
                //rating.classList.remove('text-dark');
                emoji.classList.add('bi-emoji-frown-fill');
                //rating.classList.add('text-dark');
                rating_enum = "FROWN";
              }else{//smile
                emoji.classList.remove('bi-emoji-frown-fill');
                rating.classList.remove('text-dark');
                emoji.classList.add('bi-emoji-smile-fill');
                rating.classList.add('text-warning');
                rating_enum = "SMILE";
              }
            }
          break;
        }
        case 'emoji':  {
          const emojiI               = document.getElementById('emoji-'+clip_id_split+'-'+favorite_id_split);//[NEUTRAL,SMILE,FROWN]
              if(emojiI.classList.contains("bi-emoji-neutral-fill")){//angry
                console.log("Emoji is angry");
                emojiI.classList.remove('bi-emoji-neutral-fill');
                emojiI.classList.add('bi-emoji-frown-fill');
                rating_enum = "FROWN";
              }else{//smile
                console.log("Emoji is smile");
                emojiI.classList.remove('bi-emoji-frown-fill');
               emojiI.classList.add('bi-emoji-smile-fill');
                rating_enum = "SMILE";
              }
        break;
      } 
      default: { 
         //statements; 
         break; 
      } 
   }
  this.favoritePages.clip_id                = clip_id;
  this.favoritePages.client_id              = this.clientID;
  this.favoritePages.rating                 = rating_enum;
  this.favoritePages.favorite_pages_status  = favorite_pages_status;
  this.favoritePages.created_at             = this.transformDateInsert(new Date().toDateString()) ;
  console.log(this.favoritePages);
  //check [add,update,delete]
  if(fintMeArray.length>0){
    //update
    this.favoritePages.fav_pages_id           = fintMeArray[0].fav_pages_id;
    this.favoritePagesService.updateFavoritePages(this.favoritePages,this.favoritePages.fav_pages_id ).subscribe(result => console.log('updated'));
  }else{
    //added
    this.favoritePages.fav_pages_id           = -1;
    this.favoritePagesService.addFavoritePages(this.favoritePages).subscribe(result => console.log('added'));
  }
  }
}