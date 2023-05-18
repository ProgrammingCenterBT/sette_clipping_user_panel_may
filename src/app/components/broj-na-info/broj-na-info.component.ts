import { Component, Inject, NgZone, OnInit, PLATFORM_ID } from '@angular/core';
// amCharts imports
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5plugins_exporting from "@amcharts/amcharts5/plugins/exporting";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ChartsModelClipsByDate } from 'src/app/services/charts/charts-model-clips-by-date';
import { ChartsModelClipsByDateService } from 'src/app/services/charts/charts-model-clips-by-date.service';
//import {FormGroup, FormControl} from '@angular/forms';
//import { Observable } from 'rxjs';
//import { switchMap } from 'rxjs/operators';
import { Encoded } from 'src/app/services/text/logo';

@Component({
  selector: 'app-broj-na-info',
  templateUrl: './broj-na-info.component.html',
  styleUrls: ['./broj-na-info.component.css']
})
export class BrojNaInfoComponent implements OnInit {

  chartModelClipsByDateList: ChartsModelClipsByDate[]=[];
  chartd: ChartsModelClipsByDate;
  showMe: boolean;
  saveXLS: Function;
  savePDF: Function;
  date_of_clip: string;
  clips_per_date: number;
  private data = [];

  imgData: any;

  private root: am5.Root;
  constructor(@Inject(PLATFORM_ID) private platformId, private zone: NgZone,
    private chartsModelClipsByDateService: ChartsModelClipsByDateService, public http: HttpClient) {
    this.chartd = new ChartsModelClipsByDate();
  }

  private returnClipsByDateNumberOfInfo() {
    this.chartsModelClipsByDateService.getClipsByDate().subscribe(response => {this.chartModelClipsByDateList = response;});
 
    // setTimeout(() => {
    //   this.chartsModelClipsByDateService.getClipsByDate().subscribe({     
    //     complete: ()                                    => {console.log("completeHandler");}, // completeHandler
    //     error:    (error: HttpErrorResponse)            => {console.log(error.message); },// errorHandler 
    //     next:(response: ChartsModelClipsByDate[])  => {this.chartModelClipsByDateList = response;console.log(response);}// nextHandler
    //    }
    // );
    // }, 500);
  }
  
 private getDataFromDatabaseBrojNaInfo():any{
  //Vaka ne vrakja forEach not recognized
  let dataArray=[];
  //let dataArray1=[];
  if(!this.chartModelClipsByDateList) {
      console.log("Failed to get ClipsByDate  ");
  } else {
      console.log( this.chartModelClipsByDateList.length + " ClipsByDate found ");
      //if(this.chartModelClipsByDateList.length>0){
        this.chartModelClipsByDateList.forEach(element => {
          dataArray.push({ "Датум": element.date_of_clip, "Број на информации": element.clips_per_date });
         // dataArray1.push({ "Датум": element.date_of_clip, "Број на информации": element.clips_per_date });
        });
     // }
  }
  //console.log(dataArray1);
  //this.setData(dataArray1);
  return dataArray;
}
private setClipsByDateElements():any{
  let dataArray=[];
  if(!this.chartModelClipsByDateList) {
    console.log("No data found");
  } else {
    this.chartModelClipsByDateList.forEach(element => {
      dataArray.push({  "Датум": element.date_of_clip, "Број на информации": element.clips_per_date });
    });
  }
  return dataArray;
}
private determineAvailableClipsByDate( chartModelClipsByDateList: ChartsModelClipsByDate[]) {
  this.chartModelClipsByDateList = chartModelClipsByDateList;
  if (!this.chartModelClipsByDateList ) {
    console.log("Failed to get ClipsByDate");
  } else {
    console.log( this.chartModelClipsByDateList.length + " ClipsByDate found ");
  }
}
  public exportToCSV() {
    let dataArray = [];
    if(!this.chartModelClipsByDateList){
        console.log("No data to export");
      } else{
        this.chartModelClipsByDateList.forEach(element => {
         dataArray.push({
            "Date": element.date_of_clip,
            "Clips per date": element.clips_per_date
          });
        });
      }
      return dataArray;
  }

