import { FormControl } from '@angular/forms';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

/** Password input component. */
@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['../auth.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordInputComponent {

  /** Password label. */
  @Input()
  public label = '';

  /** Password input. */
  @Input()
  public control: FormControl = new FormControl<string | null>('');

  /** Is the password hidden. */
  public isPasswordHidden = true;

  /** Handles password toggle. */
  public handlePasswordToggle(): void {
    this.isPasswordHidden = !this.isPasswordHidden;
  }
}
