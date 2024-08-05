import PhoneImg from "../../../assets/landing/iphone4.png";
import QrImage from "../../../assets/landing/qrcode.png";


export default function DownloadMobile(){
    return (
    <section className="h-[64rem] bg-gray-100 p-16">
        <section className="bg-orange-400 h-full w-full rounded-3xl flex flex-col p-12 text-center gap-6">
          <div className="h-full w-full rounded-3xl bg-white p-16 flex justify-start items-center">
            <div className="w-2/3 h-full flex justify-center items-center">
              <div className="bg-orange-400 h-3/4 w-1/2  rounded-full flex justify-center items-center">
                <img src={PhoneImg} alt="" className="object-cover w-4/5 rounded-3xl" />
              </div>
            </div>
            <div className="w-1/3 h-full pt-24 flex flex-col justify-start gap-12 text-center">
              <h2 className="text-black text-6xl font-bold text-center"><span className="text-orange-400">DOWNLOAD</span><br/> OUR APP</h2>
              <p className="text-black">Cooking has never been easier. Download the MealMaster app on your mobile device today and have a personal chef right in your pocket. Available on:</p>
              <div className="h-full p-5">
                <div className="w-1/3">
                <img src={QrImage} alt="" className="rounded-xl" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
      );
}