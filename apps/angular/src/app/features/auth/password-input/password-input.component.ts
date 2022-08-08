import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

/** Password input component. */
@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['../auth.component.css'],
})
export class PasswordInputComponent {

  /** Password label. */
  @Input()
  public label = '';

  /** Password input. */
  @Input()
  public control: FormControl = new FormControl<string | null>('');

  /** Is password displayed. */
  public isHiddenPassword = true;

  public constructor() { }

  /** Handles password toggle. */
  public handlePasswordToggle(): void {
    this.isHiddenPassword = !this.isHiddenPassword;
  }
}
