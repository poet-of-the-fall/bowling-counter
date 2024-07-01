import {
  Component,
  InputSignal,
  ModelSignal,
  inject,
  input,
  model,
} from '@angular/core';
import { Frame } from '../../general.models';
import { ScoreComponent } from './score/score.component';
import { InputComponent } from './input/input.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-frame',
  standalone: true,
  imports: [ScoreComponent],
  templateUrl: './frame.component.html',
  styleUrl: './frame.component.scss',
})
export class FrameComponent {
  frame: ModelSignal<Frame> = model.required();
  index: InputSignal<number> = input.required();

  dialog = inject(MatDialog);

  inputScore() {
    let dialogRef = this.dialog.open(InputComponent, {
      data: { index: this.index(), frame: this.frame() },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.frame.set(result);
      }
    });
  }
}
