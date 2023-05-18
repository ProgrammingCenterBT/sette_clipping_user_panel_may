import { Component, Inject, NgZone, OnInit, PLATFORM_ID } from '@angular/core';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5plugins_exporting from "@amcharts/amcharts5/plugins/exporting";
import { isPlatformBrowser } from '@angular/common';
import { ChartsModelMedium } from 'src/app/services/charts/charts-model-medium';
import { ChartsModelMediumService } from 'src/app/services/charts/charts-model-medium.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ChartsModelClipsByMediumMediumType } from 'src/app/services/charts/charts-model-clips-by-medium-medium-type';
import { ChartsModelClipsByMediumMediumTypeService } from 'src/app/services/charts/charts-model-clips-by-medium-medium-type.service';
import { CsvDataService } from 'src/app/services/exporting/csv-data.service';
import { Encoded } from 'src/app/services/text/logo';


@Component({
  selector: 'app-partitioned-bar-chart',
  templateUrl: './partitioned-bar-chart.component.html',
  styleUrls: ['./partitioned-bar-chart.component.css']
})
export class PartitionedBarChartComponent {
  public chartModelMediumByMediumsList: ChartsModelClipsByMediumMediumType[];
  chartm: ChartsModelClipsByMediumMediumType

  medium_type_name: string;
  medium_name: string;
  num_of_mediums: number;

  showMe: boolean;

  data = [];

  private root: am5.Root;
  private value: number;

  constructor(@Inject(PLATFORM_ID) private platformId, private zone: NgZone,
    private chartModelClipsByMediumMediumTypeService: ChartsModelClipsByMediumMediumTypeService, public http: HttpClient) {
    this.chartm = new ChartsModelClipsByMediumMediumType();
  }

  ngOnInit(): any {
      this.returnClipsByMediumByMediumType().subscribe(data => this.determineAvailableClipsByMediumByMediumType(data));
  }

  public returnClipsByMediumByMediumType(): any {
    // this.chartModelClipsByMediumMediumTypeService.getMediumByMediumType().subscribe(
    //   {
    //     next:     (response: ChartsModelClipsByMediumMediumType[])  => {this.chartModelMediumByMediumsList = response;},
    //     error:    (error:HttpErrorResponse)                         => {console.log(error.message);},// errorHandler 
    //     complete: ()                                                => {console.log("completeHandler");} // completeHandler
    //   }
    // );
    
    this.chartModelClipsByMediumMediumTypeService.getMediumByMediumType().subscribe((response: ChartsModelClipsByMediumMediumType[]) => {this.chartModelMediumByMediumsList=[];this.chartModelMediumByMediumsList.push(...response);});
  }

  public getDataMedium(){
    let dataArray=[];
    if(!this.chartModelMediumByMediumsList) {
      console.log("No data found");
    } else {
      this.chartModelMediumByMediumsList.forEach(element => {
        dataArray.push({"Име на медиум": element.medium_name, "Тип на медиум": element.medium_type_name, "Број на информации по медиум": element.num_of_mediums });
      });
    }
    return dataArray;
}

  determineAvailableClipsByMediumByMediumType(chartModelMediumByMediumsList: ChartsModelClipsByMediumMediumType[]) {
     this.chartModelMediumByMediumsList = chartModelMediumByMediumsList;

     if(!this.chartModelMediumByMediumsList) {
        console.log('no data');
     } else {
        console.log('data');
        console.log(this.chartModelMediumByMediumsList.length);
     }
    }


  // this.chartModelMediumsList.forEach(element => {
  //   // console.log(element);
  //   // this.data.push({ medium: element.medium_name_cyrilic, value: element.medium_id });
  //   this.data.push({ state: element.medium_name_cyrilic, sales: element.num_of_mediums });
  // });

