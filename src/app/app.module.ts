import { RoutingModule } from './routing/routing.module';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { GithubService } from './services/github/github.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MdInputModule,
  MdGridListModule,
  MdListModule,
  MdButtonModule,
  MdProgressSpinnerModule,
  MdCardModule,
  MdChipsModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartModule } from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import * as highcharts from 'highcharts';
import * as highcharts3d from 'highcharts/highcharts-3d';

import { AppComponent } from './app.component';
import { GithubSearchComponent } from './components/github-search/github-search.component';
import { GithubRepoComponent } from './components/github-repo/github-repo.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { GithubRepoChartsComponent } from './components/github-repo-charts/github-repo-charts.component';
import { GithubRepoIssuesComponent } from './components/github-repo-issues/github-repo-issues.component';

export function highchartsFactory() {
  highcharts3d(highcharts);
  return highcharts;
}

@NgModule({
  declarations: [
    AppComponent,
    GithubSearchComponent,
    GithubRepoComponent,
    NotFoundComponent,
    GithubRepoChartsComponent,
    GithubRepoIssuesComponent,
    GithubRepoIssuesComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    RoutingModule,
    ChartModule,
    MdInputModule,
    MdListModule,
    MdButtonModule,
    MdCardModule,
    MdChipsModule
  ],
  providers: [
    GithubService,
    { provide: HighchartsStatic, useFactory: highchartsFactory }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
