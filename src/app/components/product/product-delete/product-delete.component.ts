import { Product } from './../product.model';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  product: Product;
  cardImageBase64: string;
  
  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const idProduct = this.route.snapshot.paramMap.get('id');
    this.productService.readById(idProduct).subscribe(product => {
      this.product = product;
    })

    this.productService.imageById(idProduct).subscribe(obj => {
      console.log('image',obj.data);
      this.cardImageBase64 = obj.data.toString();
    });
  }

  cancel(): void {
    this.router.navigate(['/products'])
  }

  deleteProduct(): void {
    this.productService.delete(this.product.id.toString()).subscribe((isDelete) => {
      if (isDelete) {
        this.productService.showMessage('Produto excluído com sucesso!');
        this.router.navigate(["/products"]);
      } else {
        this.productService.showMessage('Ocorreu um erro ao tentar Excluir, tente novamente!');
      }
    });
  }

}
