import { Component, Inject, NgZone, OnInit, PLATFORM_ID } from '@angular/core';
// amCharts imports
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-vesti-po-ocenka',
  templateUrl: './vesti-po-ocenka.component.html',
  styleUrls: ['./vesti-po-ocenka.component.css']
})
export class VestiPoOcenkaComponent  {

//   private root: am5.Root;


//   constructor(@Inject(PLATFORM_ID) private platformId, private zone: NgZone) { }

//   // Run the function only in the browser
//   browserOnly(f: () => void) {
//     if (isPlatformBrowser(this.platformId)) {
//       this.zone.runOutsideAngular(() => {
//         f();
//       });
//     }
//   }

//   ngAfterViewInit() {
//     // Chart code goes in here
//     this.browserOnly(() => {
//       let root = am5.Root.new("chartdiv2");

//       root.setThemes([am5themes_Animated.new(root)]);


// // Create chart instance
// let chart = am5core.create("chartdiv3", am5charts.XYChart);

// // Add data
// chart.data = [
//   {date:new Date(2019,5,12), value1:50, value2:48, previousDate:new Date(2019, 5, 5)},
//   {date:new Date(2019,5,13), value1:53, value2:51, previousDate:new Date(2019, 5, 6)},
//   {date:new Date(2019,5,14), value1:56, value2:58, previousDate:new Date(2019, 5, 7)},
//   {date:new Date(2019,5,15), value1:52, value2:53, previousDate:new Date(2019, 5, 8)},
//   {date:new Date(2019,5,16), value1:48, value2:44, previousDate:new Date(2019, 5, 9)},
//   {date:new Date(2019,5,17), value1:47, value2:42, previousDate:new Date(2019, 5, 10)},
//   {date:new Date(2019,5,18), value1:59, value2:55, previousDate:new Date(2019, 5, 11)}
// ]

// // Create axes
// let dateAxis = chart.xAxes.push(new am5charts.DateAxis());
// dateAxis.renderer.minGridDistance = 50;

// let valueAxis = chart.yAxes.push(new am5charts.ValueAxis());

// // Create series
// let series = chart.series.push(new am5charts.LineSeries());
// series.dataFields.valueY = "value1";
// series.dataFields.dateX = "date";
// series.strokeWidth = 2;
// series.minBulletDistance = 10;
// series.tooltipText = "[bold]{date.formatDate()}:[/] {value1}\n[bold]{previousDate.formatDate()}:[/] {value2}";
// series.tooltip.pointerOrientation = "vertical";

// // Create series
// let series2 = chart.series.push(new am5charts.LineSeries());
// series2.dataFields.valueY = "value2";
// series2.dataFields.dateX = "date";
// series2.strokeWidth = 2;
// series2.strokeDasharray = "3,4";
// series2.stroke = series.stroke;

// // Add cursor
// chart.cursor = new am5charts.XYCursor();
// chart.cursor.xAxis = dateAxis;

}
