import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ElementRef, EventEmitter, Injector,
  Input,
  OnInit, Output, output,
  ViewChild
} from '@angular/core';
import { createSwapy } from "swapy";
import { ElementComponent } from "../shared/components/element/element.component";

@Component({
  selector: 'app-swapy-wrapper',
  standalone: true,
  imports: [ElementComponent],
  templateUrl: './swapy-wrapper.component.html',
  styleUrl: './swapy-wrapper.component.css'
})
export class SwapyWrapperComponent implements OnInit, AfterViewInit  {
  @ViewChild('container', { static: false }) containerRef!: ElementRef;

  @Input() set onExternalEditModeChange(value: boolean) {
    this.onClickEditMode(value);
  }

  @Input() set setElements(value: {id: number, colorClass: string}[]) {
    this.elements = value;
    this.cdr.detectChanges();
  }

  @Output() onElementAdded = new EventEmitter<{id: number, colorClass: string}>();

  changeDetectorRef: ChangeDetectorRef;
  prefId = 9;
  swapy: any | null = null;
  isEditMode = false;
  elements: {id: number, colorClass: string}[] = [];

  colorClasses = ['bg-red-500', 'bg-green-500', 'bg-blue-500', 'bg-yellow-500', 'bg-purple-500'];

  constructor(private cdr: ChangeDetectorRef, private componentFactoryResolver: ComponentFactoryResolver,
              private injector: Injector) {
    this.changeDetectorRef = cdr;
  }

  ngOnInit(): void {
    console.log('SwapyWrapperComponent initialized');
    // setTimeout(() => this.initializeSwapy(), 0);
  }

  ngAfterViewInit(): void {
    console.log('View initialized, attempting to initialize Swapy');
    this.initializeSwapy();
  }

  initializeSwapy(): void {
    if (this.containerRef && this.containerRef.nativeElement) {
      console.log(this.containerRef.nativeElement);

      try {
        this.swapy = createSwapy(this.containerRef.nativeElement, {
          animation: 'dynamic',
        });

        this.swapy.enable(this.isEditMode);

        this.swapy.onSwap((event: any) => {
          console.log(event.data.object);
          console.log(event.data.array);
          console.log(event.data.map);
        });

        console.log('Swapy initialized successfully');
      } catch (error) {
        console.error('Error initializing Swapy:', error);
      }
    } else {
      console.error('Container not found');
    }
  }

  onClickEditMode(state: boolean): void {
    this.isEditMode = state;
    if (this.swapy) {
      this.swapy.enable(this.isEditMode);
      console.log(`Edit mode ${this.isEditMode ? 'enabled' : 'disabled'}`);
    } else {
      console.error('Swapy is not initialized');
      this.initializeSwapy();
    }
  }

  onClickAddColumn(): void {
    const id = this.prefId++;
    const colorClass = this.colorClasses[Math.floor(Math.random() * this.colorClasses.length)];

    const newElement = {id: id, colorClass: colorClass};

    // Create the component
    const factory = this.componentFactoryResolver.resolveComponentFactory(ElementComponent);
    const componentRef = factory.create(this.injector);

    this.initializeSwapy();

    this.onElementAdded.emit(newElement);
  }
}
