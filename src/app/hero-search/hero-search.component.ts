import {Component, OnInit} from '@angular/core';

import {Observable, Subject} from 'rxjs';

import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

import {Hero} from '../hero';
import {HeroService} from '../hero.service';

@Component({
	selector: 'app-hero-search',
	templateUrl: './hero-search.component.html',
	styleUrls: ['./hero-search.component.scss']
})
export class HeroSearchComponent implements OnInit {

	constructor(private heroService: HeroService) {}

	//搜尋英雄列表
	heroes$!: Observable<Hero[]>;

	//搜尋對象, Subject:可觀察的 & 可訂閱其他觀察對象
	private searchTerms = new Subject<string>();

	//將搜索詞推送到可觀察流中。
	search(term: string): void {
		this.searchTerms.next(term);
	}

	ngOnInit(): void {
		this.heroes$ = this.searchTerms.pipe(
			debounceTime(300), //停止輸入後至少300ms後才請求
			distinctUntilChanged(), //與前一項相同則不請求
			//每次詞語更改時切換到新的搜索 observable
			switchMap((term: string) => this.heroService.searchHeroes(term)),
		);
	}
}