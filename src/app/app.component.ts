import {Component, OnInit, ViewChild} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MatButton} from "@angular/material/button";
import {ElementComponent} from "./shared/components/element/element.component";
import {SwapyWrapperComponent} from "./swapy-wrapper/swapy-wrapper.component";
import {DragndropService} from "./shared/services/dragndrop.service";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatButton, ElementComponent, SwapyWrapperComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'swapy-angular-fe';

  @ViewChild(SwapyWrapperComponent) swapyWrapper!: SwapyWrapperComponent;
  isEditMode = false;
  elements: {id: number, colorClass: string}[] = [];


  constructor(private dragndropService: DragndropService) {
  }

  ngOnInit() {
    this.elements = this.dragndropService.getStore();
  }

  onClickEditMode() {
    this.isEditMode = !this.isEditMode;
    console.log(`Edit mode ${this.isEditMode ? 'enabled' : 'disabled'}`);
  }

  onClickAddColumn() {
    console.log('Adding new column');
    this.handleAddColumn();
  }

  handleAddColumn = () => {
    console.log('New column added');
    this.swapyWrapper.onClickAddColumn();
    // Add any additional logic for handling new column addition
  }

  onElementAdded(event: {id: number, colorClass: string}) {
    console.log('Element added', event);

    this.dragndropService.addElementToStore(event);

    this.swapyWrapper.ngAfterViewInit();
    this.swapyWrapper.changeDetectorRef.markForCheck();

    window.location.reload();
  }

  onClickResetStore() {
    console.log('Resetting store');
    this.dragndropService.resetStore();
  }
}
