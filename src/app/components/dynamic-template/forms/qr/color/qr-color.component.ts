import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-qr-color',
  // standalone: true,
  // imports: [],
  templateUrl: './qr-color.component.html',
  styleUrl: './qr-color.component.scss'
})
export class QrColorComponent {

  @Input() formGroup: FormGroup;
  @Input() formGroupNameDt: string;
  @Input() defGradiant:string='#000000';

  gradiantTypes = ['linear', 'radial'];

  @Output() selectedColorType: EventEmitter<string> = new EventEmitter();

  public selectedIndex: number;
  public colorType: string | null = null;
  public gradiantType: string | null = null;

  constructor(private formBuilder: FormBuilder) { }

  setSelectedVal(type: string) {
    this.colorType = type;
    this.selectedColorType.emit(type);
    if (type === 'color') {
      this.formGroup.get(this.formGroupNameDt + ".gradient.colorStops").setValue([{
        offset: 0,
        color: this.defGradiant,
      }, {
        offset: 1,
        color: this.defGradiant,
      }, {
        offset: 2,
        color: this.defGradiant,
      }]);
    } else {
      this.formGroup.get(this.formGroupNameDt + ".color").setValue('');
    }
  }


  setSelectedGradiantType(value: string, index: number) {
    this.selectedIndex = index!;
    this.gradiantType = value;
    this.formGroup.get(this.formGroupNameDt + ".gradient.type").setValue(value);
  }

  get cmn() {
    return ((this.formGroup.get(this.formGroupNameDt + ".gradient") as FormGroup).get('colorStops') as FormArray).controls;
  }

}
