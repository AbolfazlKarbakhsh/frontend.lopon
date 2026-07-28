
import { Instagram, Phone, Send } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

function MainFooter() {
  const location = useLocation().pathname
  return (
    <div 
      className="
        w-full
        max-w-md
        md:max-w-3xl
        lg:max-w-5xl
        mx-auto
        relative
        bg-slate-50
      "
    >
      <footer className="bg-slate-50 pt-10 pb-20 border-t border-slate-100 text-center">
        <div className="px-6 flex flex-col gap-10">
          <div id="footer-about">
            <h3 className="text-base font-bold mb-3 font-kal-3">درباره لوپُن</h3>
            <p className="text-slate-500 leading-relaxed text-[12px] font-kal-2">
              لوپُن پلتفرمی برای معرفی تخفیف خدمات محلی در شهر کرمان است. ما تلاش میکنیم بهترین مجموعههای شهر را با پیشنهادهای ویژه به شما معرفی کنیم.
            </p>
          </div>

          <div id="footer-social" className="flex flex-col items-center">
            <h3 className="text-base font-bold mb-4 font-kal-3">با ما در ارتباط باشید</h3>
            <div className="flex gap-4">
              <a href="#" className="p-2.5 bg-white rounded-xl shadow-sm hover:text-primary-s transition-all border border-slate-100"><Instagram size={18} /></a>
              <a href="#" className="p-2.5 bg-white rounded-xl shadow-sm hover:text-primary-s transition-all border border-slate-100"><Send size={18} /></a>
              <a href="#" className="p-2.5 bg-white rounded-xl shadow-sm hover:text-primary-s transition-all border border-slate-100"><Phone size={18} /></a>
            </div>
          </div>
          <div id="footer-contact">
            <h3 className="text-base font-bold mb-3 font-kal-3">تماس با ما</h3>
            <p className="text-slate-500 text-[12px] mb-1 font-kal-2">کرمان، خیابان صادقیه، کارخانه نوآوری</p>
            <p className="text-slate-500 text-[12px] font-kal-2">Email: info@lopon.ir</p>
          </div>
        </div>
                  <div className="flex justify-center gap-4 my-3">
                   <div className=" border border-gray-800 rounded-lg ">
                                                      <a
                                  referrerPolicy="origin"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                   href="https://trustseal.enamad.ir/?id=763513&Code=UIQeXlSRZ57jd1bdFV18lN63ANr5ld7B"
                                    >
                                  <img
                                   className="w-[80px]"
                                    referrerPolicy="origin"
                                    src="https://trustseal.enamad.ir/logo.aspx?id=763513&Code=UIQeXlSRZ57jd1bdFV18lN63ANr5ld7B"
                                    alt="نماد اعتماد الکترونیکی"
                                    style={{ cursor: "pointer" }}
                                    code="UIQeXlSRZ57jd1bdFV18lN63ANr5ld7B"
                                  />
                                         </a>
                          
                        </div>

                        <div className=" border border-gray-800 rounded-lg ">
                      <img src="/images/zarin-palpng.png" alt=""  className="w-[80px]"/>
                          
                        </div>

                        </div>
        <div className="px-4 text-center border-t border-slate-200 pt-6 mt-10">
          <p className="text-slate-400 text-[10px] font-kal-2">© ۱۴۰۳ لوپُن. تمامی حقوق محفوظ است.</p>
        </div>
      </footer>
    </div>
  );
}

export default MainFooter;
