import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TextInputComponent,
      multi: true
    }
  ]
})
export class TextInputComponent implements ControlValueAccessor {

  @Input() disabled: boolean = false;
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() invalid: boolean = false;
  @Input() type: 'text' | 'email' = 'text';

  value: string = '';

  private onChange!: Function;
  onTouched = () => { }

  onInput(ev: Event): void {
    const value = (ev.target as HTMLInputElement).value;
    this.value = value;
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

}
