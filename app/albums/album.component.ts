import { Component } from '@angular/core';

@Component({
    selector: 'album-holder',
    template: `
      <div class="panel-group">
        <div class="panel panel-default">
            <div class="panel-heading">
                <h4 class="panel-title">
                    <a data-toggle="collapse" href="#collapse1">Collapsible panel</a>
                </h4>
            </div>
            <div id="collapse1" class="panel-collapse collapse">
                <div class="panel-body">Panel Body</div>
            </div>
        </div>
      </div>
    `
})

export class AlbumComponent {
    

}