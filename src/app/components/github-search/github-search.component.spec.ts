import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubSearchComponent } from './github-search.component';

describe('GithubSearchComponent', () => {
  let component: GithubSearchComponent;
  let fixture: ComponentFixture<GithubSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GithubSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GithubSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
