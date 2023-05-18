import { Component, Inject, NgZone, OnInit, PLATFORM_ID } from '@angular/core';
// amCharts imports
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5plugins_exporting from "@amcharts/amcharts5/plugins/exporting";
import { isPlatformBrowser } from '@angular/common';
import { ChartsModelTagByMedium } from 'src/app/services/charts/charts-model-tag-by-medium';
import { ChartsModelTagByMediumService } from 'src/app/services/charts/charts-model-tag-by-medium.service';
import { Encoded } from 'src/app/services/text/logo';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CsvDataService } from 'src/app/services/exporting/csv-data.service';

@Component({
  selector: 'app-info-tag-medium',
  templateUrl: './info-tag-medium.component.html',
  styleUrls: ['./info-tag-medium.component.css']
})
export class InfoTagMediumComponent implements OnInit {

  chartTagMediumsList: ChartsModelTagByMedium[];
  charttbm: ChartsModelTagByMedium;

  medium_type_name: string;
  tag_name_c: string;
  num_of_medium_type: number;

  showMe: boolean;

  //private root: am5.Root;
  //private value: number;

  data = [];

  constructor(@Inject(PLATFORM_ID) private platformId, private zone: NgZone,
              private chartsModelTagByMediumService: ChartsModelTagByMediumService, public http: HttpClient) {
                this.charttbm=new ChartsModelTagByMedium();
    }
  //Charts
  private createAxisX(chart:any,am5xy:any,root:any){
    return chart.xAxes.push(am5xy.CategoryAxis.new(root, {
                            categoryField: "year",
                            renderer: am5xy.AxisRendererX.new(root, {
                              cellStartLocation: 0.1,
                              cellEndLocation: 0.9
                            }),
                            tooltip: am5.Tooltip.new(root, {})
    }));
  }
  private createAxisY(chart:any,am5xy:any,root:any){
    return chart.yAxes.push(am5xy.ValueAxis.new(root, {
      min: 0,
      renderer: am5xy.AxisRendererY.new(root, {})
    }));
  }
  private createStackedClusteredChart(am5xy:any,root:any){
    return root.container.children.push(am5xy.XYChart.new(root, {
      panX: false,
      panY: false,
      wheelX: "panX",
      wheelY: "zoomX",
      layout: root.verticalLayout
    }));
  }
  // Add series
  private makeSeries(chart:any,name:any,xAxis:any,yAxis:any, fieldName:any, stacked:any,root:any,record:any,legend:any) {
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
        let series = chart.series.push(am5xy.ColumnSeries.new(root, {
          stacked: stacked,
          name: name,
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: fieldName,
          categoryXField: "year"
        }));

        series.columns.template.setAll({
          tooltipText: "{name}, {categoryX}:{valueY}",
          width: am5.percent(90),
          tooltipY: am5.percent(10)
        });
        series.data.setAll(record);

        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        series.appear();

        series.bullets.push(function () {
          return am5.Bullet.new(root, {
            locationY: 0.5,
            sprite: am5.Label.new(root, {
              text: "{valueY}",
              fill: root.interfaceColors.get("alternativeText"),
              centerY: am5.percent(50),
              centerX: am5.percent(50),
              populateText: true
            })
          });
        });

        return legend.data.push(series);
  }

  private exportDataTagMedium(){
    let dataArray=[];
    if(!this.chartTagMediumsList) {
      console.log("No data found");
    } else {
      this.chartTagMediumsList.forEach(element => {
        dataArray.push({medium_type_name: element.medium_type_name, tag_name: element.tag_name_c, total_num: element.num_of_medium_type, });
      });
    }
    return dataArray;
  }

