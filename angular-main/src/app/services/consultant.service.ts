import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Consultant } from '../models/consultant.model';

@Injectable({
  providedIn: 'root'
})
export class ConsultantService {
  private consultantsSubject: BehaviorSubject<Consultant[]>;
  public consultants$: Observable<Consultant[]>;

  // Dados mocados iniciais
  private mockConsultants: Consultant[] = [
    {
      id: 1,
      name: 'Ana Silva',
      email: 'ana.silva@empresa.com',
      specialty: 'Desenvolvimento Frontend',
      experience: 5,
      phone: '(11) 98765-4321',
      status: 'active'
    },
    {
      id: 2,
      name: 'Carlos Santos',
      email: 'carlos.santos@empresa.com',
      specialty: 'Desenvolvimento Backend',
      experience: 8,
      phone: '(11) 98765-4322',
      status: 'active'
    },
    {
      id: 3,
      name: 'Mariana Costa',
      email: 'mariana.costa@empresa.com',
      specialty: 'DevOps',
      experience: 6,
      phone: '(11) 98765-4323',
      status: 'active'
    },
    {
      id: 4,
      name: 'Pedro Oliveira',
      email: 'pedro.oliveira@empresa.com',
      specialty: 'UX/UI Design',
      experience: 4,
      phone: '(11) 98765-4324',
      status: 'inactive'
    }
  ];

  constructor() {
    const storedConsultants = localStorage.getItem('consultants');
    const initialData = storedConsultants 
      ? JSON.parse(storedConsultants) 
      : this.mockConsultants;
    
    this.consultantsSubject = new BehaviorSubject<Consultant[]>(initialData);
    this.consultants$ = this.consultantsSubject.asObservable();
    
    // Salvar dados iniciais se não existir
    if (!storedConsultants) {
      this.saveToLocalStorage();
    }
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('consultants', JSON.stringify(this.consultantsSubject.value));
  }

  getConsultants(): Consultant[] {
    return this.consultantsSubject.value;
  }

  getConsultantById(id: number): Consultant | undefined {
    return this.consultantsSubject.value.find(c => c.id === id);
  }

  addConsultant(consultant: Omit<Consultant, 'id'>): void {
    const consultants = this.consultantsSubject.value;
    const newId = consultants.length > 0 
      ? Math.max(...consultants.map(c => c.id)) + 1 
      : 1;
    
    const newConsultant: Consultant = {
      ...consultant,
      id: newId
    };

    this.consultantsSubject.next([...consultants, newConsultant]);
    this.saveToLocalStorage();
  }

  updateConsultant(id: number, consultant: Partial<Consultant>): void {
    const consultants = this.consultantsSubject.value;
    const index = consultants.findIndex(c => c.id === id);
    
    if (index !== -1) {
      consultants[index] = { ...consultants[index], ...consultant };
      this.consultantsSubject.next([...consultants]);
      this.saveToLocalStorage();
    }
  }

  deleteConsultant(id: number): void {
    const consultants = this.consultantsSubject.value.filter(c => c.id !== id);
    this.consultantsSubject.next(consultants);
    this.saveToLocalStorage();
  }
}
