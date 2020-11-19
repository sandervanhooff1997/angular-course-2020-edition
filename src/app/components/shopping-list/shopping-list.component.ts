import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '@models/ingredient.model';
import { ShoppingListService } from '@services/shopping-list.service';
import { CanComponentDeactivate } from '@services/guards/can-deactivate-guard.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent
  implements OnInit, CanComponentDeactivate, OnDestroy {
  ingredients: Ingredient[] = [];
  editting: boolean = true;
  shoppingListSub: Subscription;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.shoppingListSub = this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => (this.ingredients = ingredients)
    );
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.editting) return true;
    else return confirm('u sure?');
  }

  deleteIngredient(id: string) {
    this.shoppingListService.deleteIngredient(id);
  }

  ngOnDestroy() {
    // * make sure to unsubscribe!
    this.shoppingListSub.unsubscribe();
  }
}
