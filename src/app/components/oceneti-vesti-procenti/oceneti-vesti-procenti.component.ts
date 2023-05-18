import { Component, Inject, NgZone, OnInit, PLATFORM_ID } from '@angular/core';
// amCharts imports
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import * as am5percent from "@amcharts/amcharts5/percent";
import * as am5stock from "@amcharts/amcharts5/stock";
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-oceneti-vesti-procenti',
  templateUrl: './oceneti-vesti-procenti.component.html',
  styleUrls: ['./oceneti-vesti-procenti.component.css']
})
export class OcenetiVestiProcentiComponent {
  private root: am5.Root;
  private value: number;

  constructor(@Inject(PLATFORM_ID) private platformId, private zone: NgZone) { }
  //Charts
  private createRender(yAxis:any){
    let xRenderer = yAxis.get("renderer");
      xRenderer.axisFills.template.setAll({
        fill: am5.color(0x000000),
        fillOpacity: 0.05,
        visible: true
      });
      return xRenderer;
  }
  private createLegend(chart:any,root:any){
    return chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50
      })
    );
  }
  private getDataFromDatabase(){
     // Data
     let dataArray = [{
      category: "Search engines",
      negative1: -0.1,
      negative2: -0.9,
      positive1: 5,
      positive2: 94
    }, {
      category: "Online encyclopedias",
      negative1: -2,
      negative2: -4,
      positive1: 19,
      positive2: 75
    }, {
      category: "Peers",
      negative1: -2,
      negative2: -10,
      positive1: 46,
      positive2: 42
    }, {
      category: "Social media",
      negative1: -2,
      negative2: -13,
      positive1: 33,
      positive2: 52
    }, {
      category: "Study guides",
      negative1: -6,
      negative2: -19,
      positive1: 34,
      positive2: 41
    }];
    return dataArray;
  }
  private createYAxis(chart:any,root:any){
    return chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "category",
        renderer: am5xy.AxisRendererY.new(root, {
          inversed: true,
          cellStartLocation: 0.1,
          cellEndLocation: 0.9
        })
      })
    );
  }
  private createXAxis(chart:any,root:any){
    return chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        calculateTotals: true,
        min: -100,
        max: 100,
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 50
        })
      })
    );
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
      let root = am5.Root.new("chartdiv2");

      root.setThemes([am5themes_Animated.new(root)]);
      // Create chart
      // https://www.amcharts.com/docs/v5/charts/xy-chart/
      let chart = root.container.children.push(
        am5xy.XYChart.new(root, {
          panX: false,
          panY: false,
          wheelX: "panX",
          wheelY: "zoomX",
          layout: root.horizontalLayout,
          arrangeTooltips: false
        })
      );

      // Use only absolute numbers
      root.numberFormatter.set("numberFormat", "#.#s'%");

      // Add legend
      // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
      let legend =  this.createLegend(chart,root);
      
      // Data
      let data = this.getDataFromDatabase();

      // Create axes
      // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
      let yAxis = this.createYAxis(chart,root);
      yAxis.data.setAll(data);

      let xAxis = this.createXAxis(chart,root);

      let xRenderer = this.createRender(yAxis);
      // let xRenderer = yAxis.get("renderer");
      // xRenderer.axisFills.template.setAll({
      //   fill: am5.color(0x000000),
      //   fillOpacity: 0.05,
      //   visible: true
      // });

      // Add series
      // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
      function createSeries(field, name, color) {
        let series = chart.series.push(
          am5xy.ColumnSeries.new(root, {
            xAxis: xAxis,
            yAxis: yAxis,
            name: name,
            valueXField: field,
            valueXShow: "valueXTotalPercent",
            categoryYField: "category",
            sequencedInterpolation: true,
            stacked: true,
            fill: color,
            stroke: color,
            calculateAggregates: true
          })
        );

        series.columns.template.setAll({
          height: am5.p100
        });

        series.bullets.push(function (root, series) {
          return am5.Bullet.new(root, {
            locationX: 0.5,
            locationY: 0.5,
            sprite: am5.Label.new(root, {
              fill: am5.color(0xffffff),
              centerX: am5.p50,
              centerY: am5.p50,
              text: "{valueX}",
              populateText: true,
              oversizedBehavior: "hide"
            })
          });
        });

        series.data.setAll(data);
        series.appear();

        return series;
      }

      let positiveColor = root.interfaceColors.get("positive");
      let negativeColor = root.interfaceColors.get("negative");

      createSeries("negative2", "Unlikely", am5.Color.lighten(negativeColor, 0.5));
      createSeries("negative1", "Never", negativeColor);
      createSeries("positive1", "Sometimes", am5.Color.lighten(positiveColor, 0.5));
      createSeries("positive2", "Very often", positiveColor);

      // Add legend
      // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
      let legend1 = chart.children.push(
        am5.Legend.new(root, {
          centerY: am5.p50,
          y: am5.p50,
          layout: root.verticalLayout,
          marginLeft: 50
        })
      );

      legend1.data.setAll(chart.series.values);

      // Make stuff animate on load
      // https://www.amcharts.com/docs/v5/concepts/animations/
      chart.appear(1000, 100);

    });
  }
}