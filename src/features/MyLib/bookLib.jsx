import React from "react";
import { Link } from "react-router-dom";

function BookLib({ e }) {
  const logicRoute = e.isDownload == false ? `/books/${e?.name}` : `/books/BookViewer/${e?.name}/${e?.title}`;

  return (
    <div className="w-[46%]">
      <Link className="card bg-white " to={logicRoute}>
        <figure className="p-3 bg-[#61646b1d] h-[210px]">
          <img
            src={e?.imageUrl}
            alt={e?.title}
            className="rounded-xl   z-10 h-auto max-h-[180px]"
          />
        </figure>
        <div className="px-3 py-4">
          <p className="text-27 text-[.71rem]    h-[35px] truncate whitespace-normal tracking-wider font-kal-3 ">
            {e?.title}
          </p>
        </div>
      </Link>
    </div>
  );
}

export default BookLib;
