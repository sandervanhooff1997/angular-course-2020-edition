import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule } from '@modules/shared/shared.module';

import { ShoppingEditComponent } from '@components/shopping-list/shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from '@components/shopping-list/shopping-list.component';

import routes from './shopping-list.routes';

@NgModule({
  declarations: [ShoppingListComponent, ShoppingEditComponent],
  imports: [SharedModule, RouterModule.forChild(routes)]
})
export class ShoppingListModule {}
