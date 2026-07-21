import React from 'react';
import Iran from "@assets/images/iran.png"

const IranNumber = () => {
    return (
        <>
              <div className="mx-3">
              |
            </div>
            <div className="flex items-center font-kal-2 space-x-3">
                <p className="text-sm text-27 font-kal-2 ml-1 dark:text-gray-100">98+</p>
                <img src={Iran} alt=""  className="w-7 object-cover  h-7 rounded-full"/>
            </div> 
        </>
    );
}

export default IranNumber;
