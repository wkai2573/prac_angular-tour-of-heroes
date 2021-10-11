import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs'; //資料觀察
import {HttpClient, HttpHeaders} from '@angular/common/http'; //請求
import {catchError, map, tap} from 'rxjs/operators'; //請求錯誤處理

import {Hero} from './hero';
import {MessageService} from './message.service';

@Injectable({
	providedIn: 'root'
})
export class HeroService {
	constructor(
		private http: HttpClient,
		private messageService: MessageService,
	) {}

	//記錄消息
	private log(message: string) {
		this.messageService.add(`HeroService: ${message}`);
	}

	/**
	 * 錯誤處理器
	 * Handle Http operation that failed.
	 * Let the app continue.
	 * @param operation - name of the operation that failed
	 * @param result - optional value to return as the observable result
	 */
	private handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			console.error(error);
			this.log(`${operation} failed: ${error.message}`);
			return of(result as T);
		};
	}

	//URL to web api
	private heroesUrl = 'api/heroes';

	//取得所有英雄
	getHeroes(): Observable<Hero[]> {
		return this.http.get<Hero[]>(this.heroesUrl)
			.pipe(
				//RxJS_tap，中途做事不影響事件:紀錄
				tap(_ => this.log('fetched heroes')),
				//請求失敗處理
				catchError(this.handleError<Hero[]>('getHeroes', []))
				// catchError(error => {
				// 	console.error(error);
				// 	this.log(`getHeroes 失敗: ${error.message}`);
				// 	return of([] as Hero[]);
				// })
			);
	}

	//取得指定英雄
	/** GET hero by id. Will 404 if id not found */
	getHero(id: number): Observable<Hero> {
		// return of({id: 99, name: 'aaa'} as Hero);
		const url = `${this.heroesUrl}/${id}`;
		return this.http.get<Hero>(url).pipe(
			tap(_ => this.log(`fetched hero id=${id}`)),
			catchError(this.handleError<Hero>(`getHero id=${id}`))
		);
	}

	httpOptions = {
		headers: new HttpHeaders({'Content-Type': 'application/json'})
	};

	//更新英雄
	/** PUT: update the hero on the server */
	updateHero(hero: Hero): Observable<any> {
		return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
			tap(_ => this.log(`updated hero id=${hero.id}`)),
			catchError(this.handleError<any>('updateHero'))
		);
	}

	//新增英雄
	/** POST: add a new hero to the server */
	addHero(hero: Hero): Observable<Hero> {
		return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
			tap(newHero => this.log(`added hero w/ id=${newHero.id}`)),
			catchError(this.handleError<Hero>('addHero'))
		);
	}

	//移除英雄
	/** DELETE: delete the hero from the server */
	deleteHero(id: number): Observable<Hero> {
		const url = `${this.heroesUrl}/${id}`;

		return this.http.delete<Hero>(url, this.httpOptions).pipe(
			tap(_ => this.log(`deleted hero id=${id}`)),
			catchError(this.handleError<Hero>('deleteHero'))
		);
	}

	//搜尋英雄
	/* GET heroes whose name contains search term */
	searchHeroes(term: string): Observable<Hero[]> {
		if (!term.trim()) {
			// if not search term, return empty hero array.
			return of([]);
		}
		return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
			tap(x => x.length ?
				this.log(`found heroes matching "${term}"`) :
				this.log(`no heroes matching "${term}"`)),
			catchError(this.handleError<Hero[]>('searchHeroes', []))
		);
	}
}
