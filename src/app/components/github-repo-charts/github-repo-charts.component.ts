import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-github-repo-charts',
  templateUrl: './github-repo-charts.component.html',
  styleUrls: ['./github-repo-charts.component.scss']
})
export class GithubRepoChartsComponent implements OnInit {

  @Input() repo;
  options;

  constructor(
  ) { }

  ngOnInit() {

    const chartValues = {
      categories: ['Forks', 'Stargazers', 'Open Issues', 'Watchers', 'Subscribers'],
      data: [
        this.repo.forks_count,
        this.repo.stargazers_count,
        this.repo.open_issues,
        this.repo.watchers_count,
        this.repo.subscribers_count
      ]
    };

    this.options = {
      chart: {
        type: 'column',
        options3d: {
          enabled: true,
          alpha: 10,
          beta: 25,
          depth: 70
        }
      },
      title: {
        text: `${this.repo.name} charts`
      },
      subtitle: {
        text: `A chart to show stats of <strong>${this.repo.name}</strong> forks, stargazers & issues`
      },
      plotOptions: {
        column: {
          depth: 25
        }
      },
      xAxis: {
        categories: chartValues.categories
      },
      yAxis: {
        title: {
          text: null
        }
      },
      series: [{
        name: 'Totals',
        data: chartValues.data
      }]
    };
  }

}
