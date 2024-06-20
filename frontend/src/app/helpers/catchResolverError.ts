import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { EMPTY, Observable, catchError } from 'rxjs';

export const catchResolverError = (router: Router) =>
  // We use any here so that we can use this helper in any resolver.
  // To keep it type-safe, we use unknown in the body of the function.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  catchError<any, Observable<never>>((err: unknown) => {
    if (err instanceof HttpErrorResponse && err.status === 404) {
      router.navigateByUrl('/404', { skipLocationChange: true });
      return EMPTY;
    }
    router.navigateByUrl('/500', { skipLocationChange: true });
    console.error(err);
    return EMPTY;
  });
