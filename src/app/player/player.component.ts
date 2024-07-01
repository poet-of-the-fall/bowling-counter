import { Component, ModelSignal, model } from '@angular/core';
import { Frame, Player } from '../general.models';
import { FrameComponent } from './frame/frame.component';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [FrameComponent, MatCardModule],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss',
})
export class PlayerComponent {
  player: ModelSignal<Player> = model.required();

  recalculateScore(frame: Frame, index: number) {}
}
