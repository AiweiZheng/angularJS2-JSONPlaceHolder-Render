import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
    var component : PaginationComponent;
    beforeEach(() => {
        component = new PaginationComponent();
    })

    describe('pageChange:', () => {
        it('should set the currentPage to input', () => {
            let pageIndex = 1;

            component.pageChange(pageIndex);

            expect( component.currentPage ).toBe( pageIndex );
        });
        
        it('shoud raise an event', () => {
            let pageIndex = 1;
            let eventData = null;
            component.onPageChanged.subscribe( v => eventData = v);

            component.pageChange(pageIndex);
            
            expect( eventData ).toBe( pageIndex );

        })
    });

    describe('ngOnChanges:', () => {
        it('should set currentPage to 1 ', () => {
            
            component.ngOnChanges();

            expect( component.currentPage ).toBe(1);
        });

        it('should set totalPages to (this.items.length / this.pageSize)', () => {
            component.items = [1, 2, 3, 4, 5, 6, 7];
            component.pageSize = 3;

            component.ngOnChanges();

            expect( component.totalPages ).toBe(2);
        });

        it('should set pages to integer from 1 to (this.items.length / this.pageSize) ', () => {
            component.items = [1, 2, 3, 4, 5, 6, 7];
            component.pageSize = 3;

            component.ngOnChanges();

            expect( component.pages ).toEqual([1, 2]);
        });
    });
    
    describe('gotoPreviousPage', () => {
        it('should NOT decrement currentPage when currentPage not greater than 1', () => {
            component.currentPage = 1; 

            component.gotoPreviousPage();

            expect( component.currentPage ).toBe( component.currentPage );
        }); 

       it('should NOT call pageChange when currentPage not greater than 1', () => {
            component.currentPage = 1; 

            component.gotoPreviousPage();

            expect( component.pageChange ).not.toHaveBeenCalled;
        }); 

       it('should decrement currrentPage when currentPage larger than 1', () => {
            component.currentPage = 2; 

            component.gotoPreviousPage();

            expect( component.currentPage ).toBe(1);
        }); 

       it('should call pageChange when currentPage larger than 1', () => {
            component.currentPage = 2; 
            
            component.gotoPreviousPage();

            expect( component.pageChange ).toHaveBeenCalled;
         });

       it('should call gotoNextPage', () => {
            component.gotoNextPage();

            expect( component.pageChange ).toHaveBeenCalled;
       });
   });
    describe('gotoNextPage', () => {
          
            it('should NOT increment currentPage when currentPage not less than totalPages', () => {
                component.totalPages = 10;
                component.currentPage = this.totalPages; 

                component.gotoNextPage();

                expect( component.currentPage ).toBe( component.currentPage );  
            }); 

            it('should NOT call pageChange when currentPage not less than totalPages', () => {
                    component.totalPages = 10;
                    component.currentPage = this.totalPages; 

                    component.gotoNextPage();

                    expect( component.pageChange ).not.toHaveBeenCalled;
            }); 

            it('should increment currrentPage when currentPage less than totalPages', () => {
                    component.totalPages = 10;
                    component.currentPage = 8; 

                    component.gotoNextPage();

                    expect( component.currentPage ).toBe(9);
            }); 

            it('should call pageChange when currentPage less than totalPages', () => {
                    component.totalPages = 10;
                    component.currentPage = 8;
                    
                    component.gotoNextPage();

                    expect( component.pageChange ).toHaveBeenCalled;
            });
   });
});

 
      