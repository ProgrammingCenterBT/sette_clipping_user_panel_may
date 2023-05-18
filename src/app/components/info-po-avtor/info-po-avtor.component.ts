import { Component, Inject, NgZone, OnInit, PLATFORM_ID } from '@angular/core';
// amCharts imports
import * as am5 from '@amcharts/amcharts5';
//import * as am5xy from '@amcharts/amcharts5/xy';
//import * as am5percent from "@amcharts/amcharts5/percent";
//import * as am5stock from "@amcharts/amcharts5/stock";
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5plugins_exporting from "@amcharts/amcharts5/plugins/exporting";
import { isPlatformBrowser } from '@angular/common';
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";
import { ChartsModelAuthor } from 'src/app/services/charts/charts-model-author';
import { ChartsModelAuthorService } from 'src/app/services/charts/charts-model-author.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Encoded } from 'src/app/services/text/logo';


@Component({
  selector: 'app-info-po-avtor',
  templateUrl: './info-po-avtor.component.html',
  styleUrls: ['./info-po-avtor.component.css']
})
export class InfoPoAvtorComponent implements OnInit{

  chartModelAuthorList: ChartsModelAuthor[];
  charta: ChartsModelAuthor;

  full_name_c: string;
  num_of_authors: number;

  showMe: boolean;

  // private root: am5.Root;
  // private value: number;

  data = [];

  constructor(@Inject(PLATFORM_ID) private platformId, private zone: NgZone,
              private chartsModelAuthorService: ChartsModelAuthorService, public http: HttpClient) {
                this.charta=new ChartsModelAuthor();
   }
   //Charts
   private createTheme(myTheme:any){
    myTheme.rule("RoundedRectangle", ["hierarchy", "node", "shape", "depth1"]).setAll({
      strokeWidth: 2
    });

    myTheme.rule("RoundedRectangle", ["hierarchy", "node", "shape", "depth2"]).setAll({
      fillOpacity: 0,
      strokeWidth: 1,
      strokeOpacity: 0.2
    });

    myTheme.rule("Label", ["node", "depth1"]).setAll({
      forceHidden: true
    });

    myTheme.rule("Label", ["node", "depth2"]).setAll({
      fontSize: 10
    });
    return myTheme;
   }
   private createSeries(container:any,root:any){
    let series1 = container.children.push(
      am5hierarchy.Treemap.new(root, {
        sort: "descending",
        singleBranchOnly: false,
        downDepth: 1,
        upDepth: 0,
        initialDepth: 1,
        valueField: "value",
        categoryField: "name",
        childDataField: "children",
        nodePaddingOuter: 0,
        nodePaddingInner: 0
      })
    );

    series1.get("colors").set("step", 1);
    return series1;
   }
   private getData(){
     //Pomaga da se ostrani greskata so forEach vo console
      if(!this.chartModelAuthorList) {
          console.log("No data");
      } else {
          this.chartModelAuthorList.forEach(element => {
            console.log(this.chartModelAuthorList.length + " ClipsByAuthorsfound ");
            this.data.push({ "Име на автор": element.full_name_c, "Број на клипови по автор": element.num_of_authors });
          });
          return this.data;
      }
   }
   private createChartData(){
    //https://bionicjulia.com/blog/deriving-typescript-union-type-from-array-or-object

     let dataHierarciObject=[{ name: "Root", children: []}];
     //first floor
      //let data12=this.createChartData();
      //data12[0]["children"].push({name: "Ljubisa Javen",value: 40});
      //data12[0]["children"].push({name: "Marjana Javen",value: 40});
      //second floor
     // dataHierarciObject[0]["children"].push({name: "Ljubisa Javen",children: [ {name: "A1",value: 24},{name: "Orbis",value: 14}]});
     if(!this.chartModelAuthorList) {
      console.log("No data");
     } else {
      let inn:number=1;
        this.chartModelAuthorList.forEach(element => {
          let subDataArray:any[]=[];
          //console.log( "in push:" + element.full_name_c + " / ; ");
          let property1=element.full_name_c.toString();
          let str:any;
          let j:number=1;
          let objStruct:{name:string,numebOfMed:number};
          //dataHierarciObject[0]["children"].push({name: element.full_name_c,children: []});
          let childrenObject:any[]=[];
            //Filters
            //this.chartModelAuthorList => avtor so medum
            for(let i=0;i<this.chartModelAuthorList.length;i++){
              if(property1=this.chartModelAuthorList[i].full_name_c){
                let str1:string="JAVA"+j;let num:number=i*2;
               // childrenObject.push({name:str1,value:this.chartModelAuthorList[i].num_of_authors});
                childrenObject.push({name:str1,value:num});
                j++;
              }
            }

            dataHierarciObject[0]["children"].push({name: element.full_name_c, children: childrenObject});
            inn*=2;
            //dataHierarciObject[0]["children"].push({name: element.full_name_c, value: inn});//ispravno
            console.log("Struct "+j);
            console.log(dataHierarciObject);
          //   //dataArray.push({ brand: "author", model: element.full_name_c, value: element.num_of_authors });

          //   //dataArray.push(element.full_name_c:[{value: element.num_of_authors }]);
          //   // dataArray.push({ LjubishaPopovski: {Java: 35694,MySql: 51257,Bubec: 58654}});
          //var userTestStatus: Array<{ id: number, name: string }> = Array(
          //     { "id": 0, "name": "Available" },
          //     { "id": 1, "name": "Ready" },
          //     { "id": 2, "name": "Started" }
          // );
        });
      return dataHierarciObject;
    }

   }
   private returnClipsByAuthor(): any {
    // this.chartsModelAuthorService.return_clips_by_author().subscribe(
    //   (response: ChartsModelAuthor[]) => {
    //     this.chartModelAuthorList = response;
    //   },
    //   (error: HttpErrorResponse) => {
    //     alert(error.message);
    //   }
    // );
    // this.chartsModelAuthorService.return_clips_by_author().subscribe({
    //   complete: ()                               => {console.log("completeHandler");}, // completeHandler
    //   error:    (error: HttpErrorResponse)       => {console.log(error.message); },// errorHandler 
    //   next:     (response: ChartsModelAuthor[])  => { this.chartModelAuthorList = response;}// nextHandler
    // });
    this.chartsModelAuthorService.return_clips_by_author().subscribe(response => {this.chartModelAuthorList = response;});
  }
  // public processData(data) {
  //   let treeData = [];

