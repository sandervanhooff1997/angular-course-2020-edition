import { Injectable } from '@angular/core';
import { Recipe } from '@models/recipe.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  // notify listeners subscribed to this subject
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [];

  constructor(private http: HttpClient) {}

  getRecipes() {
    return this.http.get('recipes.json').pipe(
      map(responseData => {
        // * transform the response with a observable pipe
        const arr: Recipe[] = [];
        for (const key in responseData)
          if (responseData.hasOwnProperty(key))
            arr.push({ ...responseData[key], id: key });

        return arr;
      })
    );
  }

  getRecipe(id: string) {
    return this.http.get('recipes/' + id + '.json');
  }

  addRecipe(r: Recipe) {
    this.http.post('recipes.json', r).subscribe(res => {
      this.getRecipes().subscribe(recipes => {
        this.recipes = recipes;
        this.notifyRecipesChanged();
      });
    });
  }

  updateRecipe(id: string, updated: Recipe) {
    this.http.put('recipes/' + id + '.json', updated).subscribe(() =>
      this.getRecipes().subscribe(recipes => {
        this.recipes = recipes;
        this.notifyRecipesChanged();
      })
    );
  }

  deleteRecipe(id: string) {
    return this.http.delete('recipes/' + id + '.json').subscribe(() =>
      this.getRecipes().subscribe(recipes => {
        this.recipes = recipes;
        this.notifyRecipesChanged();
      })
    );
  }

  private notifyRecipesChanged() {
    this.recipesChanged.next(this.recipes.slice());
  }
}
