import { Component, OnInit } from '@angular/core';
import { Ingredient } from '@models/ingredient.model';
import { ShoppingListService } from '@services/shopping-list.service';
import { CanComponentDeactivate } from '@services/guards/can-deactivate-guard.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, CanComponentDeactivate {
  shoppingList: Ingredient[];
  editting: boolean = true;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.shoppingList = this.shoppingListService.getShoppingList();
    this.shoppingListService.shoppingListChanged.subscribe(
      (shoppingList: Ingredient[]) => (this.shoppingList = shoppingList)
    );
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.editting) return true;
    else return confirm('u sure?');
  }
}
