import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-delete',
  templateUrl: './tecnico-delete.component.html',
  styleUrls: ['./tecnico-delete.component.css']
})
export class TecnicoDeleteComponent implements OnInit {
  idTec = '';

  tecnico: Tecnico = {
    id: '',
    nome: '',
    cpf: '',
    telefone: ''
  }

  constructor(private router : Router,
    private service : TecnicoService,
    private route : ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.idTec = this.route.snapshot.paramMap.get('id')!;
    this.findById();
  }

  findById():void {
    this.service.findById(this.idTec).subscribe(resposta => {
      this.tecnico = resposta;
    })
  }

  delete():void {
    this.service.delete(this.idTec).subscribe(resposta => {
      this.router.navigate(['tecnicos']);
      this.service.message('Técnico deletado com sucesso!');
    }, err => {
      if(err.error.error.match('enquanto estiver ligado a ordens de serviço')){
        this.service.message(err.error.error);
      }
    })
  }

  cancel():void {
    this.router.navigate(['tecnicos']);
  } 
}