import {Component, OnInit} from '@angular/core';
import {Hero} from '../hero';
import {HeroService} from '../hero.service';
import {MessageService} from '../message.service';

@Component({
	selector: 'app-heroes',
	templateUrl: './heroes.component.html',
	styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

	constructor(
		private heroService: HeroService
	) {}

	//屬性__________
	heroes: Hero[] = [];
	getHeroes(): void {
		this.heroService.getHeroes().subscribe(heroes => {
			this.heroes = heroes;
		});
	}

	//事件:生命週期__________
	ngOnInit(): void {
		this.getHeroes();
	}

	//方法__________
	add(name: string): void {
		name = name.trim();
		if (!name) return;
		this.heroService
			.addHero({name} as Hero)
			.subscribe(hero => this.heroes.push(hero));
	}

	delete(hero: Hero) {
		this.heroes = this.heroes.filter(h => h !== hero); //資料移除英雄
		this.heroService.deleteHero(hero.id).subscribe(); //請求移除英雄
	}
}
