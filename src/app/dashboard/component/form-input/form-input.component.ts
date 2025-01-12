import {Component, Input} from '@angular/core';
import {UntypedFormGroup} from "@angular/forms";

@Component({
  selector: 'app-form-input',
  standalone: false,
  templateUrl: './form-input.component.html',
  styleUrl: './form-input.component.scss'
})
export class FormInputComponent {
  @Input() col: any;
  @Input() dropDownObject: any;
  @Input() selectObject: any;
  @Input() multiSelectObject: any;
  @Input() form!: UntypedFormGroup;
}
