import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubRepoIssuesComponent } from './github-repo-issues.component';

describe('GithubRepoIssuesComponent', () => {
  let component: GithubRepoIssuesComponent;
  let fixture: ComponentFixture<GithubRepoIssuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GithubRepoIssuesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GithubRepoIssuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
