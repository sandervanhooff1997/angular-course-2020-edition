import { Component, OnInit } from '@angular/core';
import { Recipe } from '@models/recipe.model';
import { RecipeService } from '@services/recipe.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
  providers: [RecipeService]
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[];

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
  }
}
