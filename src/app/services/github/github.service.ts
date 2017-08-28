import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class GithubService {

  private apiUrl;

  constructor(private http: Http) {
    this.apiUrl = 'https://api.github.com/';
  }

  searchRepos(term) {
    return this.http.get(this.apiUrl + 'search/repositories?q=' + term)
      .map((response: Response) => response.json());
  }

  getRepo(repoName) {
    return this.http.get(this.apiUrl + 'repos/' + repoName)
      .map((response: Response) => response.json());
  }

  getIssues(repoName) {
    return this.http.get(this.apiUrl + 'repos/' + repoName + '/issues')
      .map((response: Response) => response.json());
  }

}
