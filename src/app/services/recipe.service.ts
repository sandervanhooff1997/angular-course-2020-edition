import { Injectable } from '@angular/core';
import { Recipe } from '@models/recipe.model';
import { Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AlertService } from './alert.service';
import { AlertType } from '@models/enums/alert-type.enum';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  // notify listeners subscribed to this subject
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [];

  constructor(private http: HttpClient, private alertService: AlertService) {}

  fetchRecipes() {
    return this.http.get<Recipe[]>('recipes.json').pipe(
      map(responseData => {
        const arr: Recipe[] = [];
        for (const key in responseData) {
          // * transform the response with a observable pipe
          if (responseData.hasOwnProperty(key)) {
            let r = { ...responseData[key], id: key };
            if (!r.ingredients) r.ingredients = []; // always add ingredients array to prevent errors
            arr.push(r);
          }
        }

        this.recipes = arr;
        this.notifyRecipesChanged();
        return arr;
      })
    );
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: string) {
    return this.recipes.find(r => r.id === id);
  }

  addRecipe(r: Recipe) {
    this.http.post('recipes.json', r).subscribe(() => {
      this.fetchRecipes().subscribe();

      this.alertService.broadcast({
        message: 'Recipe added.',
        type: AlertType.success
      });
    });
  }

  updateRecipe(id: string, updated: Recipe) {
    this.http.put('recipes/' + id + '.json', updated).subscribe(() => {
      this.fetchRecipes().subscribe();

      this.alertService.broadcast({
        message: 'Recipe updated.',
        type: AlertType.success
      });
    });
  }

  deleteRecipe(id: string) {
    return this.http.delete('recipes/' + id + '.json').subscribe(() => {
      this.fetchRecipes().subscribe();

      this.alertService.broadcast({
        message: 'Recipe deleted.',
        type: AlertType.success
      });
    });
  }

  notifyRecipesChanged() {
    this.recipesChanged.next(this.getRecipes());
  }
}
