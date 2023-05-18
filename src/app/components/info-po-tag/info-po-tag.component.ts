import { Component, Inject, NgZone, OnInit, PLATFORM_ID } from '@angular/core';
// amCharts imports
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5plugins_exporting from "@amcharts/amcharts5/plugins/exporting";
import { isPlatformBrowser } from '@angular/common';
import { Tags } from 'src/app/services/tag-service/tags';
import { TagsService } from 'src/app/services/tag-service/tags.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TagsCategoriesService } from 'src/app/services/tagsCategoriesService/tags-categories.service';
import { ChartsModelTag } from 'src/app/services/charts/charts-model-tag';
import { ChartsModelTagService } from 'src/app/services/charts/charts-model-tag.service';
import { tagsCategories } from 'src/app/services/tagsCategoriesService/tagsCategories';
import { Encoded } from 'src/app/services/text/logo';

@Component({
  selector: 'app-info-po-tag',
  templateUrl: './info-po-tag.component.html',
  styleUrls: ['./info-po-tag.component.css']
})
export class InfoPoTagComponent implements OnInit {
  //https://www.amcharts.com/demos/column-with-rotated-series/

  chartModelTagList: ChartsModelTag[];
  tagsList: Tags[];
  tagsCategoriesList:tagsCategories[];
  chartt: ChartsModelTag;

  tag_name_c: string;
  num_of_tags: number;

  data = [];

  showMe: boolean

  sortedArray: Function;
  selectResult: Function;
  sort: boolean = false;

  getTagName: Function;

  // savePDF: Function;

  constructor(@Inject(PLATFORM_ID) private platformId, private zone: NgZone,
                    private tagService: TagsService,
                    private chartsModelTagService: ChartsModelTagService,
                    private tagsCategoriesService: TagsCategoriesService,
                    public http: HttpClient) {
                  this.chartt=new ChartsModelTag();
  }
  // public tagCategoryTags() {
  //   for(var tag of this.tagsList) {
  //     this.tagCategoryTagId = tag.tags_category_id;
  //     for (var tagCategory of this.tagsCategoriesList) {
  //       if (tagCategory.tags_category_id == this.tagCategoryTagId) {
  //         this.tagCategoryTagName = tagCategory.tags_category_name;
  //       }
  //     }
  //   }
  // }
  private getTagsCategories() {
    this.tagsCategoriesService.getTagsCategories().subscribe({
      complete: ()                              => {console.log("completeHandler");}, // completeHandler
      error:    (error: HttpErrorResponse)      => {console.log(error.message); },// errorHandler
      next:     (response: tagsCategories[])    => { this.tagsCategoriesList = response;}// nextHandler
    });
  }
  private getTags(): any {
    this.tagService.getTags().subscribe({
      complete: ()                          => {console.log("completeHandler");}, // completeHandler
      error:    (error: HttpErrorResponse)  => {console.log(error.message); },// errorHandler
      next:     (response: Tags[])          => { this.tagsList = response;}// nextHandler
    });
  }
  private returnTags(): any {
    this.tagService.getTags().subscribe({
      complete: ()                          => {console.log("completeHandler");}, // completeHandler
      error:    (error: HttpErrorResponse)  => {console.log(error.message); },// errorHandler
      next:     (response: Tags[])          => { this.tagsList = response;}// nextHandler
    });
  }
  private returnClipsByTag(): any {
      // this.chartsModelTagService.return_clips_by_tag().subscribe({
      //   complete: ()                            => {console.log("completeHandler");}, // completeHandler
      //   error:    (error: HttpErrorResponse)    => {console.log(error.message); },// errorHandler
      //   next:     (response: ChartsModelTag[])  => { this.chartModelTagList = response;}// nextHandler
      // });
    this.chartsModelTagService.return_clips_by_tag().subscribe(response => {this.chartModelTagList = response;});
  }
  private getDataModelTag(){
    let dataArray=[];
    if(!this.chartModelTagList) {
      console.log("No data found");
    } else {
      this.chartModelTagList.forEach(element => {
        dataArray.push({ "Име на таг": element.tag_name_c, "Број на информации по таг": element.num_of_tags });
      });
    }
    return dataArray;
  }
  private getDataModelTags(){
    let dataArray=[];
    if(!this.tagsList) {
      console.log("No data found");
    } else {
      this.tagsList.forEach(element => {
        dataArray.push({ tag: element.tag_name_c, value: element.tag_id });
      });
    }
    return dataArray;
  }

