import { Component, OnInit } from '@angular/core';
import { Ingredient } from '@models/ingredient.model';
import { ShoppingListService } from '@services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  shoppingList: Ingredient[];

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.shoppingList = this.shoppingListService.getShoppingList();
    this.shoppingListService.shoppingListChanged.subscribe(
      (shoppingList: Ingredient[]) => (this.shoppingList = shoppingList)
    );
  }
}
