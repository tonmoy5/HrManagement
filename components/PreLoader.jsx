const Preloader = () => {
  return (
    <div id="loader" className="loader-wrap">
      <svg viewBox="0 0 1000 1000" preserveAspectRatio="none">
        <path id="svg" d="M0 2S175 1 500 1s500 1 500 1V0H0Z"></path>
      </svg>
      <div id="loader-text" className="loader-wrap-heading ">
        <span>
          <h2 className="load-text ">
            <span>L</span>
            <span>o</span>
            <span>a</span>
            <span>d</span>
            <span>i</span>
            <span>n</span>
            <span>g</span>
          </h2>
        </span>
      </div>
    </div>
  );
};

export default Preloader;
