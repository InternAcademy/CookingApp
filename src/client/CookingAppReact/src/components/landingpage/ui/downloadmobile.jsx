import PhoneImg from "../../../assets/landing/iphone4.png";
import QrImage from "../../../assets/landing/qrcode.png";

export default function DownloadMobile() {
  return (
    <section className="md:h-[64rem] bg-base p-2 md:p-16">
      <section className="bg-orange-400 h-full w-full rounded-3xl flex flex-col p-2 md:p-12 text-center gap-6">
        <div className="h-full w-full rounded-3xl bg-white p-3 md:p-16 flex flex-col md:flex-row justify-start items-center">
          <div className="md:w-2/3 md:h-full h-2/3 flex justify-center items-center">
            <div className="lg:bg-orange-400 w-full lg:h-3/4 lg:w-1/2  rounded-full flex justify-center items-center">
              <img
                src={PhoneImg}
                alt=""
                className="object-cover md:w-4/5 rounded-3xl"
              />
            </div>
          </div>
          <div className="md:w-1/3 md:h-full h-1/3 md:pt-24 flex flex-col justify-start gap-12 text-center">
            <h2 className="primaryText text-6xl font-bold text-center">
              <span className="text-orange-400">DOWNLOAD</span>
              <br /> OUR APP
            </h2>
            <p className="primaryText">
              Cooking has never been easier. Download the MealMaster app on your
              mobile device today and have a personal chef right in your pocket.
              Available on:
            </p>
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
