import { map, merge, Observable, skip, switchMap, tap } from 'rxjs';

import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { AnimeBase, AnimeSortField, AnimeSortDirection } from '@js-camp/core/models/anime';

import { AnimeService } from '../../../../core/services/anime.service';
import { UrlService } from '../../../../core/services/url.service';
import { FilterItem, FilterVMService } from './filterVM.service';


interface AnimeList {

  /** Total anime count. */
  readonly totalAnimeCount: number;

  /** List of anime. */
  readonly list: readonly AnimeBase[];
}

const INITIAL_PAGE = 0;

/** Table view component. */
@UntilDestroy()
@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css'],
  providers: [FilterVMService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableViewComponent implements OnInit {

  /** Table columns names. */
  public readonly displayedColumns = ['image', 'title-english', 'title-japanese', 'aired-start', 'type', 'status'] as const;

  /** Anime list. */
  public readonly animeList$: Observable<AnimeList>;

  public constructor(
    private readonly urlService: UrlService,
    private readonly animeService: AnimeService,
    public readonly filter: FilterVMService,
  ) {
    this.animeList$ = this.initializeAnimeList();
  }

  /** @inheritdoc */
  public ngOnInit(): void {
    // When the component is first rendered,
    // it is necessary to save the page number that was passed in the url.
    // In the future, when one of the pagination parameters changes, you need to reset the page.
    const skipFirstRender$ = merge(
      this.filter.queryForm.valueChanges,
      this.filter.sort$,
    ).pipe(
      skip(1),
    );

    skipFirstRender$.pipe(
      tap(() => this.filter.setCurrentPageNumber(INITIAL_PAGE)),
      untilDestroyed(this),
    )
      .subscribe();
  }

  /**
   * Handlers pagination change.
   * @param event Paginator event.
   */
  public onPaginationChange(event: PageEvent): void {
    this.filter.setCurrentPageNumber(event.pageIndex);
  }

  /**
   * Handlers sort change.
   * @param sort Sort state.
   */
  public onSortChange(sort: Sort): void {
    // Need to remove the value '' from sort.direction
    this.filter.setSort({
      field: sort.active as AnimeSortField,
      direction: sort.direction === '' ? 'asc' : 'desc',
    });
  }

  /**
   * Tracks anime by ID.
   * @param _ Index.
   * @param anime Object of anime.
   */
  public trackAnimeById(_: number, anime: AnimeBase): number {
    return anime.id;
  }

  /**
   * Tracks type by name.
   * @param _ Index.
   * @param type Object of type.
   */
  public trackType(_: number, type: FilterItem): string {
    return type.field;
  }

  /**
   * Handlers redirect to details page.
   * @param anime Anime record.
   */
  public onDetailsShow(anime: AnimeBase): void {
    this.urlService.navigateToDetails(anime.id);
  }

  private initializeAnimeList(): Observable<AnimeList> {
    const filterChanges$ = this.filter.getFilterChanges();

    const params$ = filterChanges$.pipe(
      map(([[search, typeFilter, sort], pageNumber]) => {
        const direction = sort.direction === 'asc' ? AnimeSortDirection.Ascending : AnimeSortDirection.Descending;
        return {
          sort: {
            direction,
            field: sort.field,
          },
          page: pageNumber,
          pageSize: this.filter.pageSize,
          search,
          types: typeFilter,
        };
      }),
    );

    const setUrl$ = params$.pipe(
      tap(animeListParams => this.filter.setQueryParamsToUrl(animeListParams)),
    );

    return setUrl$.pipe(
      switchMap(animeListParams => this.animeService.fetchAnimeList(animeListParams)),
      map(({ results, totalEntriesCount }) => ({ list: results, totalAnimeCount: totalEntriesCount })),
    );
  }

}
