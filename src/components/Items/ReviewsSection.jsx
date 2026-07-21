import React, { useState } from 'react';
import { Star, MessageSquareCode, Check } from 'lucide-react';
const DotLine = () => {
  return (
    <div className="relative h-px w-full mb-6 ">
      <div className="absolute -left-8 top-1/2 -translate-y-1/2 w-5 h-5 bg-[#fefeff] border-r border-slate-400 rounded-full z-10" />
      <div className="absolute inset-0 border-t-[2.3px] border-dashed border-slate-300" />
      <div className="absolute -right-8 top-1/2 -translate-y-1/2 w-5 h-5 bg-[#fefeff] border-l border-slate-400 rounded-full z-10" />
    </div>
  )
}
export default function ReviewsSection({ reviews, onAddReview }) {
  const [isOpen, setIsOpen] = useState(false);
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  const availableTags = ['خدمات ناخن', 'کراتین مو', 'پاکسازی پوست', 'کاپ‌شاپ', 'فیشال', 'طراحی مژه'];

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!author.trim() || !text.trim()) {
      alert('لطفاً نام و متن نظر خود را وارد کنید.');
      return;
    }
    onAddReview({
      author,
      rating,
      text,
      tags: selectedTags,
    });
    // Reset Form
    setAuthor('');
    setRating(5);
    setText('');
    setSelectedTags([]);
    setIsOpen(false);
  };

  const averageRating = (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <div className="mx-4 mt-6 bg-slate-50 border border-slate-100/50 rounded-3xl p-5 shadow-xs mb-16">
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center gap-1">
          <span className="text-base font-black text-gray-800">امتیاز و نظرات کاربران:</span>
         
        </div>
        <div className="flex  items-center ">
          <Star className="w-4 h-4 fill-amber-400 text-amber-400 mb-2" />
           <span className="text-md font-black text-slate-400 mr-1">{averageRating}</span>
        </div>
      </div>

     <DotLine />

      {/* Horizontal Swipeable Reviews Slider */}
      <div className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory pb-2 -mx-2 px-2">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="w-72 bg-white rounded-2xl p-4 shadow-xs border border-gray-100 snap-center flex-shrink-0 text-right flex flex-col justify-between"
          >
            <div>
              {/* Writer Header */}
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-black text-slate-500">{review.author}</span>
                <div className="flex gap-0.5 justify-end flex-row-reverse ">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < review.rating
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-gray-200'
                    }`}
                  />
                ))}
              </div>
              </div>

              {/* Star Bar */}
              

              {/* Text */}
              <p className="text-xs font-semibold text-gray-600 leading-relaxed mb-4">
                {review.text}
              </p>
            </div>

            {/* Tags footer */}
            <div className="flex flex-wrap gap-1.5 ">
              {review.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-3 rounded-lg"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Write a Review Button */}
      {/* <button
        id="submit-rating-btn"
        onClick={() => setIsOpen(true)}
        className="w-full mt-5 py-3 border border-gray-300 rounded-2xl text-xs font-black text-gray-600 hover:bg-white transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-99"
      >
        <span>ثبت امتیاز و نظرات</span>
        <MessageSquareCode className="w-4 h-4" />
      </button> */}

      {/* Write Review Modal Dialogue */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 text-right relative shadow-2xl transition-all scale-up">
            <h3 className="text-base font-black text-gray-800 mb-2">ثبت دیدگاه و امتیاز</h3>
            <p className="text-xs text-gray-400 mb-5">تجربه ارزشمند خود را از خدمات ما بنویسید.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Star selector */}
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2">امتیاز شما:</label>
                <div className="flex gap-2 justify-end">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <button
                      key={i}
                      id={`star-${i}`}
                      type="button"
                      onClick={() => setRating(5 - i)}
                      className="text-amber-400 focus:outline-none transition-transform active:scale-125 cursor-pointer"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          5 - i <= rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Author name */}
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5">نام و نام خانوادگی:</label>
                <input
                  id="author-input"
                  type="text"
                  required
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold focus:outline-hidden focus:border-rose-400 focus:ring-1 focus:ring-rose-400 text-right text-gray-800"
                  placeholder="مثال: رضا کاربخش"
                />
              </div>

              {/* Review Text */}
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5">متن نظر شما:</label>
                <textarea
                  id="text-input"
                  rows={3}
                  required
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold focus:outline-hidden focus:border-rose-400 focus:ring-1 focus:ring-rose-400 text-right text-gray-800 leading-relaxed"
                  placeholder="توضیحات و نظرات باکیفیت شما به ما انگیزه مضاعف می‌دهد..."
                />
              </div>

              {/* Tags Selector */}
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2">برچسب خدمات مورد استفاده:</label>
                <div className="flex flex-wrap gap-1.5 justify-end">
                  {availableTags.map((tag) => {
                    const isSelected = selectedTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        id={`tag-btn-${tag}`}
                        type="button"
                        onClick={() => toggleTag(tag)}
                        className={`text-[10px] font-black px-2.5 py-1.5 rounded-xl border transition-all cursor-pointer flex items-center gap-1 ${
                          isSelected
                            ? 'bg-rose-50 text-rose-500 border-rose-200'
                            : 'bg-slate-50 text-gray-500 border-slate-100 hover:bg-slate-100'
                        }`}
                      >
                        {isSelected && <Check className="w-2.5 h-2.5" />}
                        <span>{tag}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  id="close-modal-btn"
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-650 text-xs font-black rounded-2xl transition-all cursor-pointer text-center"
                >
                  انصراف
                </button>
                <button
                  id="submit-review-form-btn"
                  type="submit"
                  className="flex-1 py-3 bg-rose-500 hover:bg-rose-600 text-white text-xs font-black rounded-2xl transition-all shadow-md shadow-rose-100 cursor-pointer text-center"
                >
                  ثبت نظر
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
