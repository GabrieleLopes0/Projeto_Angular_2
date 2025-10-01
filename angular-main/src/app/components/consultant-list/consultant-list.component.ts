import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConsultantService } from '../../services/consultant.service';
import { AuthService } from '../../services/auth.service';
import { Consultant } from '../../models/consultant.model';
import { ConsultantCardComponent } from '../consultant-card/consultant-card.component';

@Component({
  selector: 'app-consultant-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ConsultantCardComponent],
  templateUrl: './consultant-list.component.html',
  styleUrls: ['./consultant-list.component.css']
})
export class ConsultantListComponent implements OnInit {
  consultants: Consultant[] = [];
  filteredConsultants: Consultant[] = [];
  isAdmin = false;
  searchTerm = '';
  filterStatus: 'all' | 'active' | 'inactive' = 'all';

  constructor(
    private consultantService: ConsultantService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    
    this.consultantService.consultants$.subscribe(consultants => {
      this.consultants = consultants;
      this.applyFilters();
    });
  }

  applyFilters(): void {
    let filtered = [...this.consultants];

    // Filtrar por status
    if (this.filterStatus !== 'all') {
      filtered = filtered.filter(c => c.status === this.filterStatus);
    }

    // Filtrar por busca
    if (this.searchTerm) {
      const search = this.searchTerm.toLowerCase();
      filtered = filtered.filter(c =>
        c.name.toLowerCase().includes(search) ||
        c.email.toLowerCase().includes(search) ||
        c.specialty.toLowerCase().includes(search)
      );
    }

    this.filteredConsultants = filtered;
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  onFilterChange(): void {
    this.applyFilters();
  }

  handleDeleteConsultant(id: number): void {
    this.consultantService.deleteConsultant(id);
  }
}
