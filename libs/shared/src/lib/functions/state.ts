import { Router } from '@angular/router';
import { from, pipe } from 'rxjs';
import { concatMap, filter, map } from 'rxjs/operators';

const routerNavigationUrl = pipe(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  map((action: any) => action?.payload?.event?.url as string)
);

export const urlContains = (urlToMatch: string) =>
  pipe(
    routerNavigationUrl,
    filter((url) => url.includes(urlToMatch))
  );
export const urlDoesNotContain = (urlToMatch: string) =>
  pipe(
    routerNavigationUrl,
    filter((url) => !url?.includes(urlToMatch))
  );
export const redirectToUrl = (router: Router, url: string) =>
  pipe(concatMap(() => from(router.navigateByUrl(url))));
