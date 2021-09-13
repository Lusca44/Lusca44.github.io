import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-delete',
  templateUrl: './cliente-delete.component.html',
  styleUrls: ['./cliente-delete.component.css']
})
export class ClienteDeleteComponent implements OnInit {
  idCli = '';

  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    telefone: ''
  }

  constructor(private router : Router,
    private service : ClienteService,
    private route : ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.idCli = this.route.snapshot.paramMap.get('id')!;
    this.findById();
  }

  findById():void {
    this.service.findById(this.idCli).subscribe(resposta => {
      this.cliente = resposta;
    })
  }

  delete():void {
    this.service.delete(this.idCli).subscribe(resposta => {
      this.router.navigate(['clientes']);
      this.service.message('Cliente deletado com sucesso!');
    }, err => {
      if(err.error.error.match('enquanto estiver ligado a ordens de serviço')){
        this.service.message(err.error.error);
      }
    })
  }

  cancel():void {
    this.router.navigate(['clientes']);
  } 
}