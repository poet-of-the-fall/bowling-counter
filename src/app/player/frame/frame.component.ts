import {
  Component,
  InputSignal,
  ModelSignal,
  input,
  model,
} from '@angular/core';
import { Frame } from '../../general.models';
import { ScoreComponent } from './score/score.component';

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

  inputScore() {}
}
