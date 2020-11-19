import {
  Component,
  OnInit,
  ViewChild,
  EventEmitter,
  Output
} from '@angular/core';
import { Ingredient } from '@models/ingredient.model';
import { ShoppingListService } from '@services/shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  // * You can get the value of the native element by assigning a #name to the html element and then passing it to the viewchild
  // @ViewChild('nameInput') nameInputRef: ElementRef;
  // @ViewChild('amountInput') amountInputRef: ElementRef;
  @ViewChild('f') slForm: NgForm;
  @Output() ingredientAdded = new EventEmitter<Ingredient>();
  ingredient: Ingredient;
  editMode: boolean;
  id: string;

  constructor(
    private slService: ShoppingListService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.editMode = params['id'] != null;

      setTimeout(() => {
        if (this.editMode) {
          this.ingredient = this.slService.getIngredient(this.id);
          this.slForm.setValue({
            name: this.ingredient.name,
            amount: this.ingredient.amount
          });
        }
      });
    });
  }

  // * template driven form approach
  onSubmit(form: NgForm) {
    const value = form.value;
    // const name = this.nameInputRef.nativeElement.value;
    // const amount = this.amountInputRef.nativeElement.value;
    const newIngredient = new Ingredient(value.name, value.amount);

    if (this.editMode) {
      this.slService.updateIngredient(this.id, newIngredient);
    } else {
      this.slService.addIngredient(newIngredient);
    }

    this.onClearForm();
  }

  onDeleteItem() {
    this.slService.deleteIngredient(this.id);
    this.onClearForm();
  }

  onClearForm() {
    this.slForm.reset();
    this.editMode = false;
  }
}
