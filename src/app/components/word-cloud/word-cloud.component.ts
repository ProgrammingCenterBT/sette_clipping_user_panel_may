import { Component, Inject, NgZone, OnInit, PLATFORM_ID } from '@angular/core';
// amCharts imports
import * as am5 from '@amcharts/amcharts5';
import * as am5wc from "@amcharts/amcharts5/wc";

import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-word-cloud',
  templateUrl: './word-cloud.component.html',
  styleUrls: ['./word-cloud.component.css']
})
export class WordCloudComponent {
  private root: am5.Root;
  private value: number;

  constructor(@Inject(PLATFORM_ID) private platformId, private zone: NgZone) { }

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


      // Add series
      // https://www.amcharts.com/docs/v5/charts/word-cloud/
      let series = root.container.children.push(am5wc.WordCloud.new(root, {
        maxCount: 100,
        minWordLength: 2,
        maxFontSize: am5.percent(35),
        text: "Ljubisa Popovski ovaj vikend ke odi Ohrid",
      }));


      // Configure labels
      series.labels.template.setAll({
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 5,
        paddingRight: 5,
        fontFamily: "Courier New"
      });

    });

    }
  }