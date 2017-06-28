import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(Router)
export class results {
    constructor(router) {
        this.router = router;
    }

    back() {
        this.router.navigate('#/personalinfo');  
    }
}