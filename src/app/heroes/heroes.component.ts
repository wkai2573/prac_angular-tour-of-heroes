import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';

@Component({
	selector: 'app-heroes',
	templateUrl: './heroes.component.html',
	styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

	heroes = HEROES;

	constructor() { }

	ngOnInit(): void { //生命週期_初始化
	}

	selectedHero?: Hero;
	onSelect(hero: Hero): void {
		this.selectedHero = hero;
	}
}
