import { Component, Inject, NgZone, OnInit, PLATFORM_ID } from '@angular/core';
// amCharts imports
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import * as am5percent from "@amcharts/amcharts5/percent";
import * as am5stock from "@amcharts/amcharts5/stock";
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-oceneti-vesti-podelba',
  templateUrl: './oceneti-vesti-podelba.component.html',
  styleUrls: ['./oceneti-vesti-podelba.component.css']
})
export class OcenetiVestiPodelbaComponent {
  private root: am5.Root;
  private value: number;

  constructor(@Inject(PLATFORM_ID) private platformId, private zone: NgZone) { }

  private createChart(root:any,am5xy:any){
    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    return root.container.children.push(am5xy.XYChart.new(root, {
      panX: false,
      panY: false,
      layout: root.verticalLayout
    }));
  }
  private createLegend(chart:any,root:any,am5:any){
    // Add legend
    // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
    return chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50
      })
    );
  }
  private getdataFromDatabase(am5:any){
    let dataArray = [{
      category: "",
      from: 0,
      to: 15,
      name: "Stage #1",
      columnSettings: {
        fill: am5.color(0x0ca948)
      }
    }, {
      category: "",
      from: 15,
      to: 75,
      name: "Stage #2",
      columnSettings: {
        fill: am5.color(0x93da49)
      }
    }, {
      category: "",
      from: 75,
      to: 90,
      name: "Stage #3",
      columnSettings: {
        fill: am5.color(0xffd100)
      }
    }, {
      category: "",
      from: 90,
      to: 95,
      name: "Stage #4",
      columnSettings: {
        fill: am5.color(0xcd213b)
      }
    }, {
      category: "",
      from: 95,
      to: 98,
      name: "Stage #5",
      columnSettings: {
        fill: am5.color(0x9e9e9e)
      }
    },{
        category: "",
        from: 98,
        to: 100,
        name: "Stage #5",
        columnSettings: {
          fill: am5.color(0x9e9e9e)
        }
    }];
    return dataArray;
  }
  private createYAxis(chart:any,root:any){
    // Create axes
      // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
      let yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
        categoryField: "category",
        renderer: am5xy.AxisRendererY.new(root, {})
      }));
      return yAxis;
  }
  private createXAxis(chart:any,root:any){
    return chart.xAxes.push(am5xy.ValueAxis.new(root, {
      min: 0,
      max: 100,
      numberFormat: "#'%'",
      renderer: am5xy.AxisRendererX.new(root, {})
    }));
  }
  private addSeries(chart:any,root:any,xAxis:any,yAxis:any){
    let series = chart.series.push(am5xy.ColumnSeries.new(root, {
      xAxis: xAxis,
      yAxis: yAxis,
      valueXField: "to",
      openValueXField: "from",
      categoryYField: "category",
      categoryXField: "name"
    }));

    series.columns.template.setAll({
      strokeWidth: 0,
      strokeOpacity: 0,
      height: am5.percent(100),
      templateField: "columnSettings"
    });
    return series;
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
      let chart = this.createChart(root,am5xy);

      // Add legend
      // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
      let legend = this.createLegend(chart,root,am5);
      let data = this.getdataFromDatabase(am5);


      // Create axes
      // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
      let yAxis = this.createYAxis(chart,root);
      yAxis.data.setAll([{ category: "" }]);

      let xAxis = this.createXAxis(chart,root);
      xAxis.get("renderer").labels.template.set("forceHidden", true);


      // Add series
      // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
      let series = this.addSeries(chart,root,xAxis,yAxis);
      series.data.setAll(data);

// Create axis ranges for each column
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/axis-ranges/
for(var i = 0; i < data.length; i++) {
  let rangeDataItem = xAxis.makeDataItem({
    value: data[i].from
  });
  
  let range = xAxis.createAxisRange(rangeDataItem);
  
  rangeDataItem.get("grid").set("forceHidden", true);
  
  rangeDataItem.get("tick").setAll({
    visible: true,
    length: 18,
    strokeOpacity: 0.2
  });
  
  rangeDataItem.get("label").setAll({
    centerX: am5.p0,
    forceHidden: false,
    fontSize: 10,
    text: data[i].from + "%"
  });
}

// Add legend
// https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
let legend2 = chart.children.push(am5.Legend.new(root, {
  nameField: "categoryX",
  centerX: am5.percent(50),
  x: am5.percent(50),
  clickTarget: "none"
}));

legend.markerRectangles.template.setAll({
  strokeOpacity: 0
});

legend.data.setAll(series.dataItems);


// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
series.appear();
chart.appear(1000, 100);

});
}
}