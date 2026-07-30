import React  from 'react'
import { CiSearch } from 'react-icons/ci'
import useGet from "@hooks/server/useGet";
import SearchBooks from './SearchBooks';
import { useForm } from 'react-hook-form';

function SearchPage() {
  const { register, watch } = useForm();

  const { data: bookData, isLoading: loadBooks } =
    useGet({ title: watch('bookTitle') }
      , 'books', `books/my_Get`);

  return (
    <div className='py-4 h-auto'>
      <div
        className="bg-s-gray border border-b-gray h-15 w-full py-2 px-2 rounded-lg
     flex items-center justify-between"
      >
        <input type="text" {...register('bookTitle')} inputMode='search' autoFocus className=' text-sm placeholder:text-gray-500 text-gray-700 font-kal-2 mr-1 bg-s-gray w-full pe-3 focus:ring-0 outline-none focus:ring-offset-0'
          placeholder='  کتاب مورد نظر خود را جستجو کنید !' />
        <CiSearch size={24} className="text-gray-600 " />
      </div>

      <p className='text-gray-600 text-sm mt-4'>   نتایج جستجو :  </p>
      <div className="h-[calc(100vh-235px)] overflow-y-auto mt-2  no-scrollbar">
        {loadBooks && <div className='h-[calc(100%-50px)] flex justify-center items-center font-kal-2 text-center'>در حال بارگیری</div>}
        {bookData?.data.length == 0 && <div className='h-[calc(100%-50px)] flex justify-center items-center font-kal-2 text-center'> کتابی یافت نشد ! </div>}
        <SearchBooks bookData={bookData} />
      </div>

    </div>
  )
}

export default SearchPage