  private returnTagsByMedium(): any {
    // this.chartsModelTagByMediumService.getClipsTagByMedium().subscribe({
    //   complete: ()                                    => {console.log("completeHandler");}, // completeHandler
    //   error:    (error: HttpErrorResponse)            => {console.log(error.message); },// errorHandler 
    //   next:     (response: ChartsModelTagByMedium[])  => { this.chartTagMediumsList = response;}// nextHandler
    // });
    
    this.chartsModelTagByMediumService.getClipsTagByMedium().subscribe((response: ChartsModelTagByMedium[]) => {this.chartTagMediumsList=[];this.chartTagMediumsList.push(...response);});
  }
  determineAvailableTagsByMedium( chartTagMediumsList: ChartsModelTagByMedium[]) {
      this.chartTagMediumsList = chartTagMediumsList;
      if (!this.chartTagMediumsList ) {
        console.log("Failed to get ClipsByAuthor");
      } else {
        console.log( this.chartTagMediumsList.length + " ClipsByMediumfound ");
      }
  }
  private pushRecodtToChart(dataList:any){
    let dataArray=[];
    if(!dataList){
      console.log("No data");
    }else{
      dataList.forEach(element => {
        dataArray.push({
          "year": element.medium_type_name,
          "europe": element.num_of_medium_type,
          "namerica": element.num_of_medium_type,
          "asia": element.num_of_medium_type,
          "lamerica": element.num_of_medium_type,
          "meast": element.num_of_medium_type,
          "africa": element.num_of_medium_type
        });
      });
    }
    return dataArray;
  }
  private getDataFromDB(){
    let dataArray=[];
    if(!this.chartTagMediumsList ){
      console.log("No data");
    }else{
      this.chartTagMediumsList .forEach(element => {
        dataArray.push({
          "year": element.medium_type_name,
          "europe": element.num_of_medium_type,
          "namerica": element.num_of_medium_type,
          "asia": element.num_of_medium_type,
          "lamerica": element.num_of_medium_type,
          "meast": element.num_of_medium_type,
          "africa": element.num_of_medium_type
        });
      });
    }
    return dataArray;
  }
  ngOnInit(): any {
    //Vrakja greska vo console za subscribe
      this.returnTagsByMedium().subscribe( 
        {
          complete: (data:ChartsModelTagByMedium[]) => {this.determineAvailableTagsByMedium(data) ;}, // completeHandler
          error:    (error:any)                     => {console.log(error.message); },// errorHandler 
          next:     (data:ChartsModelTagByMedium[]) => {this.determineAvailableTagsByMedium(data); }
        });
  }

  // Run the function only in the browser
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => { f();});
    }
  }

  ngAfterViewInit() {

    // Chart code goes in here
    this.browserOnly(() => {


      // Create root element
      // https://www.amcharts.com/docs/v5/getting-started/#Root_element
      
      let root = am5.Root.new("chartdiv3");

      // Set themes
      // https://www.amcharts.com/docs/v5/concepts/themes/
      root.setThemes([am5themes_Animated.new(root)]);

      // Create chart
      // https://www.amcharts.com/docs/v5/charts/xy-chart/
      let chart = this.createStackedClusteredChart(am5xy,root);

      // Add legend
      // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
      let legend = chart.children.push(am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50
      }));

      let dataArray=this.getDataFromDB();
      console.log("Ej raboti");
      console.log(dataArray);
      let data = [{
        "year": "2021",
        "europe": 3,
        "namerica": 2,
        "asia": 2,
        "lamerica": 1,
        "meast": 0.8,
        "africa": 0.4
      }, {
        "year": "2022",
        "europe": 2.6,
        "namerica": 2.7,
        "asia": 2.2,
        "lamerica": 0.5,
        "meast": 0.4,
        "africa": 0.3
      }, {
        "year": "2023",
        "europe": 2.8,
        "namerica": 2.9,
        "asia": 2.4,
        "lamerica": 0.3,
        "meast": 0.9,
        "africa": 0.5
      }];
      //console.log("Ljubisa : "+this.chartTagMediumsList.length);
      // for(let i = 0; i < this.chartTagMediumsList.length; i++) {
      //   if(this.medium_type_name != this.chartTagMediumsList[i].medium_type_name) {
      //   this.data.push({"year": this.chartTagMediumsList[i].medium_type_name});
      //   }
      //   for(let j = i; j < this.chartTagMediumsList.length; j++) {
      //     if (this.chartTagMediumsList[i].medium_type_name == this.chartTagMediumsList[j].medium_type_name) {
      //       this.data.push({
      //         "europe": this.chartTagMediumsList[j].num_of_medium_type,
      //         "namerica": 2.7,
      //         "asia": 2.2,
      //         "lamerica": 0.5,
      //         "meast": 0.4,
      //         "africa": 0.3
      //       });
      //     }
      //   }
      // }

      //////======>>>>>>>
      // Create axes
      // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
      let xAxis = this.createAxisX(chart,am5xy,root);
      xAxis.data.setAll(data);
      let yAxis = this.createAxisY(chart,am5xy,root);

      this.makeSeries(chart,"Економија",xAxis,yAxis, "europe", true,root,data,legend);
      this.makeSeries(chart,"Политика",xAxis,yAxis, "namerica", true,root,data,legend);
      this.makeSeries(chart,"Познати Личности",xAxis,yAxis, "asia", true,root,data,legend);

      // Make stuff animate on load
      // https://www.amcharts.com/docs/v5/concepts/animations/
      chart.appear(1000, 100);

       // Add export menu
       let exporting = am5plugins_exporting.Exporting.new(root, {
        menu: am5plugins_exporting.ExportingMenu.new(root, {}),
        filePrefix: "sette-info-tag-medium",
          title: "Sette Analytics - Bars Chart",
          dataSource: this.pushRecodtToChart(this.chartTagMediumsList),
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
  toggleTag() {this.showMe = !this.showMe;}
}