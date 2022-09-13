import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProductsComponent} from './products.component';
import {ProductService} from "../../services/product.service";
import {of} from "rxjs";

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  let mockProductService = {
    getProducts: jest.fn()
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsComponent],
      providers: [
        {provide: ProductService, useValue: mockProductService}
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe llamar al metodo #getProducts cuando se llame al metodo #loadProducts', () => {
    // Arrange
    mockProductService.getProducts
      .mockImplementation(() => of([]))

    // Act
    component.loadProducts()

    //Assert
    expect(
      mockProductService.getProducts
    ).toBeCalled()

  })

});
