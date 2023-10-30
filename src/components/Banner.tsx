const Banner = () => {
  return (
    <div className="my-10 w-11/12 mx-auto">
      <div className="bg-bannerBgColor border border-gray-500 rounded-lg p-5">
        <h2 className="inline-block text-2xl xl:text-3xl text-blue-900 font-semibold border-b-4 pb-2 border-yellowbtn">
          Quickly Find A Domestic Helper, Nanny or Driver
        </h2>

        <div className="my-3">
          <p className="lg:text-lg text-gray-500">
            Thousand of domestic workers, helpers or maids are looking now for
            new employers, we help them to directly connect with you. We are
            proud to never charge any helpers or candidates. Select your region
            and get full access to the best domestic helpers!
          </p>
        </div>
        {/* image */}
      </div>
    </div>
  );
};

export default Banner;