  // Run the function only in the browser
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  ngAfterViewInit() {


    // Chart code goes in here
    this.browserOnly(() => {



      let root = am5.Root.new("chartdiv2");

      root.setThemes([am5themes_Animated.new(root)]);

      // Set themes
      // https://www.amcharts.com/docs/v5/concepts/themes/
      root.setThemes([
        am5themes_Animated.new(root)
      ]);

      // Create chart
      // https://www.amcharts.com/docs/v5/charts/xy-chart/
      let chart = root.container.children.push(am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "none",
        wheelY: "none",
        layout: root.horizontalLayout
      }));


      // Add legend
      // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
      let legendData = [];
      let legend = chart.children.push(
        am5.Legend.new(root, {
          nameField: "name",
          fillField: "color",
          strokeField: "color",
          //centerY: am5.p50,
          marginLeft: 20,
          y: 20,
          layout: root.verticalLayout,
          clickTarget: "none"
        })
      );

      // let data = [{
      //   region: "Central",
      //   state: "North Dakota",
      //   sales: 920
      // }, {
      //   region: "Central",
      //   state: "South Dakota",
      //   sales: 1317
      // }, {
      //   region: "Central",
      //   state: "Kansas",
      //   sales: 2916
      // }, {
      //   region: "Central",
      //   state: "Iowa",
      //   sales: 4577
      // }, {
      //   region: "Central",
      //   state: "Nebraska",
      //   sales: 7464
      // }, {
      //   region: "Central",
      //   state: "Oklahoma",
      //   sales: 19686
      // }, {
      //   region: "Central",
      //   state: "Missouri",
      //   sales: 22207
      // }, {
      //   region: "Central",
      //   state: "Minnesota",
      //   sales: 29865
      // }, {
      //   region: "Central",
      //   state: "Wisconsin",
      //   sales: 32125
      // }, {
      //   region: "Central",
      //   state: "Indiana",
      //   sales: 53549
      // }, {
      //   region: "Central",
      //   state: "Michigan",
      //   sales: 76281
      // }, {
      //   region: "Central",
      //   state: "Illinois",
      //   sales: 80162
      // }, {
      //   region: "Central",
      //   state: "Texas",
      //   sales: 170187
      // }, {
      //   region: "East",
      //   state: "West Virginia",
      //   sales: 1209
      // }, {
      //   region: "East",
      //   state: "Maine",
      //   sales: 1270
      // }, {
      //   region: "East",
      //   state: "District of Columbia",
      //   sales: 2866
      // }, {
      //   region: "East",
      //   state: "New Hampshire",
      //   sales: 7294
      // }, {
      //   region: "East",
      //   state: "Vermont",
      //   sales: 8929
      // }, {
      //   region: "East",
      //   state: "Connecticut",
      //   sales: 13386
      // }, {
      //   region: "East",
      //   state: "Rhode Island",
      //   sales: 22629
      // }, {
      //   region: "East",
      //   state: "Maryland",
      //   sales: 23707
      // }, {
      //   region: "East",
      //   state: "Delaware",
      //   sales: 27453
      // }, {
      //   region: "East",
      //   state: "Massachusetts",
      //   sales: 28639
      // }, {
      //   region: "East",
      //   state: "New Jersey",
      //   sales: 35763
      // }, {
      //   region: "East",
      //   state: "Ohio",
      //   sales: 78253
      // }, {
      //   region: "East",
      //   state: "Pennsylvania",
      //   sales: 116522
      // }, {
      //   region: "East",
      //   state: "New York",
      //   sales: 310914
      // }, {
      //   region: "South",
      //   state: "South Carolina",
      //   sales: 8483
      // }, {
      //   region: "South",
      //   state: "Louisiana",
      //   sales: 9219
      // }, {
      //   region: "South",
      //   state: "Mississippi",
      //   sales: 10772
      // }, {
      //   region: "South",
      //   state: "Arkansas",
      //   sales: 11678
      // }, {
      //   region: "South",
      //   state: "Alabama",
      //   sales: 19511
      // }];

      if(!this.chartModelMediumByMediumsList) {
        console.log('no data');
      }
      else{
        console.log(this.chartModelMediumByMediumsList.length + " mediumi found");
        this.chartModelMediumByMediumsList.forEach(element => {
          console.log(element);
          this.data.push({ "Тип на медиум": element.medium_type_name, "Име на медиум": element.medium_name, "Број на информации по медиум": element.num_of_mediums });
        })
      }


      // Create axes
      // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
      let yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
        categoryField: "Име на медиум",
        renderer: am5xy.AxisRendererY.new(root, {
          minGridDistance: 10
        }),
        tooltip: am5.Tooltip.new(root, {})
      }));

      yAxis.get("renderer").labels.template.setAll({
        fontSize: 12,
        location: 0.5
      })

      yAxis.data.setAll(this.data);

      let xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererX.new(root, {}),
        tooltip: am5.Tooltip.new(root, {})
      }));


      // Add series
      // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
      let series = chart.series.push(am5xy.ColumnSeries.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        valueXField: "Број на информации по медиум",
        categoryYField: "Име на медиум",
        tooltip: am5.Tooltip.new(root, {
          pointerOrientation: "horizontal"
        })
      }));

      series.columns.template.setAll({
        tooltipText: "{categoryY}: [bold]{valueX}[/]",
        width: am5.percent(90),
        strokeOpacity: 0
      });


      series.data.setAll(this.data);

      function createRange(label, category, color) {
        let rangeDataItem = yAxis.makeDataItem({
          category: category
        });

        let range = yAxis.createAxisRange(rangeDataItem);

        rangeDataItem.get("label").setAll({
          fill: color,
          text: label,
          location: 1,
          fontWeight: "bold",
          dx: -130
        });

        rangeDataItem.get("grid").setAll({
          stroke: color,
          strokeOpacity: 1,
          location: 1
        });

        rangeDataItem.get("tick").setAll({
          stroke: color,
          strokeOpacity: 1,
          location: 1,
          visible: true,
          length: 130
        });

        legendData.push({ name: label, color: color });

      }

      //Copilot how to get first Index of state


      createRange("Веб", "Скопско Ехо", chart.get("colors").getIndex(0));

      legend.data.setAll(legendData);

      // Add cursor
      // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
      let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
        xAxis: xAxis,
        yAxis: yAxis
      }));


      // Make stuff animate on load
      // https://www.amcharts.com/docs/v5/concepts/animations/
      series.appear();
      chart.appear(1000, 100);


      let sourceData = this.getDataMedium();
      let bodyData =[];

      sourceData.forEach(function(sourceRow){
        let dataRow =[];

        dataRow.push(sourceRow["Име на медиум"]);
        dataRow.push(sourceRow["Тип на медиум"]);
        dataRow.push(sourceRow["Број на информации по медиум"]);

        bodyData.push(dataRow);
      });

      console.log(bodyData);

         // Add export menu
         let exporting = am5plugins_exporting.Exporting.new(root, {
          menu: am5plugins_exporting.ExportingMenu.new(root, {}),
          filePrefix: "sette-partitioned-bar-chart",
            dataSource: this.data,
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
            text: "Број на информации по медиум/вид на медиум",
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
             widths: ["auto", "auto", "auto"],
               body: [
                ["Име на медиум", "Тип на медиум" ,"Број на информации по медиум"],
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
  toggleTag() {
    this.showMe = !this.showMe;
  }
}