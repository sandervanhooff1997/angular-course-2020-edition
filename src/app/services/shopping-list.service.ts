import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from '@models/ingredient.model';

@Injectable({ providedIn: 'root' })
export class ShoppingListService {
  shoppingListChanged = new EventEmitter<Ingredient[]>();

  private shoppingList: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  constructor() {}

  getShoppingList() {
    return this.shoppingList.slice();
  }

  addIngredient(i: Ingredient) {
    this.shoppingList.push(i);
    this.shoppingListChanged.emit(this.shoppingList.slice());
  }

  addIngredients(i: Ingredient[]) {
    this.shoppingList.push(...i);
    this.shoppingListChanged.emit(this.shoppingList.slice());
  }
}
