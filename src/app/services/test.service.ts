import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from '@models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  itemChanged = new Subject<Recipe[]>();
  private list: Recipe[] = [new Recipe(10, 'name', 'descr', 'imgPath', [])];

  constructor() {}

  doTest() {
    const r = new Recipe(10, 'name', 'descr', 'imgPath', []);
    this.list.push(r);

    this.itemChanged.next(this.list.slice());
  }
}
