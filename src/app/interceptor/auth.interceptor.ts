import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse} from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Ajouter le token d'accès à chaque requête (si disponible)
    const token = this.authService.getToken();
    const clonedRequest = token ? req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    }) : req;

    return next.handle(clonedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        // Si le token est expiré (401 Unauthorized)
        if (error.status === 401) {
          this.authService.logout();  // Déconnecter l'utilisateur
          this.router.navigate(['/login']);  // Rediriger vers la page de connexion
        }
        return throwError(error);
      })
    );
  }
}
