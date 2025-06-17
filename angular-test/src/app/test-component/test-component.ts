import { Component } from '@angular/core';

@Component({
  selector: 'app-test-component',
  imports: [],
  template: `
    <div class="counter">
      <h1>Counter: {{ count }}</h1>
      <button class="big-shiny-button" (click)="handleCount('increment')">Increment</button>
      <button class="big-shiny-button" (click)="handleCount('decrement')">Decrement</button>
      <button class="big-shiny-button" (click)="handleCount('reset')">Reset</button>
       @if (count > 10) {
        <div class="alert-message">Team 1, Best team ever!</div>
      }
    </div>`,
  styleUrl: './test-component.css'
})
export class TestComponent {
  count = 0;

  handleCount(operation: 'increment' | 'decrement' | 'reset') {
    switch (operation) {
      case 'increment':
        this.count++;
        break;
      case 'decrement':
        this.count--;
        break;
      case 'reset':
        this.count = 0;
        break;
    }
  }
}
