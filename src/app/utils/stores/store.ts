import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';

export abstract class Store<T> {

  entity$!: Observable<T | undefined>;
  protected entitySub!: BehaviorSubject<T | undefined>;
  protected successInitialLoad = false;

  constructor() {
    this.initStore();
  }

  isInitialized(): boolean {
    return this.successInitialLoad;
  }

  initialLoad(): Observable<boolean> {
    if (!this.successInitialLoad) return this.load();

    return of(true);
  }

  load(): Observable<boolean> {
    return this.loadLogic().pipe(
      map(r => {
        this.entitySub.next(r);
        this.successInitialLoad = true;
        return true;
      }),
      catchError(_ => of(false))
    )
  }

  protected abstract loadLogic(): Observable<T>;

  getEntity(): T | undefined {
    return this.entitySub.getValue();
  }

  clear(): void {
    this.entitySub.complete();
    this.initStore();
  }

  protected initStore(): void {
    this.entitySub = new BehaviorSubject<T | undefined>(undefined);
    this.entity$ = this.entitySub.asObservable();
    this.successInitialLoad = false;
  }
}