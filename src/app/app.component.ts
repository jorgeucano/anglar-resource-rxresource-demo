import { HttpClient } from '@angular/common/http';
import { Component, effect, inject, resource, ResourceStatus } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { LoaderSpinnerComponent } from './loading-spinner/app.loading-spinner.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoaderSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'http-new-format';

  http = inject(HttpClient);
  
  advice = '';
  adviceResource;
  adviceRxResource;
  resourceStatus = ResourceStatus;

  constructor() {
    this.http
      .get('https://api.adviceslip.com/advice')
      .subscribe(
        (value: any) => {
          console.log(value);
          this.advice = value.slip.advice
        }
      );

      // RESOURCE
    this.adviceResource = resource({
      loader: () => fetch('https://api.adviceslip.com/advice')
        .then(res => res.json())
    });

    effect(() => {
      console.log('Resource code:' , ResourceStatus[this.adviceResource.status()]);
      console.log('Resource value:', this.adviceResource.value()?.slip.advice); 
    })


    // RXRESOURCE
    this.adviceRxResource = rxResource({
      loader: () =>  this.http.get<any>('https://api.adviceslip.com/advice')
    });

    effect(() => {
      console.log('RxResource code:' , ResourceStatus[this.adviceRxResource.status()]);
      console.log('RxResource value:', this.adviceRxResource.value()?.slip.advice); 
    })

    
  }


}
