# Angular Best Practices Guide

## Project Setup and Development Environment

This project uses Nix for development environment management. The [flake.nix](../../flake.nix) provides:
- Node.js and npm
- TypeScript compiler
- Development tools and dependencies

### Getting Started

```bash
# Enter the development environment
nix develop

# Install dependencies
npm install

# Start development server
ng serve

# Run tests
ng test

# Build for production
ng build
```

## Project Structure Best Practices

### Recommended Folder Structure

```
src/
├── app/
│   ├── core/                 # Singleton services, guards, interceptors
│   ├── shared/               # Shared components, directives, pipes
│   ├── features/             # Feature modules
│   │   ├── user-management/
│   │   │   ├── components/
│   │   │   ├── services/
│   │   │   ├── models/
│   │   │   └── user-management.module.ts
│   └── layout/               # Layout components
├── assets/                   # Static assets
└── environments/             # Environment configurations
```

## Component Best Practices

### 1. Component Organization

```typescript
// Use OnPush change detection for better performance
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent implements OnInit, OnDestroy {
  // Public properties first
  users$ = this.userService.getUsers();
  
  // Private properties
  private destroy$ = new Subject<void>();
  
  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) {}
  
  ngOnInit(): void {
    // Initialization logic
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

### 2. Template Best Practices

```html
<!-- Use trackBy functions for *ngFor -->
<div *ngFor="let user of users; trackBy: trackByUserId">
  {{ user.name }}
</div>

<!-- Use async pipe for observables -->
<div *ngIf="users$ | async as users">
  <app-user-card 
    *ngFor="let user of users; trackBy: trackByUserId"
    [user]="user"
    (userSelected)="onUserSelected($event)">
  </app-user-card>
</div>

<!-- Use ng-container to avoid extra DOM elements -->
<ng-container *ngIf="isLoading; else content">
  <app-loading-spinner></app-loading-spinner>
</ng-container>

<ng-template #content>
  <!-- Content here -->
</ng-template>
```

### 3. Component Communication

```typescript
// Use @Input() and @Output() for parent-child communication
@Component({
  selector: 'app-user-card'
})
export class UserCardComponent {
  @Input() user!: User;
  @Output() userSelected = new EventEmitter<User>();
  
  onSelectUser(): void {
    this.userSelected.emit(this.user);
  }
}

// Use services for sibling component communication
@Injectable({
  providedIn: 'root'
})
export class UserStateService {
  private selectedUserSubject = new BehaviorSubject<User | null>(null);
  selectedUser$ = this.selectedUserSubject.asObservable();
  
  selectUser(user: User): void {
    this.selectedUserSubject.next(user);
  }
}
```

## Service Best Practices

### 1. HTTP Services

```typescript
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly apiUrl = environment.apiUrl;
  
  constructor(private http: HttpClient) {}
  
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }
  
  createUser(user: CreateUserRequest): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users`, user).pipe(
      catchError(this.handleError)
    );
  }
  
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('API Error:', error);
    return throwError(() => new Error('Something went wrong'));
  }
}
```

### 2. State Management

```typescript
// Simple state service
@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  private state = new BehaviorSubject(initialState);
  
  getState(): Observable<AppState> {
    return this.state.asObservable();
  }
  
  updateState(partialState: Partial<AppState>): void {
    const currentState = this.state.value;
    this.state.next({ ...currentState, ...partialState });
  }
}
```

## RxJS Best Practices

### 1. Observable Patterns

```typescript
export class UserListComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  ngOnInit(): void {
    // Use takeUntil for automatic unsubscription
    this.userService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe(users => {
        // Handle users
      });
    
    // Combine multiple observables
    combineLatest([
      this.userService.getUsers(),
      this.roleService.getRoles()
    ]).pipe(
      takeUntil(this.destroy$),
      map(([users, roles]) => ({ users, roles }))
    ).subscribe(data => {
      // Handle combined data
    });
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

### 2. Error Handling

```typescript
// Global error handling
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    console.error('Global error:', error);
    // Send to logging service
  }
}

