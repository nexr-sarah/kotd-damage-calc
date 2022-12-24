import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IPlayer } from 'src/app/interfaces/player';
import { Element } from 'src/app/interfaces/element';
import { IWeapon } from 'src/app/interfaces/item';
import { Weapons } from 'src/app/items';
import { Type } from 'src/app/interfaces/type';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  @Input() player: IPlayer;
  @Output() weaponSelected = new EventEmitter();
  weapons: IWeapon[] = [];
  selectedWeapon: IWeapon;

  constructor() { }

  ngOnInit(): void {
    Weapons.map((x) => {
      switch (x.type) {
        case Type.Melee:
          x.typeIcon = "⚔️";
          break;
        case Type.Ranged:
          x.typeIcon = "🏹";
          break;
        case Type.Magic:
          x.typeIcon = "🔮";
          break;
        default:
          x.typeIcon = "-";
          break;
      }
    });
    this.weapons = Weapons;
  }


  onWeaponSelected() {
    this.weaponSelected.emit();
  }
}


