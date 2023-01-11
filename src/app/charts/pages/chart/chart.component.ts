import { Component, OnInit } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';
import { PhotosService } from 'src/app/photos/services/photos.service';
import { Photo } from 'src/app/photos/interfaces/photo.interface';
import { of } from 'rxjs';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styles: [
  ]
})
export class ChartComponent implements OnInit {
  photos!: Photo[];

  // Doughnut
  public doughnutChartLabels: string[] = [];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [{ data: [] }],

  };
  public doughnutChartType: ChartType = 'doughnut';

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  constructor(private ps: PhotosService) { }

  ngOnInit(): void {

    this.ps.getVotes().subscribe(data => {
      this.doughnutChartData = {
        labels: Object.keys(data),
        datasets: [
          {
            data: Object.values(data),
            backgroundColor: ['#DFFF00', '#DE3163', '#FFBF00', '#48E120', '#40E0D0', '#FF7F50', '#6495ED', '#CCCCFF', '#27AE60', '#8E44AD', '#D35400', '#7F8C8D', '#2980B9', '#FF00FF', '#2C3E50'],
            hoverBackgroundColor: ['#DFFF0090', '#DE316390', '#FFBF0090', '#48E12090', '#40E0D090', '#FF7F5090', '#6495ED90', '#CCCCFF90', '#27AE6090', '#8E44AD90', '#D3540090', '#7F8C8D90', '#2980B990', '#FF00FF90', '#2C3E5090'],
            hoverBorderColor: ['#DFFF00', '#DE3163', '#FFBF00', '#48E120', '#40E0D0', '#FF7F50', '#6495ED', '#CCCCFF', '#27AE60', '#8E44AD', '#D35400', '#7F8C8D', '#2980B9', '#FF00FF', '#2C3E50']
          }
        ]
      };
    })
  }

}
