import { Component, InputSignal, input } from '@angular/core';
import { RollScore } from '../../../general.models';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-score',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './score.component.html',
  styleUrl: './score.component.scss',
})
export class ScoreComponent {
  score: InputSignal<RollScore | 'strike' | 'spare' | undefined> =
    input.required();
}
