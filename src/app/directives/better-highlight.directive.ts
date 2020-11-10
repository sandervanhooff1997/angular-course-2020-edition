import {
  Directive,
  Renderer2,
  OnInit,
  ElementRef,
  HostListener,
  HostBinding,
  Input
} from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {
  // through @Input we can dynamically assign values to our properties.
  // this way we can influence directive behaviour from outside the directive
  @Input() defaultColor: string = 'transparent';
  @Input() highLightColor: string = 'blue';

  // approach 3
  // @HostBinding('style.backgroundColor') backgroundColor: string = this.defaultColor;
  // if the property is set through input you must define the default value in the ngOnInit() method AFTER the DOM is rendered
  @HostBinding('style.backgroundColor') backgroundColor: string;

  // the renderer is a better way to manipulate the DOM through directives
  constructor(private ref: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    // approach 1
    // this.renderer.setStyle(this.ref.nativeElement, 'background-color', 'blue');

    // define default backgroundcolor AFTER the DOM is rendered
    this.backgroundColor = this.defaultColor;
  }

  // listen to host events on the reference element
  @HostListener('mouseenter') mouseover(e: Event) {
    // approach 2
    // this.renderer.setStyle(this.ref.nativeElement, 'background-color', 'blue');

    // approach 3
    this.backgroundColor = this.highLightColor;
  }

  @HostListener('mouseleave') mouseleave(e: Event) {
    // approach 2
    // this.renderer.setStyle(
    //   this.ref.nativeElement,
    //   'background-color',
    //   'transparent'
    // );

    // approach 3
    this.backgroundColor = this.defaultColor;
  }
}
