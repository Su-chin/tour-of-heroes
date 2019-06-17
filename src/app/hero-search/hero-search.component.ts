import { Component, OnInit } from '@angular/core';

import {Observable, Subject } from 'rxjs';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Hero} from '../hero';
import { HeroService} from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
  heroes$: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  search(term: string): void {
    this.searchTerms.next(term);
  }

  constructor(
    private heroService: HeroService
  ) { }

  ngOnInit() {
    this.heroes$ = this.searchTerms.pipe(
      // 各キーストロークのあと、検索前に300ms待つ
      debounceTime(300),

      // 直前の検索結果と同じ場合は無視する
      distinctUntilChanged(),

      // 検索結果が変わるたびに新しい検索Observableにスイッチする
      switchMap((term: string) => this.heroService.searchHeros(term)),
    );
  }

}
