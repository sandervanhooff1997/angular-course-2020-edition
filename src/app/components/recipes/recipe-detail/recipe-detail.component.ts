import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '@models/recipe.model';
import { ShoppingListService } from '@services/shopping-list.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  // You can assign an alias name for the internal property
  // @Input('alias-recipe') recipe: Recipe;
  @Input() recipe: Recipe;

  constructor(private slService: ShoppingListService) {}

  ngOnInit(): void {}

  toShoppingList() {
    this.slService.addIngredients(this.recipe.ingredients);
  }
}
