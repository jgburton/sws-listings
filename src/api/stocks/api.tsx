const fetchStocks = async () => {
    const response = await fetch(
      'https://simplywall.st/api/grid/filter?include=grid,score',
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
          offset: 0,
          size: 100,
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