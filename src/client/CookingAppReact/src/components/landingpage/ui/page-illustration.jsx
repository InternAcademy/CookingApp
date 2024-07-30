import Stripes from "../../../assets/stripes.svg";

export default function PageIllustration() {
  return (
    <>
      {/* Stripes illustration */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 -z-10 -translate-x-1/2 transform"
      >
        <img
          className="max-w-none"
          src={Stripes}
          width={768}
          alt="Stripes"
        />
      </div>
      {/* Circles */}
      <div
        className="pointer-events-none absolute -top-32 left-1/2 ml-[580px] -translate-x-1/2"
      >
        <div className="h-80 w-80 rounded-full bg-gradient-to-tr from-blue-500 opacity-50 blur-[160px]" />
      </div>
      <div
        className="pointer-events-none absolute left-1/2 top-[420px] ml-[380px] -translate-x-1/2"
      >
        <div className="h-80 w-80 rounded-full bg-gradient-to-tr from-blue-500 to-gray-900 opacity-50 blur-[160px]" />
      </div>
      <div
        className="pointer-events-none absolute left-1/2 top-[640px] -ml-[300px] -translate-x-1/2"
      >
        <div className="h-80 w-80 rounded-full bg-gradient-to-tr from-blue-500 to-gray-900 opacity-50 blur-[160px]" />
      </div>
    </>
  );
}
