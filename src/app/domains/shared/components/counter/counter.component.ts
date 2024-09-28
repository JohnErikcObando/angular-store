import { Component, Input, signal, SimpleChanges } from '@angular/core';

import { ProductComponent } from '../../../products/components/product/product.component';
import { AboutComponent } from '../../../info/pages/about/about.component';
import { sign } from 'crypto';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [ProductComponent, AboutComponent],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css',
})
export class CounterComponent {
  @Input({ required: true }) duration = 0;
  @Input({ required: true }) message = '';
  counter = signal(0);
  counterRef: number | undefined;

  constructor() {
    // NO ASYNC
    // ANTES DEL RENDER
    // SOLO CORRE UNA VEZ
    console.log('constructor');
    console.log('-'.repeat(15));
  }

  ngOnChanges(changes: SimpleChanges): void {
    // antes y durante el render
    console.log('ngOnChanges');
    console.log('-'.repeat(15));
    console.log(changes);
    const duration = changes['duration'];
    if (duration && duration.currentValue !== duration.previousValue) {
      this.doSomething();
    }
  }

  ngOnInit(): void {
    // ANTES DEL RENDER
    // UNA VEZ
    // ASYNC, THEN, SUBS
    console.log('ngOnInit');
    console.log('-'.repeat(15));
    console.log('duration=>', this.duration);
    console.log('message=>', this.message);
    this.counterRef = window.setInterval(() => {
      console.log('run interval');
      this.counter.update((statePrev) => statePrev + 1);
    }, 1000);
  }

  ngAfterViewInit(): void {
    // DESPUES DEL ngOnInit
    // LOS HIJOS YA FUERON RENDERIZADOS
    console.log('ngAfterViewInit');
    console.log('-'.repeat(15));
  }

  ngOnDestroy(): void {
    // CUANDO EL COMPONENTE SE DESTRUYE
    console.log('ngOnDestroy');
    console.log('-'.repeat(15));
    window.clearInterval(this.counterRef);
  }

  doSomething() {
    console.log('changeDuration');
  }
}
