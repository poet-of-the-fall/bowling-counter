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

  recalculateScore(frame: Frame, index: number) {
    const currentState = this.player();
    currentState.frames[index] = frame;

    for (let i = 0; i < currentState.frames.length; i++) {
      if (currentState.frames[i] == undefined) return;
      let score = i > 0 ? currentState.frames[i - 1]?.currentScore ?? 0 : 0;
      const firstRoll = currentState.frames[i]?.firstRoll ?? 0;
      const secondRoll = currentState.frames[i]?.secondRoll ?? 0;
      const thirdRoll = currentState.frames[i]?.thirdRoll ?? 0;

      if (firstRoll == 'strike') {
        score = score + 10;
        if (i < 9) {
          const nextFrame = currentState.frames[i + 1];
          if (nextFrame && nextFrame.firstRoll != 'strike') {
            if (
              nextFrame.secondRoll != 'spare' &&
              nextFrame.secondRoll != 'strike'
            ) {
              score =
                score +
                (nextFrame.firstRoll ?? 0) +
                (nextFrame.secondRoll ?? 0);
            } else {
              score = score + 10;
            }
          }
        } else {
          score =
            score +
            (secondRoll == 'spare' || secondRoll == 'strike'
              ? 20
              : secondRoll ?? 0);
          score =
            score +
            (thirdRoll == 'spare' || thirdRoll == 'strike'
              ? 20
              : thirdRoll ?? 0);
        }
      } else if (secondRoll == 'spare') {
        score = score + 10;
        if (i < 9) {
          const nextFrameFirst = currentState.frames[i + 1]?.firstRoll ?? 0;
          score =
            score +
            (nextFrameFirst && nextFrameFirst == 'strike'
              ? 10
              : nextFrameFirst ?? 0);
        } else {
          score =
            score +
            (thirdRoll && (thirdRoll == 'spare' || thirdRoll == 'strike')
              ? 10
              : thirdRoll ?? 0);
        }
      } else {
        score =
          score +
          (firstRoll ?? 0) +
          (secondRoll && secondRoll == 'strike' ? 10 : secondRoll ?? 0) +
          (thirdRoll && (thirdRoll == 'spare' || thirdRoll == 'strike')
            ? 10
            : thirdRoll ?? 0);
      }
      currentState.frames[i].currentScore = score;
    }

    this.player.set({ ...currentState });
  }
}
