import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Recipe } from '@models/recipe.model';
import { RecipeService } from '@services/recipe.service';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode: boolean = false;
  recipe: Recipe;
  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null; // determine edit mode
      this.initForm();
    });
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      let r = this.recipeService.getRecipe(this.id);
      recipeName = r.name;
      recipeImagePath = r.imagePath;
      recipeDescription = r.description;

      // fill all ingredients if any
      if (r.ingredients) {
        for (let ingredient of r.ingredients) {
          recipeIngredients.push(
            // * create a new FormGroup because each ingredient holds multiple FormControls that belong to a single FormGroup
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/) // regex to only allow numbers > 0
              ])
            })
          );
        }
      }
    }

    // * Create the parent FormGroup holding all child FormGroups & FormControls
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredients
    });
  }

  onAddIngredient() {
    this.ingredientControls.push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/) // regex to only allow numbers > 0
        ])
      })
    );
  }

  onRemoveIngredient(index: number) {
    this.ingredientControls.removeAt(index);
  }

  onSubmit() {
    /**
     * * if the value names of our form have the exactly the same names as our Recipe model,
     * * you can directly pass the form.value instead of mapping all values individually
     */
    // const newRecipe = new Recipe(
    //   this.id
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients']
    // );

    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
  }

  get ingredientControls() {
    // a getter!
    return <FormArray>this.recipeForm.get('ingredients');
  }
}