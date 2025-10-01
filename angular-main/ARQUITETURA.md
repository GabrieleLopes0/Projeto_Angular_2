# 🏗️ Arquitetura do Sistema - Consultores App

## 📐 Visão Geral da Arquitetura

```
┌─────────────────────────────────────────────────────────────┐
│                      APLICAÇÃO ANGULAR                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌────────────────┐         ┌──────────────────┐           │
│  │  app.component │────────▶│  navbar.component│           │
│  │    (root)      │         └──────────────────┘           │
│  └────────┬───────┘                                         │
│           │                                                  │
│           │  router-outlet                                   │
│           │                                                  │
│  ┌────────▼──────────────────────────────────────────┐     │
│  │              ROTAS (app.routes.ts)                 │     │
│  │  ┌──────────┬──────────┬──────────┬──────────┐   │     │
│  │  │  /login  │/consultants│/new  │/edit/:id│/about│     │
│  │  └────┬─────┴─────┬────┴────┬────┴────┬────┴──┘   │     │
│  └───────┼───────────┼─────────┼─────────┼──────────┘     │
│          │           │         │         │                  │
│  ┌───────▼─┐  ┌──────▼──┐  ┌──▼─────┐  ┌▼─────┐          │
│  │ Login   │  │Consult. │  │Consult.│  │About │          │
│  │Component│  │List     │  │Form    │  │Comp. │          │
│  └─────────┘  │Component│  │Compone.│  └──────┘          │
│               └────┬────┘  └────────┘                      │
│                    │                                        │
│               ┌────▼─────┐                                 │
│               │Consultant│  @Input: consultant             │
│               │Card Comp.│  @Output: deleteConsultant      │
│               └──────────┘                                 │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                    GUARDS (Segurança)                        │
│  ┌──────────────────────────────────────────────────┐      │
│  │  auth.guard.ts                                    │      │
│  │  - canActivate(): boolean                         │      │
│  │  - Verifica autenticação                          │      │
│  │  - Verifica role (admin/user)                     │      │
│  └───────────────────┬──────────────────────────────┘      │
│                      │                                       │
├──────────────────────┼───────────────────────────────────────┤
│                      │      SERVICES (Lógica de Negócio)     │
│  ┌───────────────────▼────────────┐  ┌──────────────────┐  │
│  │  auth.service.ts               │  │ consultant.      │  │
│  │  - login(email, pass): boolean │  │ service.ts       │  │
│  │  - logout(): void              │  │ - getConsultants │  │
│  │  - isAuthenticated(): boolean  │  │ - addConsultant  │  │
│  │  - isAdmin(): boolean          │  │ - updateConsult  │  │
│  │  - currentUser: BehaviorSubject│  │ - deleteConsult  │  │
│  └────────────────────────────────┘  │ - consultants$:  │  │
│                                       │   BehaviorSubject│  │
│                                       └──────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│                    MODELS (Interfaces)                       │
│  ┌──────────────────┐      ┌─────────────────────────┐     │
│  │  user.model.ts   │      │  consultant.model.ts    │     │
│  │  - email         │      │  - id                   │     │
│  │  - password      │      │  - name                 │     │
│  │  - role          │      │  - email                │     │
│  │  - name          │      │  - specialty            │     │
│  └──────────────────┘      │  - experience           │     │
│                             │  - phone                │     │
│                             │  - status               │     │
│                             └─────────────────────────┘     │
├─────────────────────────────────────────────────────────────┤
│                    PERSISTÊNCIA                              │
│  ┌──────────────────────────────────────────────────┐      │
│  │  localStorage                                     │      │
│  │  - currentUser (sessão do usuário)               │      │
│  │  - consultants (lista de consultores)            │      │
│  └──────────────────────────────────────────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

## 🔄 Fluxo de Dados

### Autenticação

```
┌──────────┐      ┌──────────────┐      ┌─────────────┐
│  Login   │─────▶│ AuthService  │─────▶│ localStorage│
│Component │      │  - login()   │      │  - save     │
└──────────┘      │  - BehaviorS.│◀─────│  - retrieve │
                  └──────┬───────┘      └─────────────┘
                         │
                    ┌────▼────┐
                    │  Guard  │
                    │  check  │
                    └────┬────┘
                         │
                ┌────────▼────────┐
                │  Allow/Deny     │
                │  Navigation     │
                └─────────────────┘
