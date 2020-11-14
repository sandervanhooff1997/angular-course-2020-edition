import { Injectable } from '@angular/core';
import { Recipe } from '@models/recipe.model';
import { Ingredient } from '@models/ingredient.model';

@Injectable()
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(
      1,
      'Recipe A',
      'This is simply a test',
      'https://2rdnmg1qbg403gumla1v9i2h-wpengine.netdna-ssl.com/wp-content/uploads/sites/3/2019/10/redMeat-849360782-770x553-650x428.jpg',
      [new Ingredient('Meat', 1), new Ingredient('French Fries', 20)]
    ),
    new Recipe(
      2,
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

  getRecipeById(id: number) {
    return this.recipes.slice().find(r => r.id === id);
  }
}
