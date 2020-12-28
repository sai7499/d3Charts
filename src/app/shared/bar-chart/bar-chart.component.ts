import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
  private data: any;
  private width: number;
  private height: number;
  private margin = { top: 20, right: 30, bottom: 30, left: 40 };
  private svg: any;
  private x: any;
  private y: any;
  private g: any;

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.initSvg();
    this.getDataFromApi();

  }
  getDataFromApi() {
    this.dataService.dataForSharedBarChart().subscribe((data => {
      // tslint:disable-next-line: no-string-literal
      this.data = data['sampleJSONData'];
      console.log('bar chart shared data', this.data);
      this.initAxis(this.data);
      this.drawAxis();
      this.drawBars();
    }));
  }
  private initSvg() {
    this.svg = d3.select('#shared-bar-chart');
    this.width = +this.svg.attr('width') - this.margin.left - this.margin.right;
    this.height = +this.svg.attr('height') - this.margin.top - this.margin.bottom;
    this.g = this.svg
      .append('g')
      .attr(
        'transform',
        'translate(' + this.margin.left + ',' + this.margin.top + ')'
      );
  }
  private initAxis(data: any) {
    // Creating the X-axis band scale
    this.x = d3Scale
      .scaleBand()
      .rangeRound([0, this.width])
      .padding(0.1);

    // Creating the Y-axis band scale
    this.y = d3Scale.scaleLinear().rangeRound([this.height, 0]);

    this.x.domain(data.map(d => d.Grade));

    this.y.domain([0, d3Array.max(data.map(d => d.Students))]);
  }
  private drawAxis() {

    // Drawing the X-axis on the DOM
    this.g
      .append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3Axis.axisBottom(this.x));

    // Drawing the Y-axis on the DOM
    this.g
      .append('g')
      .attr('class', 'axis axis--y')
      .call(d3Axis.axisLeft(this.y))
      .append('text')
      .attr('class', 'axis-title')
      .attr('transform', 'rotate(-90)')
      .attr('y', -40)
      .attr('x', -200)
      .attr('dy', '0.71em')
      .text('Students');
  }
  private drawBars() {
    this.g
      .selectAll('.bar')
      .data(this.data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => this.x(d.Grade))
      .attr('y', d => this.y(d.Students))
      .attr('width', this.x.bandwidth())
      .attr('height', d => this.height - this.y(d.Students))
      .attr('fill', '#4682b4');
  }
}

