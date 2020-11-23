import { Injectable } from '@angular/core';
import { Ingredient } from '@models/ingredient.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AlertService } from './alert.service';
import { AlertType } from '@models/enums/alert-type.enum';

@Injectable({ providedIn: 'root' })
export class ShoppingListService {
  /**
   * * use a subject instead of an Angular event emitter
   * * main advantage: you can trigger observable.next() from outside (the observer) e.g. from a button click
   * * also more lightweight
   */
  ingredientsChanged = new Subject<Ingredient[]>();
  private ingredients: Ingredient[] = [];

  constructor(private http: HttpClient, private alertService: AlertService) {}

  fetchIngredients() {
    return this.http.get<Ingredient[]>('shopping-list.json').pipe(
      map(responseData => {
        const arr: Ingredient[] = [];
        for (const key in responseData) {
          // * transform the response with a observable pipe
          if (responseData.hasOwnProperty(key)) {
            let r = { ...responseData[key], id: key };
            arr.push(r);
          }
        }

        this.ingredients = arr;
        this.notifyShoppingListChanged();
        return arr;
      })
    );
  }

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(id: string) {
    return this.ingredients.find(i => i.id === id);
  }

  addIngredient(i: Ingredient) {
    this.http.post('shopping-list.json', i).subscribe(() => {
      this.fetchIngredients().subscribe();

      this.alertService.broadcast({
        message: 'Ingredient added to shopping list.',
        type: AlertType.success
      });
    });
  }

  addIngredients(i: Ingredient[]) {
    this.http
      .put('shopping-list.json', [...this.ingredients, ...i])
      .subscribe(() => {
        this.fetchIngredients().subscribe();

        this.alertService.broadcast({
          message: 'Ingredients added to shopping list.',
          type: AlertType.success
        });
      });
  }

  updateIngredient(id: string, updated: Ingredient) {
    this.http.put('shopping-list/' + id + '.json', updated).subscribe(() => {
      this.fetchIngredients().subscribe();

      this.alertService.broadcast({
        message: 'Ingredient updated.',
        type: AlertType.success
      });
    });
  }

  deleteIngredient(id: string) {
    return this.http.delete('shopping-list/' + id + '.json').subscribe(() => {
      this.fetchIngredients().subscribe();

      this.alertService.broadcast({
        message: 'Recipe deleted.',
        type: AlertType.success
      });
    });
  }

  notifyShoppingListChanged() {
    this.ingredientsChanged.next(this.getIngredients());
  }
}
