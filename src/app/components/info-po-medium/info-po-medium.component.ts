import { Component, Inject, NgZone, OnInit, PLATFORM_ID } from '@angular/core';
// amCharts imports
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5plugins_exporting from "@amcharts/amcharts5/plugins/exporting";
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ChartModelMediumType } from 'src/app/services/charts/charts-model-medium-type';
import { ChartsModelMediumTypeService } from 'src/app/services/charts/charts-model-medium-type.service';
import { Encoded } from 'src/app/services/text/logo';


@Component({
  selector: 'app-info-po-medium',
  templateUrl: './info-po-medium.component.html',
  styleUrls: ['./info-po-medium.component.css']
})
export class InfoPoMediumComponent implements OnInit {
  chartModelMediumTypeList: ChartModelMediumType[];
  chartm: ChartModelMediumType;

  medium_type_name: string;
  num_of_mediums: number;

  showMe: boolean;

  data = [];

  constructor(@Inject(PLATFORM_ID) private platformId, private zone: NgZone,
    private chartsModelMediumTypeService: ChartsModelMediumTypeService, public http: HttpClient) {
    this.chartm = new ChartModelMediumType();
  }
  private chartRender(root: any) {
  }
  // public createCharts(root:any){
  //   return root.container.children.push(
  //     am5xy.XYChart.new(root, {
  //       panX: false,
  //       panY: false,
  //       wheelX: "none",
  //       wheelY: "none"
  //     })
  //   );
  // }
  private createAxisX(chart: any, am5xy: any, root: any) {
    return chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0,
        min: 0,
        renderer: am5xy.AxisRendererX.new(root, {})
      })
    );
  }
  private createAxisY(chart: any, am5xy: any, yRenderer: any, root: any) {
    return chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        maxDeviation: 0,
        categoryField: "medium",
        renderer: yRenderer
      })
    );
  }
  private createAxisY2(yAxis: any) {
    yAxis.dataItems.sort(function (x, y) {
      return x.get("index") - y.get("index");
    });
    return yAxis;
  }
  private drawChart(yAxis: any, series: any, chart: any, record: any) {
    yAxis.data.setAll(record);
    series.data.setAll(record);

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear(1000);
    chart.appear(1000, 100);
  }
  private getDataFromDatabase() {
    let dataArray = [];
    if (!this.chartModelMediumTypeList) {
      console.log("No data found");
    } else {
      this.chartModelMediumTypeList.forEach(element => {
        dataArray.push({ "Име на медиум": element.medium_type_name, "Број на информации по медиум": element.num_of_mediums });
      });
    }
    return dataArray;
  }
  private returnClipsByMediumType(): any {
    this.chartsModelMediumTypeService.getMediumsType().subscribe(
      (response: ChartModelMediumType[]) => {
        this.chartModelMediumTypeList = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  determineAvailableClipsByMediumType(chartModelMediumTypeList: ChartModelMediumType[]) {
    this.chartModelMediumTypeList = chartModelMediumTypeList;

    if (!this.chartModelMediumTypeList) {
      console.log("Failed to get ClipsByMediumType");
    } else {
      console.log(this.chartModelMediumTypeList.length + " ClipsByMediumTypefound ");
    }
  }


  ngOnInit(): any {
    //Vrakja greska vo console za subscribe
    //this.returnClipsByMedium().subscribe(data => this.determineAvailableClipsByMedium(data));
    this.returnClipsByMediumType().subscribe(data => this.determineAvailableClipsByMediumType(data));
  }

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


      let root = am5.Root.new("chartdiv");
      root.setThemes([am5themes_Animated.new(root)]);

      // Create chart
      // https://www.amcharts.com/docs/v5/charts/xy-chart/
      //let chart = this.createCharts(root);
      let chart = root.container.children.push(
        am5xy.XYChart.new(root, {
          panX: false,
          panY: false,
          wheelX: "none",
          wheelY: "none"
        })
      );


      // Create axes
      // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
      let yRenderer = am5xy.AxisRendererY.new(root, { minGridDistance: 30 });

      let yAxis = chart.yAxes.push(
        am5xy.CategoryAxis.new(root, {
          maxDeviation: 0,
          categoryField: "Име на медиум",
          renderer: yRenderer
        })
      );
      //let yAxis = this.createAxisY(chart,am5xy,yRenderer,root);
      let xAxis = this.createAxisX(chart, am5xy, root);

      // Create series
      // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
      let series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: "Series 1",
          xAxis: xAxis,
          yAxis: yAxis,
          valueXField: "Број на информации по медиум",
          sequencedInterpolation: true,
          categoryYField: "Име на медиум",
        })
      );

      let columnTemplate = series.columns.template;

      columnTemplate.setAll({
        draggable: true,
        cursorOverStyle: "pointer",
        tooltipText: "{valueX}",
        cornerRadiusBR: 10,
        cornerRadiusTR: 10
      });
      columnTemplate.adapters.add("fill", (fill, target) => {
        return chart.get("colors").getIndex(series.columns.indexOf(target));
      });

      columnTemplate.adapters.add("stroke", (stroke, target) => {
        return chart.get("colors").getIndex(series.columns.indexOf(target));
      });

      columnTemplate.events.on("dragstop", () => {
        sortCategoryAxis();
      });

      // Get series item by category
      function getSeriesItem(category) {
        for (var i = 0; i < series.dataItems.length; i++) {
          let dataItem = series.dataItems[i];
          if (dataItem.get("categoryY") == category) {
            return dataItem;
          }
        }
      }


      // Axis sorting
      function sortCategoryAxis() {
        // Sort by value
        series.dataItems.sort(function (x, y) {
          return y.get("graphics").y() - x.get("graphics").y();
        });

        let easing = am5.ease.out(am5.ease.cubic);

        // Go through each axis item
        am5.array.each(yAxis.dataItems, function (dataItem) {
          // get corresponding series item
          let seriesDataItem = getSeriesItem(dataItem.get("category"));

          if (seriesDataItem) {
            // get index of series data item
            let index = series.dataItems.indexOf(seriesDataItem);

            let column = seriesDataItem.get("graphics");

            // position after sorting
            let fy =
              yRenderer.positionToCoordinate(yAxis.indexToPosition(index)) -
              column.height() / 2;

            // set index to be the same as series data item index
            if (index != dataItem.get("index")) {
              dataItem.set("index", index);

              // current position
              let x = column.x();
              let y = column.y();

              column.set("dy", -(fy - y));
              column.set("dx", x);

              column.animate({ key: "dy", to: 0, duration: 600, easing: easing });
              column.animate({ key: "dx", to: 0, duration: 600, easing: easing });
            } else {
              column.animate({ key: "y", to: fy, duration: 600, easing: easing });
              column.animate({ key: "x", to: 0, duration: 600, easing: easing });
            }
          }
        });

        // Sort axis items by index.
        // This changes the order instantly, but as dx and dy is set and animated,
        // they keep in the same places and then animate to true positions.
        yAxis = this.createAxisY2(yAxis);
      }

      this.data = this.getDataFromDatabase();
      this.drawChart(yAxis, series, chart, this.data);


      let sourceData = this.getDataFromDatabase();
      let bodyData =[];

      sourceData.forEach(function(sourceRow){
        let dataRow =[];

        dataRow.push(sourceRow["Име на медиум"]);
        dataRow.push(sourceRow["Број на информации по медиум"]);

        bodyData.push(dataRow);
      });

      console.log(bodyData);

         // Add export menu
         let exporting = am5plugins_exporting.Exporting.new(root, {
          menu: am5plugins_exporting.ExportingMenu.new(root, {}),
          filePrefix: "sette-bars-chart",
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
            text: "Број на информации по вид на медиум",
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
                ["Име на медиум", "Број на информации по медиум"],
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