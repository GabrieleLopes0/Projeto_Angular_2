import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  features = [
    {
      icon: '🔐',
      title: 'Autenticação Segura',
      description: 'Sistema de login com diferentes perfis de usuário (Admin e Usuário Comum)'
    },
    {
      icon: '👥',
      title: 'Gestão de Consultores',
      description: 'CRUD completo para gerenciar consultores com facilidade'
    },
    {
      icon: '🎨',
      title: 'Interface Moderna',
      description: 'Design responsivo e intuitivo com UX de qualidade'
    },
    {
      icon: '🔍',
      title: 'Busca e Filtros',
      description: 'Pesquise e filtre consultores por nome, email ou especialidade'
    },
    {
      icon: '⚡',
      title: 'Reactive Forms',
      description: 'Formulários reativos com validação em tempo real'
    },
    {
      icon: '🛡️',
      title: 'Controle de Acesso',
      description: 'Guards protegem rotas baseadas no perfil do usuário'
    }
  ];

  technologies = [
    { name: 'Angular', icon: '🅰️' },
    { name: 'TypeScript', icon: '📘' },
    { name: 'RxJS', icon: '🔄' },
    { name: 'Reactive Forms', icon: '📝' },
    { name: 'Angular Router', icon: '🗺️' },
    { name: 'Services & DI', icon: '💉' }
  ];
}
