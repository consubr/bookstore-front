import { LivroService } from './../livro.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from '../livro.model';

@Component({
  selector: 'app-livro-delete',
  templateUrl: './livro-delete.component.html',
  styleUrls: ['./livro-delete.component.css']
})
export class LivroDeleteComponent implements OnInit {

  private id_cat: String = '';

  livro: Livro = {
    titulo: '',
    nome_autor: '',
    texto: ''
  }


  constructor(
    private service: LivroService,
    private route: ActivatedRoute,
    private router: Router) {}

    ngOnInit(): void {
      this.livro.id = this.route.snapshot.paramMap.get('id')!;
      this.id_cat = this.route.snapshot.paramMap.get('id_cat')!;
      this.findById()
    }
  
    findById(): void {
      this.service.findById(this.livro.id!).subscribe((resposta) => {
        this.livro = resposta
      })
    }
  delete(): void {
    this.service.delete(this.livro.id!).subscribe((resposta) => {
    this.navTelaAnterior();
      this.service.mensagem('Livro deletado com sucesso!')
    }, err => {
      this.navTelaAnterior();
      this.service.mensagem('Falha ao deletar Livro! tente mais tarde');
    })
  }


  cancel(): void {
    this.router.navigate([`categorias/${this.id_cat}/livros`])
  }

  navTelaAnterior(): void {
    this.cancel();
  }


}
