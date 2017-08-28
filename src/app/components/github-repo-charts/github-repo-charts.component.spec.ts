import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubRepoChartsComponent } from './github-repo-charts.component';

describe('GithubRepoChartsComponent', () => {
  let component: GithubRepoChartsComponent;
  let fixture: ComponentFixture<GithubRepoChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GithubRepoChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GithubRepoChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
