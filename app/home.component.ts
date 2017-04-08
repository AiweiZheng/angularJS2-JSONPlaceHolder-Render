import { Component } from '@angular/core';

@Component({
    templateUrl: 'app/home.component.html',
    styles: [`
              .content{
                       padding-top: 20%;
                       text-align: center;
                       text-shadow: 0px 4px 3px rgba(0,0,0,0.4),
	 			                    0px 8px 13px rgba(0,0,0,0.1),
	 			                    0px 18px 23px rgba(0,0,0,0.1)
              }
              .heavy{
	                    font-weight: 700;
	                    font-size: 5em;
                    }
              `
    ]
})

export class HomeComponent { }