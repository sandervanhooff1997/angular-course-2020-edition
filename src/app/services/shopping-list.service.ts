import { Injectable } from '@angular/core';
import { Ingredient } from '@models/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ShoppingListService {
  /**
   * * use a subject instead of an Angular event emitter
   * * main advantage: you can trigger observable.next() from outside (the observer) e.g. from a button click
   * * also more lightweight
   */
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  constructor() {}

  getIngredients() {
    this.ingredientsChanged.next();
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients.slice()[index];
  }

  addIngredient(i: Ingredient) {
    this.ingredients.push(i);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(i: Ingredient[]) {
    this.ingredients.push(...i);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  updateIngredient(index: number, updated: Ingredient) {
    this.ingredients[index] = updated;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