  //   let smallBrands = { name: "Other", children: [] };

  //   am5.object.eachOrdered(
  //     data,
  //     (brand) => {
  //       let brandData = { name: brand, children: [] };
  //       let brandTotal = 0;
  //       for (var model in data[brand]) {
  //         brandTotal += data[brand][model];
  //       }

  //       for (var model in data[brand]) {
  //         // do not add very small
  //         if (data[brand][model] > 100) {
  //           brandData.children.push({ name: model, value: data[brand][model] });
  //         }
  //       }

  //       // only bigger brands
  //       if (brandTotal > 200000) {
  //         treeData.push(brandData);
  //       }
  //     },
  //     (a, b) => {
  //       let aval = 0;
  //       let bval = 0;
  //       am5.object.each(data[a], (key, val) => (aval += val));
  //       am5.object.each(data[b], (key, val) => (bval += val));
  //       if (aval > bval) return -1;
  //       if (aval < bval) return 1;
  //       return 0;
  //     }
  //   );

  //   return [{
  //     name: "Home",
  //     children: treeData
  //   }];
  // }

  determineAvailableClipsByAuthor( chartModelAuthorList: ChartsModelAuthor[]) {
    this.chartModelAuthorList = chartModelAuthorList;

    if (!this.chartModelAuthorList ) {
      console.log("Failed to get ClipsByAuthor");
    } else {
      console.log( this.chartModelAuthorList.length + " ClipsByAuthorsfound ");
    }
  }

   ngOnInit(): any {

    //Ova vrakja subscribe properties of undefined
    this.returnClipsByAuthor().subscribe( data=>this.determineAvailableClipsByAuthor(data) );
  }

