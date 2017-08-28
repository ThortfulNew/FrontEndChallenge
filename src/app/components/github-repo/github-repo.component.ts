import 'rxjs/add/operator/switchMap';
import { GithubService } from '../../services/github/github.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-github-repo',
  templateUrl: './github-repo.component.html',
  styleUrls: ['./github-repo.component.scss']
})
export class GithubRepoComponent implements OnInit {

  repo;
  activeToggle: string;

  constructor(
    private route: ActivatedRoute,
    private github: GithubService
  ) {
    this.repo = null;
    this.activeToggle = null;
  }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.github.getRepo(params.get('owner') + '/' + params.get('repo')))
      .subscribe(repo => this.repo = repo);
  }

  updateToggle(type) {
    this.activeToggle = type;
  }

}
