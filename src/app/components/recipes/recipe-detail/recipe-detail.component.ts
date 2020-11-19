import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '@models/recipe.model';
import { ShoppingListService } from '@services/shopping-list.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '@services/recipe.service';
import { interval, Subscription, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  // You can assign an alias name for the internal property
  // @Input('alias-recipe') recipe: Recipe;
  // @Input() recipe: Recipe;
  recipe: Recipe;
  id: string;
  loading: boolean = false;
  // firstObserverSubscription: Subscription;
  // customObservable: Observable;

  constructor(
    private slService: ShoppingListService,
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // subscribe as this is a child route, and ngOnInit only gets called once
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];

      this.recipe = this.recipeService.getRecipe(this.id);
    });

    // this.firstObserverSubscription = interval(1000).subscribe(count => console.log(count));
    // const customObservable = Observable.create(observer => {
    //   let count = 0;
    //   setInterval(() => {
    //     observer.next(count);
    //     count++;
    //   }, 1000);
    // });

    // this.firstObserverSubscription = customObservable.subscribe(data =>
    //   console.log(data)
    // );
  }

  toShoppingList() {
    this.slService.addIngredients(this.recipe.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['../']);
  }

  ngOnDestroy() {
    // this.firstObserverSubscription.unsubscribe();
  }
}