```

### CRUD de Consultores

```
┌──────────────┐      ┌───────────────────┐      ┌──────────┐
│  Form/List   │─────▶│ ConsultantService │─────▶│localStorage
│  Component   │      │  - CRUD methods   │      │          │
└──────────────┘      │  - BehaviorSubject│◀─────│  persist │
        ▲             └──────────┬────────┘      └──────────┘
        │                        │
        │                        │ emit
        │                   ┌────▼────┐
        └───────────────────│consultants$
                            │ Observable
                            └─────────┘
```

## 🎭 Comunicação entre Componentes

### Pai → Filho (@Input)

```typescript
// consultant-list.component.html
<app-consultant-card
  [consultant]="consultant"    // ← @Input
  [isAdmin]="isAdmin"          // ← @Input
></app-consultant-card>

// consultant-card.component.ts
@Input() consultant!: Consultant;
@Input() isAdmin = false;
```

### Filho → Pai (@Output)

```typescript
// consultant-card.component.ts
@Output() deleteConsultant = new EventEmitter<number>();

onDelete(): void {
  this.deleteConsultant.emit(this.consultant.id); // ← Emit
}

// consultant-list.component.html
<app-consultant-card
  (deleteConsultant)="handleDeleteConsultant($event)" // ← Listener
></app-consultant-card>
```

### Via Service (Estado Compartilhado)

```typescript
// consultant.service.ts
private consultantsSubject = new BehaviorSubject<Consultant[]>([]);
public consultants$ = this.consultantsSubject.asObservable();

// Qualquer componente pode:
this.consultantService.consultants$.subscribe(data => {
  // Reage às mudanças
});
```

## 🛡️ Sistema de Segurança

### Guard Flow

```
┌─────────────┐
│ Navegação   │
│ Iniciada    │
└──────┬──────┘
       │
   ┌───▼────┐
   │ Guard  │
   │canActiv│
   └───┬────┘
       │
   ┌───▼──────────────────┐
   │ Usuário autenticado? │
   └───┬──────────────────┘
       │
   Não │          Sim
       │          │
  ┌────▼───┐  ┌──▼────────────────┐
  │Redirect│  │ Role requerida?   │
  │/login  │  └──┬────────────────┘
  └────────┘     │
             Não │      Sim
                 │      │
            ┌────▼──┐ ┌─▼──────────┐
            │Allow  │ │Role match? │
            └───────┘ └─┬──────────┘
                        │
                    Sim │      Não
                        │      │
                   ┌────▼──┐ ┌─▼────────┐
                   │Allow  │ │Redirect  │
                   └───────┘ │/consultants
                             └──────────┘
```

## 📝 Reactive Forms

### Validação Flow

```
┌──────────────┐
│ FormBuilder  │
└──────┬───────┘
       │
   ┌───▼─────────────┐
   │ FormGroup       │
   │ - FormControl   │
   │ - Validators    │
   └───┬─────────────┘
       │
   ┌───▼─────────────┐
   │ Template        │
   │ - [formGroup]   │
   │ - formControl   │
   └───┬─────────────┘
       │
   ┌───▼─────────────┐
   │ Validação       │
   │ - required      │
   │ - email         │
   │ - minLength     │
   │ - pattern       │
   └───┬─────────────┘
       │
   ┌───▼─────────────┐
   │ Feedback Visual │
   │ - .invalid class│
   │ - error message │
   └─────────────────┘
