import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Star, Check } from 'lucide-react';

export default function ReviewsSection({ reviews, onAddReview }) {
  const [isOpen, setIsOpen] = useState(false);
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [alertMessage, setAlertMessage] = useState(null);

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
      setAlertMessage('لطفاً نام و متن نظر خود را وارد کنید.');
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
    setAlertMessage('نظر شما با موفقیت ثبت شد!');
  };

  const avgValue = reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length)
    : 4.5;
  const averageRating = avgValue.toFixed(1);

  return (
    <div className="relative mx-4 mt-6 mb-16 z-20 filter drop-shadow-[0_12px_24px_rgba(15,23,42,0.12)]">
      <div
        className="bg-white rounded-[16px] border border-slate-100/80 p-4 pt-4 px-4"
        style={{
          WebkitMaskImage: `
            radial-gradient(circle 9px at 0px 52px, transparent 8.5px, black 9px),
            radial-gradient(circle 9px at 100% 52px, transparent 8.5px, black 9px)
          `,
          maskImage: `
            radial-gradient(circle 9px at 0px 52px, transparent 8.5px, black 9px),
            radial-gradient(circle 9px at 100% 52px, transparent 8.5px, black 9px)
          `,
          WebkitMaskComposite: 'destination-in',
          maskComposite: 'intersect',
        }}
      >
        {/* Header: Title 17px font-500 on Right, Rating score 17px font-500 on Left */}
        <div className="flex justify-between items-center h-[36px] px-1 mb-4">
          {/* Right side (RTL): Title */}
          <h2 className="text-[17px] font-[500] text-slate-800 tracking-tight">
            امتیاز و نظرات کاربران
          </h2>

          {/* Left side (RTL): Rating Score */}
          <div className="flex items-center gap-1.5">
            <span className="text-[17px] font-[500] text-slate-800">
              {parseFloat(averageRating).toLocaleString('fa-IR')}
            </span>
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
          </div>
        </div>

        {/* Note: No dashed divider line as requested ("نیازی به خط چین پایین امتیازات نداره") */}

        {/* Horizontal Swipeable Reviews Slider */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory py-2 -mx-1 px-1">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="w-72 bg-white rounded-[24px] p-5 border border-slate-200 snap-center flex-shrink-0 text-right flex flex-col justify-between"
            >
              <div>
                {/* Writer & Rating Header */}
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-bold text-slate-500">{review.author}</span>
                  <div className="flex gap-0.5 items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Comment Text */}
                <p className="text-[12px] font-[600] text-slate-700 leading-[24px] mb-4">
                  {review.text}
                </p>
              </div>

              {/* Tags footer */}
              <div className="flex flex-wrap gap-1.5 justify-end">
                {review.tags && review.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2.5 py-1.5 rounded-lg"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Write a Review Button */}
        <div className="pt-4 pb-1">
          <button
            id="submit-rating-btn"
            type="button"
            onClick={() => setIsOpen(true)}
            className="w-full py-3 border border-slate-700 rounded-[8px] text-sm font-bold text-slate-800 hover:bg-slate-50 transition-colors flex items-center justify-center cursor-pointer"
          >
            ثبت امتیاز و نظرات
          </button>
        </div>
      </div>

      {/* Write Review Modal Dialogue */}
      {isOpen &&
        createPortal(
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in">
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
                    placeholder=""
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
          </div>,
          document.body
        )}

      {/* Centered Alert Modal */}
      {alertMessage &&
        createPortal(
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs transition-all animate-fade-in">
            <div className="bg-white rounded-2xl w-full max-w-xs p-5 text-center shadow-2xl space-y-4 border border-slate-100">
              <div className="text-sm font-bold text-slate-800 leading-relaxed">
                {alertMessage}
              </div>
              <button
                id="alert-close-btn"
                type="button"
                onClick={() => setAlertMessage(null)}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
              >
                تایید
              </button>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
