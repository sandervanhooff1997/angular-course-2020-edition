import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  /**
     * Declare as one of the following:
        element-name: Select by element name.
        .class: Select by class name.
        [attribute]: Select by attribute name.
        [attribute=value]: Select by attribute name and value.
        :not(sub_selector): Select only if the element does not match the sub_selector.
        selector1, selector2: Select if either selector1 or selector2 matches.
     */
  selector: '[appBasicHighlight]'
})
export class BasicHighlightDirective implements OnInit {
  // inline property through constructor
  constructor(private ref: ElementRef) {}

  ngOnInit(): void {
    this.ref.nativeElement.style.backgroundColor = 'green';
  }
}