```

## 🗂️ Estrutura de Arquivos

```
src/app/
│
├── components/              # Componentes visuais
│   ├── login/              # Tela de login
│   ├── navbar/             # Navegação
│   ├── consultant-list/    # Lista (componente pai)
│   ├── consultant-card/    # Card (componente filho)
│   ├── consultant-form/    # Formulário CRUD
│   └── about/              # Sobre
│
├── services/               # Lógica de negócio
│   ├── auth.service.ts    # Autenticação
│   └── consultant.service.ts # CRUD consultores
│
├── guards/                 # Proteção de rotas
│   └── auth.guard.ts      # Guard de autenticação
│
├── models/                 # Tipos e interfaces
│   ├── user.model.ts
│   └── consultant.model.ts
│
├── app.component.ts       # Componente raiz
├── app.config.ts          # Configuração
└── app.routes.ts          # Definição de rotas
```

## 🎯 Design Patterns Utilizados

### 1. **Singleton Pattern**

```typescript
@Injectable({ providedIn: "root" })
export class AuthService {}
```

Um único instance do service em toda a aplicação.

### 2. **Observer Pattern**

```typescript
private consultantsSubject = new BehaviorSubject<Consultant[]>([]);
public consultants$ = this.consultantsSubject.asObservable();
```

Componentes observam mudanças nos dados.

### 3. **Guard Pattern**

```typescript
canActivate(route, state): boolean {
  // Verificação de acesso
}
```

Controla acesso às rotas.

### 4. **Dependency Injection**

```typescript
constructor(
  private authService: AuthService,
  private consultantService: ConsultantService
) {}
```

Angular injeta dependências automaticamente.

## 🔄 Ciclo de Vida dos Componentes

```
┌────────────────┐
│ Constructor    │ - Injeção de dependências
└────────┬───────┘
         │
┌────────▼───────┐
│ ngOnInit()     │ - Inicialização
└────────┬───────┘   - Subscribe observables
         │           - Carregar dados
┌────────▼───────┐
│ Template       │ - Renderização
│ Rendering      │ - Data binding
└────────┬───────┘
         │
┌────────▼───────┐
│ User           │ - Interações
│ Interactions   │ - Events
└────────┬───────┘
         │
┌────────▼───────┐
│ ngOnDestroy()  │ - Limpeza
└────────────────┘   - Unsubscribe
```

## 📊 Estado da Aplicação

```
┌─────────────────────────────────────┐
│       ESTADO GLOBAL                  │
├─────────────────────────────────────┤
│                                      │
│  AuthService                         │
│  ├─ currentUser: User | null         │
│  └─ isAuthenticated: boolean         │
│                                      │
│  ConsultantService                   │
│  └─ consultants: Consultant[]        │
│                                      │
├─────────────────────────────────────┤
│       PERSISTÊNCIA                   │
├─────────────────────────────────────┤
│                                      │
│  localStorage                        │
│  ├─ currentUser                      │
│  └─ consultants                      │
│                                      │
└─────────────────────────────────────┘
```

## 🎨 Camadas da Aplicação

```
┌─────────────────────────────────────┐
│  PRESENTATION LAYER (Components)     │ ← UI, Templates, Styles
├─────────────────────────────────────┤
│  BUSINESS LOGIC LAYER (Services)     │ ← Regras de negócio
├─────────────────────────────────────┤
│  SECURITY LAYER (Guards)             │ ← Autenticação/Autorização
├─────────────────────────────────────┤
│  DATA LAYER (Models + localStorage)  │ ← Persistência
└─────────────────────────────────────┘
```

## 🚀 Fluxo de Execução Completo

1. **Inicialização**: `main.ts` → `AppComponent`
2. **Routing**: Angular Router carrega componente baseado na URL
3. **Guard**: Verifica autorização
4. **Component**: Inicializa e carrega dados
5. **Service**: Busca/manipula dados
6. **Observable**: Emite novos valores
7. **Component**: Atualiza view
8. **User Interaction**: Dispara eventos
9. **Service**: Processa mudanças
10. **Persistence**: Salva no localStorage
11. **Observable**: Notifica subscribers
12. **View**: Auto-atualiza

---

**Esta arquitetura segue as melhores práticas do Angular e permite fácil manutenção e escalabilidade.**
