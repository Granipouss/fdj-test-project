import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { EMPTY, Observable, catchError } from 'rxjs';

export const catchResolverError = (router: Router) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  catchError<any, Observable<never>>((err) => {
    if (err instanceof HttpErrorResponse && err.status === 404) {
      router.navigateByUrl('/404', { skipLocationChange: true });
      return EMPTY;
    }
    router.navigateByUrl('/500', { skipLocationChange: true });
    console.error(err);
    return EMPTY;
  });
