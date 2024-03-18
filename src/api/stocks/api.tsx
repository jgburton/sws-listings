// export enum SortingOrder {
//   ASC = 'asc',
//   DESC = 'desc',
// }
// TODO: Sort by market cap & country - how to pass these values?

// TODO: How to determine number of pages?

const fetchStocks = async ({ pageParam }: { pageParam: number }) => {
  const offset = pageParam > 1 ? pageParam * 60 : 0;

  const response = await fetch(
    `https://simplywall.st/api/grid/filter?include=grid,score&page=${pageParam}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Cache-Control': 'no-cache',
        sws: 'fe-challenge',
      },
      body: JSON.stringify({
        id: 1,
        no_result_if_limit: false,
        offset: offset,
        size: 60,
        state: 'read',
        rules: [
          ['order_by', 'market_cap', 'desc'],
          ['grid_visible_flag', '=', true],
          ['market_cap', 'is_not_null'],
          ['primary_flag', '=', true],
          ['is_fund', '=', false],
          ['aor', [['country_name', 'in', ['ca']]]],
        ],
      }),
    }
  );

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};

export { fetchStocks };
