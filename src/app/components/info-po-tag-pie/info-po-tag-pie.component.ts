import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, NgZone, OnInit, PLATFORM_ID } from '@angular/core';
// amCharts imports
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5plugins_exporting from "@amcharts/amcharts5/plugins/exporting";
import { isPlatformBrowser } from '@angular/common';
import { ChartsModelTag } from 'src/app/services/charts/charts-model-tag';
import { ChartsModelTagService } from 'src/app/services/charts/charts-model-tag.service';
import { Encoded } from 'src/app/services/text/logo';

@Component({
  selector: 'app-info-po-tag-pie',
  templateUrl: './info-po-tag-pie.component.html',
  styleUrls: ['./info-po-tag-pie.component.css']
})
export class InfoPoTagPieComponent implements OnInit {

  chartModelTagList: ChartsModelTag[];
  chartp: ChartsModelTag;

  tag_name_c: string;
  num_of_tags: number;

  showMe: boolean;

  data:any =[];

  constructor(@Inject(PLATFORM_ID) private platformId, private zone: NgZone,
    private chartsModelTagService: ChartsModelTagService, public http: HttpClient) {
      this.chartp=new ChartsModelTag();
    }
    private getDataModelTags(){
      let dataArray=[];
      if(!this.chartModelTagList) {
        console.log("No data found");
      } else {
        this.chartModelTagList.forEach(element => {
          dataArray.push({"Име на таг": element.tag_name_c, "Број на информации по таг": element.num_of_tags });
        });
      }
      return dataArray;
  }


  private returnClipsByTag(): any {
    // this.chartsModelTagService.return_clips_by_tag().subscribe(
    //   {
    //     next:     (response: ChartsModelTag[]) => {this.chartModelTagList = response;},
    //     error:    (error:HttpErrorResponse)    => {console.log(error.message);},// errorHandler
    //     complete: ()                           => {console.log("completeHandler");} // completeHandler
    //   }
    // );
    this.chartsModelTagService.return_clips_by_tag().subscribe((response: ChartsModelTag[]) => {this.chartModelTagList=[];this.chartModelTagList.push(...response);});
  
  }

  determineAvailableClipsByTags( chartModelTagList: ChartsModelTag[]) {
    this.chartModelTagList = chartModelTagList;

    if (!this.chartModelTagList ) {
      console.log("Failed to get ClipsByTags");
    } else{
      console.log( this.chartModelTagList.length + " ClipsByTagsfound ");
    }
  }
  ngOnInit(): any {

    //Vo console vrakja greska so subscribe
    this.returnClipsByTag().subscribe( data=>this.determineAvailableClipsByTags(data) );
  }


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

      // Set themes
      // https://www.amcharts.com/docs/v5/concepts/themes/
      root.setThemes([am5themes_Animated.new(root)]);

      // Create chart
      // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
      let chart = root.container.children.push(am5percent.PieChart.new(root, {
        layout: root.verticalLayout
      }));


      // Create series
      // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
      let series = chart.series.push(am5percent.PieSeries.new(root, {
        alignLabels: true,
        calculateAggregates: true,
        valueField: "Број на информации по таг",
        categoryField: "Име на таг",
      }));

      series.slices.template.setAll({
        strokeWidth: 2,
        stroke: am5.color(0xffffff)
      });

      series.labelsContainer.set("paddingTop", 30);

      //Set up adapters for variable slice radius
      //https://codepen.io/team/amcharts/pen/KKqwRWq
      //https://www.amcharts.com/docs/v5/concepts/settings/adapters/
      series.slices.template.adapters.add("radius", function (radius, target) {
        let dataItem = target.dataItem;
        let high = series.getPrivate("valueHigh");
        if (dataItem) {
          let value:any = high;
          //let value:any = target.dataItem.get("valueWorking", 0);
          return radius * value / high
        }
        return radius;
      });

      // Set data
      // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
      series.data.setAll(this.getDataModelTags());

      // Create legend
      // https://www.amcharts.com/docs/v5/charts/percent-charts/legend-percent-series/
      let legend = chart.children.push(am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50,
        marginTop: 15,
        marginBottom: 15
      }));

      legend.data.setAll(series.dataItems);

      // Play initial series animation
      // https://www.amcharts.com/docs/v5/concepts/animations/#Animation_of_series
      series.appear(1000, 100);



      let sourceData = this.getDataModelTags();
      let bodyData =[];

      sourceData.forEach(function(sourceRow){
        let dataRow =[];

        dataRow.push(sourceRow["Име на таг"]);
        dataRow.push(sourceRow["Број на информации по таг"]);

        bodyData.push(dataRow);
      });



      let exporting = am5plugins_exporting.Exporting.new(root, {
        menu: am5plugins_exporting.ExportingMenu.new(root, {}),
        filePrefix: "sette-info-po-tag-pie",
        dataSource: this.getDataModelTags(),
        pdfOptions: {
          includeData: false,
          pageMargins: [15, 15, 15, 15],
          pageOrientation: "portrait",
          pageSize: "A4"
          //maxWidth: 1000,
          //maxHeight: 1000
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
          addBOM: true
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
        }
      });

      exporting.events.on("pdfdocready", function(event) {

        // Add title to the beginning
        event.doc.content.unshift({
          text: "% на информации по ТАГ",
          margin: [0, 16],
          style: {
            fontSize: 15,
            bold: true
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
              ["Таг", "Број на информации"],
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
  toggleTag() { this.showMe = !this.showMe;}
}