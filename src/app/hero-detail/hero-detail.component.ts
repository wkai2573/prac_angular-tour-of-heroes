import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

import {Hero} from '../hero';
import {HeroService} from '../hero.service';

@Component({
	selector: 'app-hero-detail',
	templateUrl: './hero-detail.component.html',
	styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {

	constructor(
		private route: ActivatedRoute, //用來取得url相關參數
		private heroService: HeroService,
		private location: Location, //用於返回上個檢視
	) {}

	ngOnInit(): void {
		this.getHero();
	}

	@Input() hero?: Hero;

	getHero() {
		const id = Number(this.route.snapshot.paramMap.get('id'));
		this.heroService.getHero(id).subscribe(hero => this.hero = hero);
	}

	save() {
		if (this.hero) {
			this.heroService.updateHero(this.hero)
				.subscribe(() => this.goBack());
		}
	}

	goBack(): void {
		this.location.back();
	}

}
