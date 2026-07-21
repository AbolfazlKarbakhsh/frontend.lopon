import React from "react";
import BookCard from "@components/UI/BookCard";

function BookLib({ e }) {
  return (
    <div className="w-[46%]">
      <BookCard e={e} />
    </div>
  );
}

export default BookLib;
