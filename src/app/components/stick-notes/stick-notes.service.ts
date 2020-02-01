import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';
import { take, tap } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class StickService {
    private _items = new BehaviorSubject<string[]>(['Check order 23', 'Payments pending 34']);

    get items() {
        return this._items.asObservable();
    }

    onAddNote(item) {
        return this.items.pipe(take(1), tap((items)=> {
            return this._items.next(items.concat(item));
        }))
    }
}