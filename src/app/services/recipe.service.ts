import { Injectable } from '@angular/core';
import { Recipe } from '@models/recipe.model';
import { Ingredient } from '@models/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  // notify listeners subscribed to this subject
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'Recipe A',
      'This is simply a test',
      'https://2rdnmg1qbg403gumla1v9i2h-wpengine.netdna-ssl.com/wp-content/uploads/sites/3/2019/10/redMeat-849360782-770x553-650x428.jpg',
      [new Ingredient('Meat', 1), new Ingredient('French Fries', 20)]
    ),
    new Recipe(
      'Recipe B',
      'This is simply a test',
      'https://2rdnmg1qbg403gumla1v9i2h-wpengine.netdna-ssl.com/wp-content/uploads/sites/3/2019/10/redMeat-849360782-770x553-650x428.jpg',
      [new Ingredient('Buns', 2), new Ingredient('Meat', 1)]
    )
  ];

  constructor() {}

  getRecipes() {
    // make sure to create a copy so the source can't be changed from outside
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.getRecipes()[index];
  }

  addRecipe(r: Recipe) {
    this.recipes.push(r);
    this.notifyRecipesChanged();
  }

  updateRecipe(index: number, updated: Recipe) {
    this.recipes[index] = updated;
    this.notifyRecipesChanged();
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.notifyRecipesChanged();
  }

  private notifyRecipesChanged() {
    this.recipesChanged.next(this.getRecipes());
  }
}
