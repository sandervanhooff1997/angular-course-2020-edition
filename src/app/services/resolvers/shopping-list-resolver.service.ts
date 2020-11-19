import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Ingredient } from '@models/ingredient.model';
import { ShoppingListService } from '@services/shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListResolverService implements Resolve<Ingredient[]> {
  constructor(private slService: ShoppingListService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.slService.fetchIngredients();
  }
}
