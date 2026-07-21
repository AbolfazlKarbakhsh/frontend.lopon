function RangeSlider({ numPages, currentPage, onSliderChange }) {
  // وقتی اسلایدر تغییر می‌کنه، مقدار معکوس رو به بیرون می‌فرستیم
  const handleChange = (e) => {
    const val = Number(e.target.value);
    const invertedVal = numPages - val + 1;  // معکوس کردن مقدار
    onSliderChange(invertedVal);
  };

  // مقدار ورودی هم باید معکوس نمایش داده بشه چون input خودش برعکسه
  const displayedValue = numPages - currentPage + 1;

  return (
    <div className="w-full rtl px-2">
      <input
        type="range"
        min={1}
        max={numPages}
        value={displayedValue}
        className="range range-xs range-accent mt-1 rotate-180"
        onChange={handleChange}
      />

      <div className="text-center font-kal-2 mt-1">
        صفحه: {currentPage} از {numPages}
      </div>
    </div>
  );
}

export default RangeSlider;
