"use client";
const TopLoadingBar = () => {
  return (
    <div className="absolute top-0 left-0 z-10 w-full animate-pulse">
      <div
        className="h-1 bg-gradient-to-r from-cyan-500 to-blue-500 duration-[10000ms] w-0 shadow-2xl shadow-cyan-500"
        id="progressbar"
      ></div>
    </div>
  );
};
export default TopLoadingBar;
