import {
  Directive,
  HostListener,
  HostBinding,
  ElementRef
} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen: boolean = false;

  constructor(private elRef: ElementRef) {}

  // only open/close by clicking on dropdown button
  // @HostListener('click') toggleOpen() {
  //   this.isOpen = !this.isOpen;
  // }

  // close by clicking anywhere
  @HostListener('document:click', ['$event']) toggleOpenFromEverywhere(
    event: Event
  ) {
    this.isOpen = this.elRef.nativeElement.contains(event.target)
      ? !this.isOpen
      : false;
  }
}
