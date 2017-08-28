import { GithubService } from './../../services/github/github.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-github-search',
  templateUrl: './github-search.component.html',
  styleUrls: ['./github-search.component.scss']
})
export class GithubSearchComponent implements OnInit {

  term: string;
  results;

  constructor(
    private github: GithubService
  ) {
    this.results = [];
  }

  ngOnInit() {
  }

  doSearch() {
    this.github.searchRepos(this.term).subscribe((data) => {
      this.results = data;
    });
  }

  viewRepo() {

  }

}
