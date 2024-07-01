import { Component } from '@angular/core';
import { Frame, Player } from './general.models';
import { PlayerComponent } from './player/player.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PlayerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  players: Array<Player> = [
    {
      name: 'Danilo',
      frames: new Array<Frame>(10),
    },
    // {
    //   name: 'Danilo',
    //   frames: [
    //     {
    //       firstRoll: 1,
    //       secondRoll: 'spare',
    //       currentScore: 20,
    //     },
    //     {
    //       firstRoll: 'strike',
    //       currentScore: 36,
    //     },
    //     {
    //       firstRoll: 2,
    //       secondRoll: 4,
    //       currentScore: 42,
    //     },
    //     {
    //       firstRoll: 'strike',
    //       currentScore: 60,
    //     },
    //     {
    //       firstRoll: 8,
    //       secondRoll: 0,
    //       currentScore: 68,
    //     },
    //     {
    //       firstRoll: 0,
    //       secondRoll: 8,
    //       currentScore: 76,
    //     },
    //     {
    //       firstRoll: 4,
    //       secondRoll: 'spare',
    //       currentScore: 96,
    //     },
    //     {
    //       firstRoll: 'strike',
    //       currentScore: 115,
    //     },
    //     {
    //       firstRoll: 5,
    //       secondRoll: 4,
    //       currentScore: 124,
    //     },
    //     {
    //       firstRoll: 5,
    //       secondRoll: 'spare',
    //       thirdRoll: 8,
    //       currentScore: 142,
    //     },
    //   ],
    // },
  ];
}
