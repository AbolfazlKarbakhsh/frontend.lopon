import React from "react";
import ProductSec from "./ProductSec";

function Products() {
  return (
    <>
      <div className="mt-9 mb-10">
        <ProductSec title={"نشریات اصلی"} category="67a797e0480d85e19f471204"/>
        <ProductSec title={"بروشور ها"} category="67a797d0480d85e19f4711fe"/>
        {/* <ProductSec title={"نشریات رایگان"} category="67a79789480d85e19f4711e2"/> */}
      </div>
    </>
  );
}

export default Products;
