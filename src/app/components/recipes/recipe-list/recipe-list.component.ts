import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '@models/recipe.model';
import { RecipeService } from '@services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.isFetching = true;
    this.recipeService.getRecipes().subscribe(recipes => {
      this.isFetching = false;
      this.recipes = recipes;
    });

    this.recipesChangedSub = this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => {
        this.isFetching = false;
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