  // Run the function only in the browser
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

ngAfterViewInit(){
  this.browserOnly(() => {

  /* Chart code */
  // Create root element
  // https://www.amcharts.com/docs/v5/getting-started/#Root_element
  let root = am5.Root.new("chartdiv");

  const myTheme = am5.Theme.new(root);
  this.createTheme(myTheme);
  root.setThemes([ am5themes_Animated.new(root), myTheme]);

  // Create wrapper container
  let container = root.container.children.push(
    am5.Container.new(root, {
      width: am5.percent(100),
      height: am5.percent(100),
      layout: root.verticalLayout
    })
  );

  // Create series
  // https://www.amcharts.com/docs/v5/charts/hierarchy/#Adding
  let series = this.createSeries(container,root);
  container.children.moveValue(
    am5hierarchy.BreadcrumbBar.new(root, {
      series: series
    }), 0
  );

// Generate and set data
// https://www.amcharts.com/docs/v5/charts/hierarchy/#Setting_data
//console.log("Ljubisa data");
//let data1 =this.createChartData();
//console.log(data);
// let data = {
//   Acura: {ILX: 11757,MDX: 54886,NSX: 581,TLX: 34846},
//   "Alfa Romeo": { "4C": 407, Giulia: 8903, Stelvio: 2721 },
//   Audi: {A3: 20733,"A3 e-tron": 2877,A4: 37674,A5: 21301,A6: 16304,R8: 772,TT: 2294},
//   Bentley: {Bentayga: 1152,"Continental GT": 898,"Flying Spur": 257, Mulsanne: 98 },
//   BMW: {"2-Series": 11737,"3-Series": 59449,"4-Series": 39634,"5-Series": 40658,"6-Series": 3355,"7-Series": 9276,i3: 6276,i8: 488,Z4: 502},
//   Buick: {Cascada: 5595,Enclave: 48564,Encore: 88035,Verano: 4277},
//   Ford: {"C-Max": 18390, Edge: 142603,Escape: 308296,"E-Series": 53304,Expedition: 51883,Explorer: 271131,Fiesta: 46249, Flex: 22389,Focus: 158385,"F-Series": 896764,Fusion: 209623,"Transit Connect": 34473},
//   Genesis: { G80: 16196, G90: 4398 },
//   Lexus: {CT: 4690,ES: 51398,GS: 7773,GX: 27190,IS: 26482,LC: 2487},
//   Lincoln: {Continental: 12012,MKC: 27048,MKS: 153, MKT: 3005,MKX: 31031,MKZ: 27387,Navigator: 10523},
//   Maserati: { Ghibli: 5531, GranTurismo: 1018,Levante: 5448,Quattroporte: 1700},
//   Mazda: {3: 75018,5: 10,6: 33402,"CX-3": 16355,"CX-5": 127563,"CX-9": 25828, "MX-5 Miata": 11294},
//   "Mercedes-Benz": {"B-Class": 744, "C-Class": 77447,"CLA-Class": 20669,"SLC-Class": 2860,"SL-Class": 2940,Sprinter: 27415},
//   Mini: { Cooper: 32232, Countryman: 14864, Paceman: 9 },
//   Mitsubishi: {"i MiEV": 6,Lancer: 12725,Mirage: 22386,Outlander: 35310,"Outlander PHEV": 99,"Outlander Sport": 33160},
//   Nissan: {"370Z": 4614, Altima: 254996, Armada: 35667,Frontier: 74360,"GT-R": 578,Juke: 10157, Leaf: 11230,Maxima: 67627,Murano: 76732, NV: 17858, NV200: 18602,Pathfinder: 81065, Xterra: 1},
//   Porsche: {911: 8970,Boxster: 2287,Cayenne: 13203,Cayman: 2800, Macan: 21429,Panamera: 6431},
//   Smart: { Fortwo: 3071 },
//   Subaru: {BRZ: 4131, Crosstrek: 110138,Forester: 177563,Impreza: 117401},
//   Tesla: { "Model 3": 2320, "Model S †": 28800, "Model X †": 24000 },
//   Toyota: {"4Runner": 128296,"86/Scion FR-S": 6846,Avalon: 32583,Camry: 387081,"C-HR": 25755, Corolla: 329196,"FJ Cruiser": 4,Highlander: 215775,"Land Cruiser": 3100, Mirai: 1838,Prius: 108662,RAV4: 407594,Sequoia: 12156},
//   Volvo: { S60: 16825, S80: 7, S90: 11090, XC60: 22516, XC90: 30996 }
// };


// let data12=[
//   { name: "Root", children: [
//                                 {name: "Ljubisa Popovski", children: [
//                                                           {name: "A1", value:12},
//                                                           {name: "Sitel", value: 27}
//                                                         ]
//                                 }, {name: "marijana", children: [
//                                                           {name: "A1",value: 9},
//                                                           {name: "telma",  value: 2}
//                                                         ]
//                                 }, { name: "C0", children: [
//                                                             {name: "C2A0A2",value: 24},
//                                                             {name: "C2A0B2", value: 89}
//                                                            ]
//                                  }, {name: "C2C1",children: [
//                                                               {name: "C2C2A2", alue: 166},
//                                                               {name: "C2C2B2",value: 66}
//                                                              ]
//                                     }, {name: "C2B1",value: 40},
//                                        {name: "C2B2",value: 20}
//                               ]
// }];
//first floor
let data12=this.createChartData();
// data12[0]["children"].push({name: "Ljubisa Javen",value: 40});
// data12[0]["children"].push({name: "Marjana Javen",value: 40});
// //second floor
// data12[0]["children"].push({name: "Ljubisa Javen",children: [ {name: "A1",value: 24},{name: "Orbis",value: 14}]});
series.data.setAll(data12);

///series.data.setAll(this.processData(data));
series.set("selectedDataItem", series.dataItems[0]);

series.bullets.push(function (root, series, dataItem) {
  let depth = dataItem.get("depth");

  if (depth == 1) {
    let picture = am5.Picture.new(root, {
      src: "https://www.amcharts.com/wp-content/uploads/assets/logos/slika.png",
      centerX: am5.p50,
      centerY: am5.p50,
      width: am5.percent(30),
      isMeasured: true
    });

    picture.states.lookup("default").setAll({ opacity: 0.15 });

    return am5.Bullet.new(root, { sprite: picture });
  }
});

      let sourceData = this.getData();
      let bodyData =[];

      sourceData.forEach(function(sourceRow){
        let dataRow =[];

        dataRow.push(sourceRow["Име на автор"]);
        dataRow.push(sourceRow["Број на клипови по автор"]);

        bodyData.push(dataRow);
      });

      console.log(bodyData);

     // Add export menu
     let exporting = am5plugins_exporting.Exporting.new(root, {
      menu: am5plugins_exporting.ExportingMenu.new(root, {}),
      filePrefix: "sette-info-avtor-chart",
        dataSource: this.getData(),
        pdfOptions: {
          includeData: false,
          pageMargins: [15, 15, 15, 15],
          pageOrientation: "portrait",
          pageSize: "A4",
        },
        pdfdataOptions: {
          addColumnNames: true,
          disabled: true
        },
        xlsxOptions: {
          disabled: false,
          addColumnNames: true,
        },
        csvOptions: {
          disabled: false,
          addColumnNames: true,
          useLocale: true
        },
        pngOptions: {
          disabled: false,
        },
        jpgOptions: {
          disabled: false,
        },
        printOptions: {
          disabled: false,
        },
        htmlOptions: {
          disabled: false,
        },
        jsonOptions: {
          disabled: false,
        },
    });


    exporting.events.on("pdfdocready", function(event) {

      // Add title to the beginning
      event.doc.content.unshift({
        text: "% застапеност на информации по автор",
        margin: [0, 16],
        style: {
          fontSize: 15,
          bold: true,
        }
      });

      event.doc.content.unshift({
        image: "data:image/png;base64," + Encoded,
        fit: [119, 54]
      });

      event.doc.content.push({
        table: {
         widths: ["auto", "auto"],
           body: [
            ["Име на автор", "Број на клипови по автор"],
            ...bodyData
           ]
          },
          margin: [ 0, 12 ],
          style: {
            fontSize: 12,
          },
          columnGap: 30
        });



    });


});
}
toggleTable() {
  this.showMe = !this.showMe;
}
}