// HTTP Error Interceptor
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Handle unauthorized
        }
        return throwError(() => error);
      })
    );
  }
}
```

## Performance Best Practices

### 1. Lazy Loading

```typescript
// App routing with lazy loading
const routes: Routes = [
  {
    path: 'users',
    loadChildren: () => import('./features/user-management/user-management.module')
      .then(m => m.UserManagementModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.module')
      .then(m => m.DashboardModule)
  }
];
```

### 2. OnPush Change Detection

```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptimizedComponent {
  @Input() data!: any;
  
  constructor(private cdr: ChangeDetectorRef) {}
  
  updateData(): void {
    // Manually trigger change detection when needed
    this.cdr.markForCheck();
  }
}
```

### 3. TrackBy Functions

```typescript
export class UserListComponent {
  trackByUserId(index: number, user: User): number {
    return user.id;
  }
}
```

## Testing Best Practices

### 1. Component Testing

```typescript
describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userService: jasmine.SpyObj<UserService>;
  
  beforeEach(() => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['getUsers']);
    
    TestBed.configureTestingModule({
      declarations: [UserListComponent],
      providers: [
        { provide: UserService, useValue: userServiceSpy }
      ]
    });
    
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
  });
  
  it('should load users on init', () => {
    const mockUsers = [{ id: 1, name: 'John' }];
    userService.getUsers.and.returnValue(of(mockUsers));
    
    component.ngOnInit();
    
    expect(userService.getUsers).toHaveBeenCalled();
  });
});
```

### 2. Service Testing

```typescript
describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  
  it('should fetch users', () => {
    const mockUsers = [{ id: 1, name: 'John' }];
    
    service.getUsers().subscribe(users => {
      expect(users).toEqual(mockUsers);
    });
    
    const req = httpMock.expectOne('/api/users');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });
  
  afterEach(() => {
    httpMock.verify();
  });
});
```

## Security Best Practices

### 1. XSS Prevention

```typescript
// Use Angular's built-in sanitization
@Component({
  template: `
    <!-- Safe - Angular automatically sanitizes -->
    <div>{{ userInput }}</div>
    
    <!-- Dangerous - avoid innerHTML with user input -->
    <div [innerHTML]="sanitizedHtml"></div>
  `
})
export class SafeComponent {
  constructor(private sanitizer: DomSanitizer) {}
  
  get sanitizedHtml(): SafeHtml {
    return this.sanitizer.sanitize(SecurityContext.HTML, this.userInput) || '';
  }
}
```

### 2. Environment Configuration

```typescript
// environments/environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://api.production.com',
  enableLogging: false
};

// environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  enableLogging: true
};
```

## Code Style and Linting

### 1. ESLint Configuration

```json
// .eslintrc.json
{
  "extends": [
    "@angular-eslint/recommended",
    "@typescript-eslint/recommended"
  ],
  "rules": {
    "@typescript-eslint/no-explicit-any": "error",
    "@angular-eslint/component-class-suffix": "error",
    "@angular-eslint/directive-class-suffix": "error"
  }
}
```

### 2. Prettier Configuration

```json
// .prettierrc
{
  "singleQuote": true,
  "trailingComma": "es5",
  "tabWidth": 2,
  "semi": true,
  "printWidth": 100
}
```

## Accessibility Best Practices

```html
<!-- Use semantic HTML -->
<nav role="navigation">
  <ul>
    <li><a href="/users" [attr.aria-current]="isActive ? 'page' : null">Users</a></li>
  </ul>
</nav>

<!-- Provide ARIA labels -->
<button 
  type="button"
  [attr.aria-label]="buttonLabel"
  [attr.aria-pressed]="isPressed"
  (click)="toggle()">
  Toggle
</button>

<!-- Use CDK a11y module -->
<div cdkTrapFocus>
  <!-- Modal content -->
</div>
```

## Deployment Best Practices

### 1. Build Optimization

```json
// angular.json
{
  "projects": {
    "app": {
      "architect": {
        "build": {
          "configurations": {
            "production": {
              "budgets": [
                {
                  "type": "initial",
                  "maximumWarning": "2mb",
                  "maximumError": "5mb"
                }
              ],
              "outputHashing": "all",
              "optimization": true,
              "sourceMap": false,
              "namedChunks": false,
              "extractLicenses": true,
              "vendorChunk": false,
              "buildOptimizer": true
            }
          }
        }
      }
    }
  }
}
```

### 2. Docker Configuration

```dockerfile
# Dockerfile
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## Additional Resources

- [Angular Style Guide](https://angular.io/guide/styleguide)
- [Angular DevKit](https://github.com/angular/angular-cli)
- [RxJS Best Practices](https://rxjs.dev/guide/operators)
- [Angular Testing Guide](https://angular.io/guide/testing)

Remember to regularly update dependencies and follow Angular's migration guides when upgrading versions.