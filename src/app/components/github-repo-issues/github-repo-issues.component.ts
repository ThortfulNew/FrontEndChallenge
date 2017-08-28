import { GithubService } from './../../services/github/github.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-github-repo-issues',
  templateUrl: './github-repo-issues.component.html',
  styleUrls: ['./github-repo-issues.component.scss']
})
export class GithubRepoIssuesComponent implements OnInit {

  @Input() repo;
  issues;

  constructor(private github: GithubService) { }

  ngOnInit() {
    this.github.getIssues(this.repo.full_name).subscribe((issues) => {
      this.issues = issues;
    });
  }

}