  private chartRender(root:any){
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    let xRenderer1 = am5xy.AxisRendererX.new(root, {
      minGridDistance: 15
    });

    xRenderer1.labels.template.setAll({
      rotation: -90,
      centerY: am5.p50,
      centerX: 0
    });

    xRenderer1.grid.template.setAll({
      location: 0.5,
      strokeDasharray: [1, 3]
    });
    return xRenderer1;
  }
  private createChart(root:any,am5xy:any){
      // https://www.amcharts.com/docs/v5/charts/xy-chart/
      return root.container.children.push(am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        scrollbarX: am5.Scrollbar.new(root, { orientation: "horizontal" }),
        scrollbarY: am5.Scrollbar.new(root, { orientation: "vertical" }),
        pinchZoomX: true
      })
      );
  }
  private createAxisX(chart:any,root:any){
    // Create axes
      let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
        maxDeviation: 0.3,
        categoryField: "Датум",
        renderer: this.chartRender(root),
        tooltip: am5.Tooltip.new(root, {})
      }));
      return xAxis;
  }
  private createAxisY(chart:any,root:any){
    // Create axes
    let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      maxDeviation: 0.3,
      maxPrecision: 0,
      renderer: am5xy.AxisRendererY.new(root, {})
    }));
    return yAxis;
  }
  // Create series
  private createSeriesLollipopChart(xAxis:any,yAxis:any,series:any,chart:any,root:any){
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    series = chart.series.push(am5xy.ColumnSeries.new(root, {
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "Број на информации",
      categoryXField: "Датум",
      adjustBulletPosition: false,
      tooltip: am5.Tooltip.new(root, {
                  labelText: "Клипови: {valueY}\nДатум: {Датум}"})
    }));
    series.columns.template.setAll({width: 22.5});
    return series;
  }
  private drawLollipopChartChart(xAxis:any,series:any,chart:any,record:any){
    xAxis.data.setAll(record);
    series.data.setAll(record);

  // Make stuff animate on load
  // https://www.amcharts.com/docs/v5/concepts/animations/
  series.appear(1000);
  chart.appear(1000, 100);
}

ngOnInit(): any {
    //https://ej2.syncfusion.com/angular/documentation/chart/how-to/database-data
    //https://groups.google.com/g/angular/c/ChWutwjqMFY
    //https://stackoverflow.com/questions/48116032/angular5-same-variable-in-html-and-in-component-is-different
    //https://angular.io/guide/observables
    this.returnClipsByDateNumberOfInfo();
   //this.returnClipsByDateNumberOfInfo().subscribe( data=>this.determineAvailableClipsByDate(data) );
}

   // Run the function only in the browser
   browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {f();});
    }
  }

  //Raboti bez nikakov problem i vrakja informacii od baza i gi zapisuva vo chart
  ngAfterViewInit() {

    // Chart code goes in here
    this.browserOnly(() => {
     
      // Set data
      ///let data=[];
      let sourceData = this.setClipsByDateElements();
      //let data =sourceData;
      let data = [{"Датум":"28.01.2023","Број на информации": 2},{"Датум":"29.05.2022","Број на информации": 2},{"Датум":"30.03.2023","Број на информации": 68}];
      let root = am5.Root.new("chartdiv");
      let responsive = am5themes_Responsive.newEmpty(root);

      responsive.addRule({
        name: "yAxis",
        relevant: function(width, height) {return width < am5themes_Responsive.XS;},
        settings: {inside: true}
      });

      root.setThemes([am5themes_Animated.new(root), responsive]);
      // Create chart
      // https://www.amcharts.com/docs/v5/charts/xy-chart/
      let chart = this.createChart(root,am5xy);
      chart.get("colors").set("step", 3);
      
      
      // Add cursor
      // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
      let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
      cursor.lineY.set("visible", false);

      // Create axes
      // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
      let xAxis = this.createAxisX(chart,root);
      let yAxis = this.createAxisY(chart,root);
      let series:any;
  
      //this.data=this.getDataFromDatabaseBrojNaInfo();     
      //data = this.setClipsByDateElements();

      // Create series
      // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
      series=this.createSeriesLollipopChart(xAxis,yAxis,series,chart,root);
      this.drawLollipopChartChart(xAxis,series,chart,data);

    var exporting = am5plugins_exporting.Exporting.new(root, {
      menu: am5plugins_exporting.ExportingMenu.new(root, {}),
      filePrefix: "sette-export-analytics",
      dataSource: this.data,
      pdfOptions: {
          pageMargins: [30, 15, 15, 65],
          pageOrientation: "portrait",
          pageSize: "A4",
          includeData: false
      },
      pdfdataOptions: {
          addColumnNames: false,
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


    //Tables and excel
    
    let bodyData =[];

    sourceData.forEach(function(sourceRow){
      let dataRow =[];

      dataRow.push(sourceRow["Датум"]);
      dataRow.push(sourceRow["Број на информации"]);
      bodyData.push(dataRow);
    });


  exporting.events.on("pdfdocready", function(event) {
    // Add title to the beginning
    event.doc.content.unshift({
      text: "Број на информации по датум",
      margin: [0, 16],
       style: {
         fontSize: 15,
         bold: true,
        },
    });

    event.doc.content.unshift({
      image: "data:image/png;base64," + Encoded,
      fit: [119, 54]
    });

    event.doc.content.push({
      table: {
       widths: ["auto", "auto"],
         body: [
            ["Датум", "Број на информации"], //Get data from database and put it bellow
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
  ngOnDestroy() {
    // Clean up root element when the component is removed
    this.browserOnly(() => {
      if (this.root) {
        this.root.dispose();
      }
    });
  }
  toggleTag() {
    this.showMe = !this.showMe;
  }

}