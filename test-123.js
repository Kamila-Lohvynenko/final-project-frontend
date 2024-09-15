function getMonthDays(items, month, year) {
  const dayCount = 30;

  const arr = new Array(dayCount);

  return arr.map((_, index) => {
    const dayInCalendar = (index + 1).toString();
    return {
      portions: items.filter(({ date }) => date === dayInCalendar),
    };
  });
}

const avgCount = 1.5;

const totalAmount = portions.reduce((acc, item) => acc + item.amount, 0);

totalAmount / avgCount;
