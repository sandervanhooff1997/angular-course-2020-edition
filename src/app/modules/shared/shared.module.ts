import { ErrorPageComponent } from '@components/error/error-page.component';
import { AlertComponent } from '@components/alert/alert.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShortenPipe } from '@pipes/shorten.pipe';
import { FilterPipe } from '@pipes/filter.pipe';
import { DropdownDirective } from '@directives/dropdown.directive';
import { BasicHighlightDirective } from '@directives/basic-highlight.directive';
import { BetterHighlightDirective } from '@directives/better-highlight.directive';
import { UnlessDirective } from '@directives/unless.directive';
import { LoaderComponent } from '@components/loader/loader.component';

import routes from './shared.routes';
import { RouterModule } from '@angular/router';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { GridModule } from '@progress/kendo-angular-grid';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ShortenPipe,
    FilterPipe,
    DropdownDirective,
    ErrorPageComponent,
    BasicHighlightDirective,
    BetterHighlightDirective,
    UnlessDirective,
    LoaderComponent,
    AlertComponent
  ],
  imports: [
    CommonModule, // ! only use BrowserMolule once (in app module) in all child modules use CommonModule
    RouterModule.forChild(routes),
    ButtonsModule,
    NotificationModule,
    GridModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ShortenPipe,
    FilterPipe,
    DropdownDirective,
    ErrorPageComponent,
    BasicHighlightDirective,
    BetterHighlightDirective,
    UnlessDirective,
    LoaderComponent,
    AlertComponent,
    CommonModule,
    ButtonsModule,
    NotificationModule,
    GridModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule {}
