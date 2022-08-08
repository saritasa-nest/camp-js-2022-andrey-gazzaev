import { BehaviorSubject, combineLatestWith, debounceTime, map, Observable, startWith, switchMap, tap } from 'rxjs';

import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Sort, SortDirection } from '@angular/material/sort';
import { ChangeDetectionStrategy, Component, TrackByFunction } from '@angular/core';

import { AnimeBase, Type } from '@js-camp/core/models/anime';

import { goToTop } from '../../../../core/utils/animations';
import { UrlService } from '../../../../core/services/url.service';
import { AnimeService } from '../../../../core/services/anime.service';
import { AnimeListOptions } from '../../../../core/models/anime-list-options';

interface TableSort {

  /** The field by which to sort. */
  readonly field: string;

  /** The sort order. */
  readonly direction: SortDirection;
}

interface FilterItem {

  /** Key of filter. */
  readonly field: string;

  /** Name of filter. */
  readonly title: string;

  /** Is a filter selected. */
  readonly isSelect: boolean;
}

const DEFAULT_SORT_FIELD = 'title_eng';
const DEFAULT_SORT_DIRECTION = 'asc';
const INITIAL_PAGE = 0;
const INPUT_DEBOUNCE_TIME = 500;

/** Table view component. */
@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableViewComponent {

  /** Total number of records for the current query. */
  public animeListCount = 0;

  /** Number of records per page. */
  public readonly pageSize: number;

  /** All possible type filters. */
  public readonly filterListByType: readonly FilterItem[];

  /** Value of search input. */
  public readonly search = new FormControl('');

  /** Filter by type. */
  public readonly typeFilter = new FormControl<Type[]>([]);

  /** Current sort settings. */
  public readonly sort$ = new BehaviorSubject<TableSort>({
    field: DEFAULT_SORT_FIELD,
    direction: DEFAULT_SORT_DIRECTION,
  });

  /** Current page number. */
  public readonly currentPageNumber$ = new BehaviorSubject<number>(0);

  /** Table columns names. */
  public readonly displayedColumns: readonly string[] = ['image', 'title-english', 'title-japanese', 'aired-start', 'type', 'status'];

  /** Anime list. */
  public readonly animeList$: Observable<readonly AnimeBase[]>;

  public constructor(
    private readonly urlService: UrlService,
    private readonly animeService: AnimeService,
  ) {
    const animeListOptions = this.animeService.getAnimeListOptions();
    this.setInputValues(animeListOptions);

    this.filterListByType = this.getInitialFilterListByType();

    this.pageSize = this.getInitialPageSize();

    const typeFilterChanges$ = this.typeFilter.valueChanges.pipe(
      startWith(animeListOptions.filter.byType),
    );

    const searchChanges$ = this.search.valueChanges.pipe(
      startWith(animeListOptions.search),
    );

    let isFirstRender = true;
    const paramsChange$ = searchChanges$.pipe(
      combineLatestWith(
        typeFilterChanges$,
        this.sort$,
      ),
      tap(() => !isFirstRender ? this.currentPageNumber$.next(INITIAL_PAGE) : null),
      debounceTime(INPUT_DEBOUNCE_TIME),
    );

    const params$ = paramsChange$.pipe(
      combineLatestWith(this.currentPageNumber$),
    );

    this.animeList$ = params$.pipe(
      map(([[search, typeFilter, sort], pageNumber]) => {
        const animeListOption = new AnimeListOptions({
          pageNumber,
          sort,
          filter: { byType: typeFilter !== null ? typeFilter : [] },
          search: search !== null ? search : '',
          limit: this.pageSize,
        });
        return this.animeService.animeListOptionsToHttpParams(animeListOption);
      }),
      tap(animeListParams => urlService.setUrl(animeListParams)),
      switchMap(animeListParams => this.animeService.fetchAnimeList(animeListParams)),
      map(animeList => {
        this.animeListCount = animeList.count;
        return animeList.results;
      }),
      tap(() => goToTop()),
      tap(() => {
        isFirstRender = false;
      }),
    );
  }

  /**
   * Handlers pagination change.
   * @param event Paginator event.
   */
  public onPaginationChange(event: PageEvent): void {
    this.currentPageNumber$.next(event.pageIndex);
  }

  /**
   * Handlers sort change.
   * @param sort Sort state.
   */
  public onSortChange(sort: Sort): void {
    // Need to remove the value '' from sort.direction
    this.sort$.next({
      field: sort.active,
      direction: sort.direction === '' ? 'asc' : 'desc',
    });
  }

  /**
   * Tracks anime by ID.
   * @param _index Anime's index into array.
   * @param anime Object of hero.
   */
  public trackItem: TrackByFunction<AnimeBase> = function(_index: number, anime: AnimeBase): number {
    return anime.id;
  };

  /**
   * Handlers redirect to details page.
   * @param anime Anime record.
   */
  public onDetailsShow(anime: AnimeBase): void {
    this.urlService.navigateToDetails(anime.id);
  }

  /** Gets filter by type. */
  private getInitialFilterListByType(): readonly FilterItem[] {
    const types = this.animeService.getAnimeTypes();

    return types.map(type => ({
      field: type,
      title: type,
      isSelect: false,
    }));
  }

  /** Gets page size. */
  private getInitialPageSize(): number {
    return this.animeService.getLimit();
  }

  private setInputValues({ pageNumber, sort, search, filter }: AnimeListOptions): void {
    this.currentPageNumber$.next(pageNumber);
    this.sort$.next({ field: sort.field, direction: sort.direction === 'desc' ? 'desc' : 'asc' });
    this.search.setValue(search);
    this.typeFilter.setValue(filter.byType);
  }
}
