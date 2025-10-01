import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Consultant } from '../../models/consultant.model';

@Component({
  selector: 'app-consultant-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './consultant-card.component.html',
  styleUrls: ['./consultant-card.component.css']
})
export class ConsultantCardComponent {
  @Input() consultant!: Consultant;
  @Input() isAdmin = false;
  @Output() deleteConsultant = new EventEmitter<number>();

  onDelete(): void {
    if (confirm(`Tem certeza que deseja excluir o consultor ${this.consultant.name}?`)) {
      this.deleteConsultant.emit(this.consultant.id);
    }
  }
}
