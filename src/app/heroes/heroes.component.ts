import { Component, OnInit } from '@angular/core';
import { Hero }              from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[]

  constructor(private heroSerive: HeroService) { }

  ngOnInit() {
    this.getHeroes()
  }

  getHeroes(): void {
    this.heroSerive.getHeroes()
      .subscribe(heroes => this.heroes = heroes)
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroSerive.deleteHero(hero).subscribe();
  }
}
