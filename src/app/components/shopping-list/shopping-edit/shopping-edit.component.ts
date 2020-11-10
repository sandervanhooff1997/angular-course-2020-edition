import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  EventEmitter,
  Output
} from '@angular/core';
import { Ingredient } from '@models/ingredient.model';
import { ShoppingListService } from '@services/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('amountInput') amountInputRef: ElementRef;
  @Output() ingredientAdded = new EventEmitter<Ingredient>();

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {}

  onAdd() {
    const name = this.nameInputRef.nativeElement.value;
    const amount = this.amountInputRef.nativeElement.value;
    const i = new Ingredient(name, amount);

    this.shoppingListService.addIngredient(i);
  }
}
