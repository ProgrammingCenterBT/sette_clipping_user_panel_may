import { Component, Inject, NgZone, OnInit, PLATFORM_ID } from '@angular/core';
// amCharts imports
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import * as am5percent from "@amcharts/amcharts5/percent";
import * as am5stock from "@amcharts/amcharts5/stock";
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5plugins_exporting from "@amcharts/amcharts5/plugins/exporting";
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ChartsModelClipsByDateByMediumType } from 'src/app/services/charts/charts-model-clips-by-date-by-medium-type';
import { ChartsModelClipsByDateByMediumTypeService } from 'src/app/services/charts/charts-model-clips-by-date-by-medium-type.service';
import { Encoded } from 'src/app/services/text/logo';

@Component({
  selector: 'app-info-po-den-medium',
  templateUrl: './info-po-den-medium.component.html',
  styleUrls: ['./info-po-den-medium.component.css']
})
export class InfoPoDenMediumComponent implements OnInit {


  chartModelClipsByDateByMediumTypeList: ChartsModelClipsByDateByMediumType[];
  chartCDMT: ChartsModelClipsByDateByMediumType;

  medium_type_name: string;
  date_of_clip: string;
  num_of_info: number;

  showMe: boolean;

  data = [];

  constructor(@Inject(PLATFORM_ID) private platformId, private zone: NgZone,
    private chartsModelClipsByDateByMediumTypeService: ChartsModelClipsByDateByMediumTypeService, public http: HttpClient) {
    this.chartCDMT = new ChartsModelClipsByDateByMediumType();
  }
  //Charts
  private createCharts(root:any){
    return root.container.children.push(am5xy.XYChart.new(root, {
      panX: true,
      panY: true,
      wheelX: "panX",
      wheelY: "zoomX",
      pinchZoomX:true
    }));
  }
  private createXAxis(chart:any,root:any){
    return chart.xAxes.push(am5xy.GaplessDateAxis.new(root, {
      maxDeviation: 0,
      baseInterval: {
        timeUnit: "day",
        count: 1
      },
      renderer: am5xy.AxisRendererX.new(root, {}),
      tooltip: am5.Tooltip.new(root, {})
    }));
  }
  private createYAxis(chart:any,root:any){
    return chart.yAxes.push(am5xy.ValueAxis.new(root, {
      extraMin: 0.2,
      renderer: am5xy.AxisRendererY.new(root, {})
    }));
  }
  private createSeries(chart:any,root:any,xAxis:any,yAxis:any){
    return chart.series.push(am5xy.LineSeries.new(root, {
      name: "Series",
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "value",
      valueXField: "date",
      tooltip: am5.Tooltip.new(root, {
        labelText: "{valueY}"
      })
    }));
  }
  private returnClipsByDateByMediumType(): any {
    console.log("in returnClipsByDateByMediumType");
    
    this.chartsModelClipsByDateByMediumTypeService.getClipsByDateByMediumType().subscribe(response => {this.chartModelClipsByDateByMediumTypeList = response;});
  }
  ngOnInit(): any {
      this.returnClipsByDateByMediumType().subscribe( data => this.determineAvailableClipsByDateByMediumType(data));
  }


  determineAvailableClipsByDateByMediumType( chartModelClipsByDateByMediumTypeList: ChartsModelClipsByDateByMediumType[]) {
      this.chartModelClipsByDateByMediumTypeList = chartModelClipsByDateByMediumTypeList;

      if(!this.chartModelClipsByDateByMediumTypeList) {
        console.log("No data available");
      } else {
        console.log("Data available");
        console.log(this.chartModelClipsByDateByMediumTypeList);
      }
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

      let root = am5.Root.new("chartdiv3");
      root.setThemes([am5themes_Animated.new(root)]);

      // Create chart
      // https://www.amcharts.com/docs/v5/charts/xy-chart/
      let chart = this.createCharts(root);

      // Add cursor
      // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
      let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
        behavior: "none"
      }));
      cursor.lineY.set("visible", false);


      // Generate random data
      let date = new Date();
      date.setHours(0, 0, 0, 0);
      let value = 1000;
      let volume = 100000;

      function generateData() {
        value = Math.round((Math.random() * 10 - 5) + value);
        volume = Math.round((Math.random() * 1000 - 500) + volume);

        am5.time.add(date, "day", 1);
        // add another if it's saturday
        if (date.getDay() == 6) {
          am5.time.add(date, "day", 1);
        }
        // add another if it's sunday
        if (date.getDay() == 0) {
          am5.time.add(date, "day", 1);
        }

        return {
          date: date.getTime(),
          value: value,
          volume: volume
        };
      }

      function generateDatas(count) {
        let data = [];
        for (var i = 0; i < count; ++i) {
          data.push(generateData());
        }
        return data;
      }


      // Create axes
      // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
      let xAxis = this.createXAxis(chart,root);
      let yAxis = this.createYAxis(chart,root);


      // Add series
      // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
      let series = this.createSeries(chart,root,xAxis,yAxis);

      // y axis for volume
      let volumeAxisRenderer = am5xy.AxisRendererY.new(root, {});
      volumeAxisRenderer.grid.template.set("forceHidden", true);
      volumeAxisRenderer.labels.template.set("forceHidden", true);

      let volumeAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
        height: am5.percent(25),
        y: am5.percent(100),
        centerY: am5.percent(100),
        panY:false,
        renderer: volumeAxisRenderer
      }));

      // Add series
      // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
      let volumeSeries = chart.series.push(am5xy.ColumnSeries.new(root, {
        name: "Volume Series",
        xAxis: xAxis,
        yAxis: volumeAxis,
        valueYField: "volume",
        valueXField: "date",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY}"
        })
      }));

      volumeSeries.columns.template.setAll({ fillOpacity: 0.8, strokeOpacity:0, width: am5.percent(40) })


      // Add scrollbar
      // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
      chart.set("scrollbarX", am5.Scrollbar.new(root, {
        orientation: "horizontal"
      }));


      // Set data
      let data = generateDatas(200);
      series.data.setAll(data);
      volumeSeries.data.setAll(data);


      // Make stuff animate on load
      // https://www.amcharts.com/docs/v5/concepts/animations/
      series.appear(1000);
      chart.appear(1000, 100);

         // Add export menu
         let exporting = am5plugins_exporting.Exporting.new(root, {
          menu: am5plugins_exporting.ExportingMenu.new(root, {}),
          filePrefix: "sette-info-day-medium-chart",
            title: "Sette Medium Day Chart",
            dataSource: this.data,
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