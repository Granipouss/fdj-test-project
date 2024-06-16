import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, Observable, catchError } from 'rxjs';

export const catchResolverError = () =>
  catchError<any, Observable<never>>((err) => {
    console.log(err);
    inject(Router).navigateByUrl('/404', { skipLocationChange: true });
    return EMPTY;
  });
