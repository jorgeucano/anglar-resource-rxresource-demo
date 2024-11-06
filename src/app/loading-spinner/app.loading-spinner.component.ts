import { Component } from '@angular/core';

@Component({
  selector: 'app-loader-spinner',
  template: `
    <div class="loader-overlay">
      <div class="loader-spinner"></div>
    </div>
  `,
  styles: [`
    .loader-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;   

      z-index: 1000;
    }

    .loader-spinner {
      border: 4px solid #f3f3f3;
      border-radius: 50%;
      border-top: 4px solid #3498db;
      width: 40px;
      height: 40px;
      animation: spin 2s linear infinite;   

    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `]
})
export class LoaderSpinnerComponent {}