import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Hero} from './hero';
import {MessageService} from './message.service';
import {HEROES} from './mock-heroes';

@Injectable({
	providedIn: 'root'
})
export class HeroService {

	constructor(private messageService: MessageService) {}

	//可觀察對象
	getHeroes(): Observable<Hero[]> {
		const heroes = of(HEROES);
		this.messageService.add('HeroService: fetched heroes');
		return heroes;
	}

	getHero(id: number): Observable<Hero>{
		//現在，假設具有指定 `id` 的英雄始終存在。
		//錯誤處理將在教程的下一步中添加。
		const hero = HEROES.find(h => h.id === id)!;
		this.messageService.add(`HeroService: fetched hero id=${id}`);
		return of(hero);
	}
}
