/** Go to top page. */
export function goToTop(): void {
  const TOP_OF_PAGE = 0;
  const SCROLL_EVENT = 'smooth';

  window.scrollTo({
    top: TOP_OF_PAGE,
    behavior: SCROLL_EVENT,
  });
}
