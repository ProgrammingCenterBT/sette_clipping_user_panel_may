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
import { ChartsModelClipsByTagByDate } from 'src/app/services/charts/charts-model-clips-by-tag-by-date';
import { ChartsModelClipsByTagByDateService } from 'src/app/services/charts/charts-model-clips-by-tag-by-date.service';
import { Encoded } from 'src/app/services/text/logo';

@Component({
  selector: 'app-info-po-den-tag',
  templateUrl: './info-po-den-tag.component.html',
  styleUrls: ['./info-po-den-tag.component.css']
})
export class InfoPoDenTagComponent implements OnInit {

  chartClipsByTagByDateList: ChartsModelClipsByTagByDate[];
  chartCTD: ChartsModelClipsByTagByDate;

  tag_name_c: string;
  date_of_clip: string;
  info_per_date: number;

  showMe: boolean;

  //private root: am5.Root;
  //private value: number;

  data = [];

  constructor(@Inject(PLATFORM_ID) private platformId, private zone: NgZone,
  private chartsModelClipsByTagByDateService: ChartsModelClipsByTagByDateService, public http: HttpClient) {
    this.chartCTD=new ChartsModelClipsByTagByDate();
    }


  ngOnInit(): any {
    //this.returnClipsByTagByDate().subscribe(this.data);
   this.returnClipsByTagByDate().subscribe(data => this.determineAvailableClipsByTagByDate(data));
}


private returnClipsByTagByDate(): any {
    // this.chartsModelClipsByTagByDateService.return_clips_by_tag_by_date().subscribe(
    //   {
    //     next:     (response: ChartsModelClipsByTagByDate[]) => {this.chartClipsByTagByDateList = response;},
    //     error:    (error:HttpErrorResponse)                 => {console.log(error.message);},// errorHandler 
    //     complete: ()                                        => {console.log("completeHandler");} // completeHandler
    //   }
    // );
    
    this.chartsModelClipsByTagByDateService.return_clips_by_tag_by_date().subscribe((response: ChartsModelClipsByTagByDate[]) => {this.chartClipsByTagByDateList=[];this.chartClipsByTagByDateList.push(...response);});
  }

  // determineAvailableClipsByTagByDate( chartClipsByTagByDateList: ChartsModelClipsByTagByDate[]) {
  //   console.log("in determineAvailableClipsByTagByDate");
  //   console.log(chartClipsByTagByDateList);
  //   this.chartClipsByTagByDateList = chartClipsByTagByDateList;
  //   console.log(this.chartClipsByTagByDateList);
  //   this.returnClipsByTagByDate();
  //   console.log(this.chartClipsByTagByDateList);
  //   this.data = this.chartClipsByTagByDateList;
  //   console.log(this.data);
  // }


