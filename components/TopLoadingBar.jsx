"use client";
const TopLoadingBar = () => {
  return (
    <div className="absolute top-0 left-0 z-10 w-full">
      <div
        className="h-1 bg-gradient-to-r from-red-500 to-red-600 duration-[10000ms] w-0"
        id="progressbar"
      ></div>
    </div>
  );
};
export default TopLoadingBar;
