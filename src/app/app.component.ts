import { HttpClient } from '@angular/common/http';
import { Component, effect, inject, resource, ResourceRef, ResourceStatus, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { LoaderSpinnerComponent } from './loading-spinner/app.loading-spinner.component';
import { Card, Cards } from './interfaces/mtg-interface';

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

  mtgCards: Card[] = [];
  mtgCard: Card | undefined;


  mtgCardsSignals: ResourceRef<any>;
  mtgCardSignals: any;

  mtgSelectedId = signal<number | undefined> (undefined);

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
    });

    // multiples

    this.http.get<Cards>('https://api.magicthegathering.io/v1/cards')
    .subscribe(
      (value) => {
        console.log(value.cards);
        const mixedArray = [...value.cards].sort(() => 0.5 - Math.random());
        this.mtgCards = mixedArray.slice(0, 10);
      }
    );


    // mtg

    // RXRESOURCE
    this.mtgCardsSignals = rxResource({
      loader: () =>  this.http.get<any>('https://api.magicthegathering.io/v1/cards')
    });

    effect(() => {
      console.log('RxResource code:' , ResourceStatus[this.mtgCardsSignals.status()]);
      console.log('RxResource value:', this.mtgCardsSignals.value()?.cards); 
    });


    this.mtgCardSignals = rxResource({
      request: () =>  this.mtgSelectedId(),
      loader: ({ request: multiverseid}) => this.http.get(`https://api.magicthegathering.io/v1/cards/${multiverseid}`)
    });

    effect(() => {
      console.log('mtgCardSignals RxResource code:' , ResourceStatus[this.mtgCardSignals.status()]);
      console.log('mtgCardSignals RxResource value:', this.mtgCardSignals.value()); 
    });
    
  }

  getCard(id: number) {
    console.log(id);
    this.mtgSelectedId.set(id);
    // this.http.get(`https://api.magicthegathering.io/v1/cards/${id}`)
    // .subscribe(
    //   (value: any) => {
    //     console.log(value);
    //     this.mtgCard = value.card;
    //     console.log(this.mtgCard);
    //   }
    // );
  }


}
