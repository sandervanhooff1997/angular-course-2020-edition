import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '@models/recipe.model';
import { RecipeService } from '@services/recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  recipesChangedSub: Subscription;
  filterText: string;
  isFetching: boolean = false;
  public gridData: any[] = null;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // recipes are fetched by the route resolver before loading this component
    this.recipes = this.recipeService.getRecipes();

    this.recipesChangedSub = this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.recipesChangedSub.unsubscribe();
  }
}
