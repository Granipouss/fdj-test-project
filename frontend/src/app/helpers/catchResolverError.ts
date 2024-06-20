import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { EMPTY, catchError } from 'rxjs';

export const catchResolverError = (router: Router) =>
  catchError((err: unknown) => {
    if (err instanceof HttpErrorResponse && err.status === 404) {
      router.navigateByUrl('/404', { skipLocationChange: true });
      return EMPTY;
    }
    router.navigateByUrl('/500', { skipLocationChange: true });
    console.error(err);
    return EMPTY;
  });
