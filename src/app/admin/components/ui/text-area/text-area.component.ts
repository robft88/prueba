import { Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TextAreaComponent,
      multi: true
    }
  ]
})
export class TextAreaComponent implements ControlValueAccessor {

  @ViewChild('input') input?: ElementRef;

  @Input() disabled: boolean = false;
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() invalid: boolean = false;
  @Input() type: 'text' | 'email' = 'text';

  value: string = '';

  private maxHeight = 125;
  private onChange!: Function;
  onTouched = () => { }

  constructor(
    private renderer2: Renderer2,
  ) { }

  onInput(ev: Event): void {
    const value = (ev.target as HTMLInputElement).value;
    this.value = value;
    this.autogrow();
    this.onTouched();
    this.onChange(this.value);
  }

  writeValue(value: string): void {
    this.value = value || '';
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  private autogrow(): void {
    if (!this.input) return;

    if (this.input.nativeElement.scrollHeight < this.maxHeight) {
      this.renderer2.setStyle(this.input.nativeElement, 'height', 'auto');
      this.renderer2.setStyle(
        this.input.nativeElement,
        'height',
        this.input.nativeElement.scrollHeight + 'px'
      );
    }
  }

}
