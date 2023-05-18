import {  Component, Inject, NgZone, OnInit, PLATFORM_ID } from '@angular/core';

// amCharts imports
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5plugins_exporting from "@amcharts/amcharts5/plugins/exporting";
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ChartModelMediumType } from 'src/app/services/charts/charts-model-medium-type';
import { ChartsModelMediumTypeService } from 'src/app/services/charts/charts-model-medium-type.service';
import { Encoded } from 'src/app/services/text/logo';

@Component({
  selector: 'app-info-po-medium-percent',
  templateUrl: './info-po-medium-percent.component.html',
  styleUrls: ['./info-po-medium-percent.component.css']
})
export class InfoPoMediumPercentComponent implements OnInit {

  chartModelMediumTypeList: ChartModelMediumType[];
  chartpie: ChartModelMediumType;

  medium_type_name: string;
  num_of_mediums: number;

  showMe: boolean;

  data=[];

  constructor(@Inject(PLATFORM_ID) private platformId, private zone: NgZone,
    private chartsModelMediumTypeService: ChartsModelMediumTypeService, public http: HttpClient) {
    this.chartpie = new ChartModelMediumType();
  }
  private exportDataPercentMedium(){
    let dataArray = [];
    //if(!this.chartPieMedList){
    if(!this.chartModelMediumTypeList){
      console.log('No data found for exporting')
    } else{
     // this.chartPieMedList.forEach(element =>{
    this.chartModelMediumTypeList.forEach(element =>{
        dataArray.push({
          "medium_name": element.medium_type_name,
          "vkupna brojka": element.num_of_mediums
        })
      })
    }
    return dataArray;
  }
  //charts
  private chartChart(root:any){
    // Create chart
      // https://www.amcharts.com/docs/v5/charts/percent-charts/sliced-chart/
      let chart = root.container.children.push(
        am5percent.SlicedChart.new(root, {
          layout: root.verticalLayout
        })
      );
      return chart;
  }
  private createSeries(chart:any,root:any){
    let series = chart.series.push(
      am5percent.FunnelSeries.new(root, {
        alignLabels: false,
        orientation: "horizontal",
        valueField: "value",
        categoryField: "category",
        bottomRatio: 1
      })
    );
    return series;
  }
  private drawChart(series:any,records:any){
    series.data.setAll(records);

    // Play initial series animation
    // https://www.amcharts.com/docs/v5/concepts/animations/#Animation_of_series
    series.appear();
  }
  private createLegend(series:any,chart:any,root:any){
    let legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50,
        marginTop: 15,
        marginBottom: 15
      })
    );

    legend.data.setAll(series.dataItems);
  }
  private getDataFromDatabase(){
    
    // if (!this.chartModelMediumTypePercentList) {
    //   console.log("No data found");
    //   this.ChartsModelMediumTypeService.getMediumsType().subscribe(
    //       (response: ChartModelMediumType[]) => {
    //         //if(response.length>0){
    //           this.chartModelMediumTypePercentList = response;
    //          var i=0;
    //          console.log(this.chartModelMediumTypePercentList);
    //          let dataArray:any[]=[];
    //           this.chartModelMediumTypePercentList.forEach(element => {
    //             //dataArray.push({value: 10-i,category: ("One"+i)});
    //                 dataArray.push({value: 10-i,category: element.medium_type_name.toString() });
    //                  i++;
    //           });
    //           return dataArray;
    //       // }
    //       },
    //       (error: HttpErrorResponse) => {
    //         alert(error.message);
    //       }
    //     );
    // } else {
    //      var i=0;
    //      let dataArray:any[]=[];
    //       this.chartModelMediumTypePercentList.forEach(element1 => {
    //         //this.dataPercent.push({value: 10-i,category: ("One"+i)});
    //         dataArray.push({value: 10-i,category: element1.medium_type_name.toString() });
    //           i++;
    //       });
    //       return dataArray;
    //    // }
       
    //   }
    var data=[];
    this.chartsModelMediumTypeService.getMediumsType().subscribe(
      (response: ChartModelMediumType[]) => {
        if(response.length>0){
          this.chartModelMediumTypeList = response;
         var i=0;
         
          this.chartModelMediumTypeList.forEach(element => {
            data.push({value: 10-i,category: ("One"+i)});
                // data12.push({value: 10-i,category: element.medium_type_name.toString() });
                 i++;
          });
          return data;
       }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
    // let data12:any=[];
    // console.log("BABAB");
    // console.log(this.chartModelMediumTypeList);
    // if(!this.chartModelMediumTypeList){
    //   console.log("Failed to get mediums for Pie Chart");
    // } else{
    //   if(this.chartModelMediumTypeList.length>0){
    //     console.log("Mora");
    //     console.log(this.chartModelMediumTypeList);
    //     this.chartModelMediumTypeList.forEach(element => {
    //       data12.push({value: element.num_of_mediums,category: element.medium_type_name});
    //     });
    //   }
    // }
    
    var data12=[
      { value: 10, category: "One" },
      { value: 9, category: "Two" },
      { value: 6, category: "Three" },
      { value: 5, category: "Four" },
      { value: 4, category: "Five" },
      { value: 3, category: "Six" },
      { value: 1, category: "Seven" }
    ];
   console.log(data12);
    console.log(data12.length+" / "+data.length);
    console.log(data);
    return data;
  }
  private returnListOfMediumTypePercent(): any {
    // this.chartsModelMediumTypeService.getMediumsType().subscribe({
    //   complete: ()                                    => {console.log("completeHandler11");}, // completeHandler
    //   error:    (error: HttpErrorResponse)            => {console.log(error.message); },// errorHandler 
    //   next:     (response: ChartModelMediumType[])  => { this.chartModelMediumTypeList = response;}// nextHandler
    // });
    // this.ChartsModelMediumTypeService.getMediumsType().subscribe(
    //   (response: ChartModelMediumType[]) => {
    //     this.chartModelMediumTypePercentList = response;
    //   },
    //   (error: HttpErrorResponse) => {
    //     alert(error.message);
    //   }
    // );
    this.chartsModelMediumTypeService.getMediumsType().subscribe((response: ChartModelMediumType[]) => {this.chartModelMediumTypeList=[];this.chartModelMediumTypeList.push(...response);});
  
  }
  ngOnInit(): any {
    //Vrakja greska vo console poradi subscribe
    this.returnListOfMediumTypePercent().subscribe( 
      {
        complete: (data:ChartModelMediumType[]) => {this.determineAvailableNumberOfMediumTypePercent(data) ;}, // completeHandler
        error:    (error:any)                     => {console.log(error.message); },// errorHandler 
        next:     (data:ChartModelMediumType[]) => {this.determineAvailableNumberOfMediumTypePercent(data); }
      });
  }
  determineAvailableNumberOfMediumTypePercent( chartModelMediumTypeList: ChartModelMediumType[]) {
    //console.log("Ljubisa OnInit-determineAvailableNumberOfMediumType");
    this.chartModelMediumTypeList = chartModelMediumTypeList;
    if (!this.chartModelMediumTypeList ) {
      console.log("Failed to get mediums for Pie Chart");
    } else {
      console.log( this.chartModelMediumTypeList.length + " Pie chart mediums ");
    }
  }

  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {f();});
    }
  }

  ngAfterViewInit() {
    //Ovaj chart ke se prikazi samo dokolku se iskomentira typescript info-po-medium
    //A gi zapusiva vo chart podatocite od baza bez problem

    // Chart code goes in here
    this.browserOnly(() => {

      //Export to CSV
      const btn: HTMLElement = document.getElementById('export5');
      btn.addEventListener('click', () => {
       // CsvDataService.exportToCsv('sette-medium-percent.csv', this.exportDataPercentMedium());
      });

      let root = am5.Root.new("chartdiv5");
      root.setThemes([am5themes_Animated.new(root)]);

      // Create chart
      // https://www.amcharts.com/docs/v5/charts/percent-charts/sliced-chart/
      let chart = this.chartChart(root);

      // Create series
      // https://www.amcharts.com/docs/v5/charts/percent-charts/sliced-chart/#Series
      let series = this.createSeries(chart,root);

      // Set data
      // https://www.amcharts.com/docs/v5/charts/percent-charts/sliced-chart/#Setting_data
      var data=this.getDataFromDatabase();
      console.log("ke nacrta");
      console.log(data);
      // Play initial series animation
      // https://www.amcharts.com/docs/v5/concepts/animations/#Animation_of_series
      //series.appear();

      this.drawChart(series,data);

      // Create legend
      // https://www.amcharts.com/docs/v5/charts/percent-charts/legend-percent-series/
      this.createLegend(series,chart,root);
      // Make stuff animate on load
      // https://www.amcharts.com/docs/v5/concepts/animations/
      chart.appear(1000, 100);


         // Add export menu
         let exporting = am5plugins_exporting.Exporting.new(root, {
          menu: am5plugins_exporting.ExportingMenu.new(root, {}),
          filePrefix: "sette-lollipop-chart",
            title: "Sette Analytics Lollipop Chart",
            dataSource: this.getDataFromDatabase(),
            pdfOptions: {
              includeData: true,
              pageMargins: [15, 15, 15, 15],
              pageOrientation: "portrait",
              pageSize: "A4",
            },
            pdfdataOptions: {
              addColumnNames: true,
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



        // exporting.events.on("pdfdocready", function(event) {
        //   // Add title to the beginning
        //   event.doc.content.unshift({
        //     text: "Bar Chart",
        //     margin: [0, 30],
        //     style: {
        //       fontSize: 20,
        //       bold: true,
        //     }
        //   });

        //   event.doc.content.unshift({
        //     image: "data:image/png;base64," + Encoded,
        //     fit: [119, 54]
        //   });
        // });

    });
  }

  toggleTag() {
    this.showMe = !this.showMe;
  }
}