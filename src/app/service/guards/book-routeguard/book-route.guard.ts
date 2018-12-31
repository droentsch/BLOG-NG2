import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { StateService } from '../../state.service';

@Injectable()
export class BookRouteGuard implements CanActivate {

    constructor(private router: Router,
                private state: StateService) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
        ): boolean {
            let id = +next.url[1];
            if (isNaN(id) || (id < 0 && id > this.state.getLastChapter().number)) {
                console.log(`Chapter does not exist!`);
                this.router.navigate([`book/1`]);
                return false;
            }
            return true;
        }
}