  private chartRender(am5xy:any,root:any){
    let xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 });
          xRenderer.labels.template.setAll({
            rotation: -90,
            centerY: am5.p50,
            centerX: am5.p100,
            paddingRight: 15
          });
    return xRenderer;
  }
  private createAxisX(chart:any,am5xy:any,xRenderer:any,root:any){
    let xAxis1 = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
      maxDeviation: 0.3,
      categoryField: "Име на таг",
      renderer: xRenderer,
      tooltip: am5.Tooltip.new(root, {})
    }));
    return xAxis1;
  }
  private createAxisY(chart:any,am5xy:any,root:any){
    let yAxis1 = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      maxDeviation: 0.3,
      renderer: am5xy.AxisRendererY.new(root, {})
    }));
    return yAxis1;
  }
  // Create series
  private createXYChart(xAxis:any,yAxis:any,series:any,chart:any,root:any){
    //https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    series = chart.series.push(am5xy.ColumnSeries.new(root, {
      name: "Series 1",
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "Број на информации по таг",
      sequencedInterpolation: true,
      categoryXField: "Име на таг",
      tooltip: am5.Tooltip.new(root, { labelText: "{valueY}"})
    }));

    series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5 });
    series.columns.template.adapters.add("fill", function (fill, target) {
      return chart.get("colors").getIndex(series.columns.indexOf(target));
    });

    series.columns.template.adapters.add("stroke", function (stroke, target) {
      return chart.get("colors").getIndex(series.columns.indexOf(target));
    });
    return series;
  }
  private drawChart(xAxis:any,series:any,chart:any,record:any){
    xAxis.data.setAll(record);
    series.data.setAll(record);

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear(1000);
    chart.appear(1000, 100);
  }
  determineAvailableClipsByTags( chartModelTagList: ChartsModelTag[]) {
    this.chartModelTagList = chartModelTagList;

    if (!this.chartModelTagList ) {
      console.log("Failed to get ClipsByTags");
    } else {
      console.log( this.chartModelTagList.length + " ClipsByTagsfound ");
    }
  }
  determineAvailableTags( tagsList: Tags[]) {
    this.tagsList = tagsList;

    if (!this.tagsList ) {
      console.log("Failed to get ClipsByTags");
    } else {
      console.log( this.tagsList.length + " ClipsByTagsfound ");
    }
  }
  ngOnInit(): any {
    //this.getTags().subscribe( data=>this.determineAvailableTags(data) );
    //Vo console vrakja problem so subscribe
   this.returnClipsByTag().subscribe( data=>this.determineAvailableClipsByTags(data) );
  }

  // Run the function only in the browser
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {f();});
    }
  }

  ngAfterViewInit() {

    //Chartdiv i chatrdiv1 rabotat bez nikakov problem, se zemaat podatoci i se zapishuvaat vo chartovite
    // Chart code goes in here - raboti bez nikakov problem i zema podatoci od baza i gi zapisuva vo chart
    this.browserOnly(() => {

    //this.data   =this.getDataModelTags() ;
    this.data   = this.getDataModelTag();
    let root    = am5.Root.new("chartdiv");
    root.setThemes([am5themes_Animated.new(root)]);

      // Create chart
      // https://www.amcharts.com/docs/v5/charts/xy-chart/
      let chart = root.container.children.push(am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX:true
      }));

      // Add cursor
      // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
      let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
      cursor.lineY.set("visible", false);

      // Create axes
      let xRenderer = this.chartRender(am5xy,root);
      let xAxis     = this.createAxisX(chart,am5xy,xRenderer,root);
      let yAxis     = this.createAxisY(chart,am5xy,root);

      // Set data
      /*let data = [
        { tag: "Ð¢ÐµÐ»ÐµÐ²Ð¸Ð·Ð¸Ñ˜Ð°", value: 2025},
        { tag: "ÐžÑÐ¸Ð³ÑƒÑ€ÑƒÐ²Ð°ÑšÐµ",value: 1882},
        { tag: "ÐŸÑ€Ð¾Ð¼ÐµÑ", value: 441 }];*/
      //let data = [];
      //this.tagsList;//-zemi od baza dolu prikazano

      let series:any;
       series=this.createXYChart(xAxis,yAxis,series,chart,root);
      this.drawChart(xAxis,series,chart,this.data);


      let sourceData = this.getDataModelTag();
      let bodyData =[];

      sourceData.forEach(function(sourceRow){
        let dataRow =[];

        dataRow.push(sourceRow["Име на таг"]);
        dataRow.push(sourceRow["Број на информации по таг"]);

        bodyData.push(dataRow);
      });


      let exporting = am5plugins_exporting.Exporting.new(root, {
        menu: am5plugins_exporting.ExportingMenu.new(root, {}),
        filePrefix: "sette-info-po-tag",
        dataSource: this.getDataModelTag(),
        pdfOptions: {
          includeData: false,
          pageMargins: [15, 15, 15, 15],
          pageOrientation: "portrait",
          pageSize: "A4"
         // maxHeight: 1000,
          //maxWidth: 1000,

        },
        pdfdataOptions: {
          addColumnNames: true,
          disabled: true
        },
        xlsxOptions: {
          disabled: false,
          addColumnNames: true
        },
        csvOptions: {
          disabled: false,
        },
        pngOptions: {
          disabled: false,
        },
        jpgOptions: {
          disabled: false,
        },
        jsonOptions: {
          disabled: false,
        },
        htmlOptions: {
          disabled: false,
        }
      });


      exporting.events.on("pdfdocready", function(event) {

        // Add title to the beginning
        event.doc.content.unshift({
          text: "Број на информации по ТАГ",
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

    //   let descendingArr = this.getDataModelTag().sort((a, b) => b["Број на информации по таг"] - a["Број на информации по таг"]);
    //   let alphabeticalArr = this.getDataModelTag().sort((a, b) => a["Име на таг"].localeCompare(b["Име на таг"]));

    //  this.sortedArray = function() {
    //   console.log(descendingArr);
    //   console.log(alphabeticalArr);
    //   }

    //   this.selectResult = function(event: any, selected: any) {
    //     event.preventDefault();
    //     console.log(123);
    //  }

    });
  }

  toggleTag() {
    this.showMe = !this.showMe;
  }
}