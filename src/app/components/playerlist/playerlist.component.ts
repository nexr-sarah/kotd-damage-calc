import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { IPlayer } from 'src/app/interfaces/player';
import { PlayerService } from '../playerlist/player.service';
import { PickList } from 'primeng/picklist';
import { Race } from 'src/app/interfaces/race';


@Component({
  selector: 'app-playerlist',
  templateUrl: './playerlist.component.html',
  styleUrls: ['./playerlist.component.scss']
})
export class PlayerlistComponent implements OnInit, OnDestroy {
  errorMessage: string = '';
  sub!: Subscription;
  loading: boolean = true;

  selectedPlayer: IPlayer;
  filteredPlayers: IPlayer[] = [];
  players: IPlayer[] = [];
  selectedPlayers: IPlayer[] = [];
  races: Race[] = [];

  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
    this.sub = this.playerService.getPlayers().subscribe({
      next: players => {
        this.players = players;
        this.filteredPlayers = this.players;
        this.loading = false;
      },
      error: err => this.errorMessage = err
    });

    this.races = [
      Race.Demon,
      Race.Dragon,
      Race.Gnome,
      Race.Kobold,
      Race.Plant,
      Race.Undead
    ]
  }

  onRowSelect(event) {
    this.selectedPlayers.push(event.data);
    const idx = this.players.findIndex((player) => {
      return player.username === event.data.username;
    });
    if (idx !== -1) {
      this.players.splice(idx,1);
    }
  }

  onRowUnselect(event) {
    const idx = this.selectedPlayers.findIndex((player) => {
      return player.username === event.data.username;
    });
    if (idx !== -1) {
      this.selectedPlayers.splice(idx,1);
    }
    this.players.push(event.data);
  }

  ngOnDestroy(): void {
      this.sub.unsubscribe();
  }

  
}
