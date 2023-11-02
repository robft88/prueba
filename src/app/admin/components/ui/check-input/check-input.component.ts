import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-check-input',
  templateUrl: './check-input.component.html',
  styleUrls: ['./check-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CheckInputComponent,
      multi: true
    }
  ]
})
export class CheckInputComponent implements ControlValueAccessor {

  @Input() disabled: boolean = false;
  @Input() label: string = '';
  @Input() invalid: boolean = false;

  isChecked?: boolean;

  private onChange!: Function;
  onTouched = () => { }

  onToggle(ev: Event): void {
    console.log(ev);
    const checked = (ev.target as HTMLInputElement).checked;
    console.log(checked);
    this.isChecked = checked;
    this.onTouched();
    this.onChange(this.isChecked);
  }

  writeValue(checked: boolean): void {
    console.log('write ', checked);
    this.isChecked = checked;
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
