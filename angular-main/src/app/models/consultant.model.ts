export interface Consultant {
  id: number;
  name: string;
  email: string;
  specialty: string;
  experience: number;
  phone: string;
  status: 'active' | 'inactive';
}
