import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
    selector: 'pagination',
    template: `
        <nav aria-label="..." *ngIf="pages.length>1">
        <ul class="pagination">
            <li [class.disabled] ="currentPage==1" (click)="gotoPreviousPage()">
                <a aria-label="Previous"><span aria-hidden="true">&laquo;</span></a>
            </li>

            <li [class.active]="pageId == currentPage" *ngFor="let pageId of pages" (click)="pageChange(pageId)">
                <a >{{pageId}} <span class="sr-only">(current)</span>
                </a>
            </li>

            <li [class.disabled]="currentPage==totalPages" (click)="gotoNextPage()">
                <a aria-label="Next"><span aria-hidden="true">&raquo;</span></a>
            </li>
        </ul>
        </nav>
`
})

export class PaginationComponent implements OnChanges {
    @Input() items = [];
    @Input("page-size") pageSize;
    @Output("page-changed") onPageChanged = new EventEmitter();
    currentPage = 1;
    totalPages;
    pages = [];

    pageChange(pageIndex) {
        this.currentPage = pageIndex;
        this.onPageChanged.emit(pageIndex);
    }
    ngOnChanges() {
        this.currentPage = 1;
        this.pages = [];
        this.totalPages = this.items.length / this.pageSize;
        for (var i = 1; i <= this.totalPages; i++) {
            this.pages.push(i);
        }
        console.log("on change:"+ this.items.length);
    }
    gotoPreviousPage() {
        if (this.currentPage > 1) this.pageChange(--this.currentPage);
    }
    gotoNextPage() {
        if (this.currentPage < this.totalPages) this.pageChange(++this.currentPage);
    }
}