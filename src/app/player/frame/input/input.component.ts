import { Component, Inject, WritableSignal, signal } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { Frame } from '../../../general.models';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

export interface DialogData {
  frame: Frame;
  index: number;
}

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormField,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {
  firstRoll = new FormControl();
  firstSelectionValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'strike'];
  secondRoll = new FormControl();
  secondSelectionValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'spare'];
  thirdRoll = new FormControl();
  thirdSelectionValues: Array<any> = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<InputComponent>
  ) {
    this.firstRoll.setValue(data.frame?.firstRoll ?? 0);
    this.secondRoll.setValue(data.frame?.secondRoll);
    this.thirdRoll.setValue(data.frame?.thirdRoll);
    this.checkSelectionValues();
  }

  checkSelectionValues() {
    // Second Selection
    const firstRoll = this.firstRoll?.value ?? this.data.frame?.firstRoll ?? 0;
    this.secondSelectionValues = [];
    if (firstRoll != 'strike' || this.data.index == 9) {
      let modifiedFirstRoll = firstRoll;
      if (modifiedFirstRoll == 'strike') {
        modifiedFirstRoll = 0;
      }
      for (let i = 0; i < 10 - modifiedFirstRoll; i++) {
        this.secondSelectionValues.push(i);
      }
    }
    if (this.data.index == 9) {
      if (firstRoll == 'strike') {
        this.secondSelectionValues.push('strike');
      }
    }
    if (firstRoll != 'strike') {
      this.secondSelectionValues.push('spare');
    }

    // Third Selection
    const secondRoll =
      this.secondRoll?.value ?? this.data.frame?.secondRoll ?? 0;
    this.thirdSelectionValues = [];
    if (this.data.index == 9) {
      let modifiedSecondRoll = secondRoll;
      if (modifiedSecondRoll == 'strike' || secondRoll == 'spare') {
        modifiedSecondRoll = 0;
      }
      for (let i = 0; i < 10 - modifiedSecondRoll; i++) {
        this.thirdSelectionValues.push(i);
      }
      if (secondRoll != 'strike' && secondRoll != 'spare') {
        this.thirdSelectionValues.push('spare');
      }
      if (secondRoll == 'strike' || secondRoll == 'spare') {
        this.thirdSelectionValues.push('strike');
      }
    }
  }

  saveScore() {
    let result: Frame = { firstRoll: this.firstRoll.value };
    if (result.firstRoll != 'strike') {
      result.secondRoll = this.secondRoll.value;
    }
    if (
      this.data.index == 9 &&
      (result.secondRoll == 'spare' || result.secondRoll == 'strike')
    ) {
      result.thirdRoll = this.thirdRoll.value;
    }
    this.dialogRef.close(result);
  }
}