  determineAvailableClipsByTagByDate(chartClipsByTagByDateList: ChartsModelClipsByTagByDate[]) {
    console.log("in determineAvailableClipsByTagByDate");
    this.chartClipsByTagByDateList = chartClipsByTagByDateList;

    if(!this.chartClipsByTagByDateList) {
      console.log("no data");
    } else {
      console.log(this.chartClipsByTagByDateList.length + "data");
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

  // if(!this.chartClipsByTagByDateList) {
  //   console.log("no data");
  // } else {
  //   this.chartClipsByTagByDateList.forEach((element) => {
  //     console.log(element);
  //     var convertDate = new Date(element.date_of_clip);
  //     convertDate.setHours(0, 0, 0, 0);
  //     am5.time.add(convertDate, "day", 1);

  //     console.log(am5.time.add(convertDate, "day", 1));

  //     this.data.push({ tag: element.tag_name_c, date: convertDate, value: element.info_per_date});

  //     console.log(this.data);
  //   });
  // }
  ngAfterViewInit() {

    // Chart code goes in here
    this.browserOnly(() => {

      let root = am5.Root.new("chartdiv4");
      root.setThemes([am5themes_Animated.new(root)]);


// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
let chart = root.container.children.push(am5xy.XYChart.new(root, {
  panX: true,
  panY: true,
  wheelX: "panX",
  wheelY: "zoomX",
  maxTooltipDistance: 0,
  pinchZoomX:true
}));


let date = new Date();
date.setHours(0, 0, 0, 0);
let value = 100;

    function generateData() {
      value = Math.round((Math.random() * 10 - 4.2) + value);
      am5.time.add(date, "day", 1);
      return {
        date: date.getTime(),
        value: value
      };
    }

    function generateDatas(count) {
      let data = [];
      for (var i = 0; i < count; ++i) {
        data.push(generateData());
      }
      return data;
    }

    // let data2 = [{
    //   datum: "2020-01-01",
    //   value: 100
    // }, {
    //   datum: "2020-01-02",
    //   value: 120
    // }, {
    //   datum: "2020-01-03",
    //   value: 130
    // }, {
    //   datum: "2020-01-04",
    //   value: 110
    // }, {
    //   datum: "2020-01-05",
    //   value: 100
    // }]


    // data2.forEach((element) => {
    //   console.log(element);
    //   var convertDate = new Date(element.datum);
    //   convertDate.setHours(0, 0, 0, 0);
    //   am5.time.add(convertDate, "day", 1);

    //   console.log(am5.time.add(convertDate, "day", 1));
    // });





    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    let xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
      maxDeviation: 0.2,
      baseInterval: {
        timeUnit: "day",
        count: 1
      },
      renderer: am5xy.AxisRendererX.new(root, {}),
      tooltip: am5.Tooltip.new(root, {})
    }));

    let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererY.new(root, {})
    }));


    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    for (var i = 0; i < 10; i++) {
      let series = chart.series.push(am5xy.LineSeries.new(root, {
        name: "Series " + i,
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        valueXField: "date",
        legendValueText: "{valueY}",
        tooltip: am5.Tooltip.new(root, {
          pointerOrientation: "horizontal",
          labelText: "{valueY}"
        })
      }));


      date = new Date();
      date.setHours(0, 0, 0, 0);
      value = 0;

      let data = generateDatas(100);

      series.data.setAll(data);


      //series.data.setAll(data2);

      // Make stuff animate on load
      // https://www.amcharts.com/docs/v5/concepts/animations/
      series.appear();
    }


    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
      behavior: "none"
    }));
    cursor.lineY.set("visible", false);


    // Add scrollbar
    // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
    chart.set("scrollbarX", am5.Scrollbar.new(root, {
      orientation: "horizontal"
    }));

    chart.set("scrollbarY", am5.Scrollbar.new(root, {
      orientation: "vertical"
    }));


    // Add legend
    // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
    let legend = chart.rightAxesContainer.children.push(am5.Legend.new(root, {
      width: 200,
      paddingLeft: 15,
      height: am5.percent(100)
    }));

    // When legend item container is hovered, dim all the series except the hovered one
    // legend.itemContainers.template.events.on("pointerover", function(e) {
    //   let itemContainer = e.target;

    //   // As series list is data of a legend, dataContext is series
    //   let series = itemContainer.dataItem.dataContext;

    //   chart.series.each(function(chartSeries) {
    //     if (chartSeries != series) {
    //       chartSeries.strokes.template.setAll({
    //         strokeOpacity: 0.15,
    //         stroke: am5.color(0x000000)
    //       });
    //     } else {
    //       chartSeries.strokes.template.setAll({
    //         strokeWidth: 3
    //       });
    //     }
    //   })
    // })

    // // When legend item container is unhovered, make all series as they are
    // legend.itemContainers.template.events.on("pointerout", function(e) {
    //   let itemContainer = e.target;
    //   let series = itemContainer.dataItem.dataContext;

    //   chart.series.each(function(chartSeries) {
    //     chartSeries.strokes.template.setAll({
    //       strokeOpacity: 1,
    //       strokeWidth: 1,
    //       stroke: chartSeries.get("fill")
    //     });
    //   });
    // })

    legend.itemContainers.template.set("width", am5.p100);
    legend.valueLabels.template.setAll({
      width: am5.p100,
      textAlign: "right"
    });

    // It's is important to set legend data after all the events are set on template, otherwise events won't be copied
    legend.data.setAll(chart.series.values);


    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    chart.appear(1000, 100);


       // Add export menu
       let exporting = am5plugins_exporting.Exporting.new(root, {
        menu: am5plugins_exporting.ExportingMenu.new(root, {}),
        filePrefix: "sette-highlight-line-chart",
          title: "Sette Highlighting Chart",
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