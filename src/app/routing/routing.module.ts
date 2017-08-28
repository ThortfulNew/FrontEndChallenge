import { GithubRepoChartsComponent } from '../components/github-repo-charts/github-repo-charts.component';
import { GithubSearchComponent } from '../components/github-search/github-search.component';
import { NotFoundComponent } from '../components/not-found/not-found.component';
import { GithubRepoComponent } from './../components/github-repo/github-repo.component';
import { AppComponent } from './../app.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: 'index', component: GithubSearchComponent },
  { path: 'repo/:owner/:repo', component: GithubRepoComponent, data: { title: 'Repo' } },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule { }
