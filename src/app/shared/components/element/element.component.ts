import {Component, Input, OnInit} from '@angular/core';
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-element',
  standalone: true,
  imports: [NgClass],
  template: `
    <div class="w-full h-full p-2 rounded-lg" [ngClass]="colorClass" [attr.data-swapy-item]="'content' + id">
      content {{ id }}
    </div>
  `,
  styles: []
})
export class ElementComponent implements OnInit{
  @Input() id!: number;
  @Input() colorClass: string = 'bg-red-500';

  ngOnInit(): void {
    console.log(`ElementComponent initialized with id: ${this.id}`);
  }
}
