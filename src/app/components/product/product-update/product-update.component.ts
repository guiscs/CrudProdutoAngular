import { Product } from './../product.model';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  product: Product
  cardImageBase64: string;

  constructor(private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.productService.readById(id).subscribe(product => {
      this.product = product;
    });

    this.productService.imageById(id).subscribe(obj => {
      console.log('image',obj.data);
      this.cardImageBase64 = obj.data.toString();
    });
  }

  onFileSelected(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {

        this.cardImageBase64 = reader.result as string;

      };

      this.product.imagemUpload = <File>event.target.files[0];
    }
  }

  updateProduct(): void {

    if(this.product.nome.length == 0 || this.product.valor == null )
    {
      this.productService.showMessage("Preencha todo os campos", true);
      return;
    }

    this.productService.update(this.product).subscribe(obj => {      
      if(obj.success){
        this.productService.showMessage('Produto atualizado com sucesso!');
        this.router.navigate(["/products"]);
      }else{
        console.log('error')
        obj.errors.forEach(error => {
          this.productService.showMessage(error, true);
        });
      }
      
    })
  }

  cancel(): void {
    this.router.navigate(['/products'])
  }
}
