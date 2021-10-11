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
	heroes$!: Observable<Hero[]>;
	private searchTerms = new Subject<string>();

	constructor(private heroService: HeroService) {}

	// Push a search term into the observable stream.
	search(term: string): void {
		this.searchTerms.next(term);
	}

	ngOnInit(): void {
		this.heroes$ = this.searchTerms.pipe(
			debounceTime(300), //每次請求至少等待300毫秒
			distinctUntilChanged(), //與前一項相同則不請求

			// switch to new search observable each time the term changes
			switchMap((term: string) => this.heroService.searchHeroes(term)),
		);
	}
}