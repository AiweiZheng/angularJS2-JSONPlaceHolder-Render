import { Component, OnInit,  trigger,
    state,
    style,
    transition,
    animate,
    keyframes }  from '@angular/core';

@Component({
    templateUrl: './home.component.html',
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
              canvas{
                        width: 100%;
                        height: 100%;
                        background: black;
                    }
              `
    ],
     animations:[
         trigger('flyInOut',[
             transition('void=>*',[
                 style({transform:'translateX(-100%)'}),
                 animate('1s')
             ]),
             transition('*=>void',[
                 style({transform:'translateX(100%)'}),
                 animate('1s')
             ])
         ])
     ]
})

export class HomeComponent {
    showDiv = true;
    toggleDiv(){
        this.showDiv = !this.showDiv;
    }
 }