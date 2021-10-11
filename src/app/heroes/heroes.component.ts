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
}
