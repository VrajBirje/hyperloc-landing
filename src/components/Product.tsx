import config from "../config/index.json";

const Product = () => {
  const { product } = config;
  const [firstItem, secondItem, thirdItem] = product.items;

  return (
    <section className={`bg-background py-8`} id="App">
      <div className={`container max-w-5xl mx-auto m-8`}>
        <h1
          className={`w-full px-3 my-2 text-5xl font-bold leading-tight text-center text-primary`}
        >
          {product.title.split(" ").map((word, index) => (
            <span
              key={index}
              className={index % 2 ? "text-[#ec4755]" : "text-border"}
            >
              {word}{" "}
            </span>
          ))}
        </h1>
        {/* <Divider /> */}
        <div className={`flex flex-wrap`}>
          <div className={`w-5/6 sm:w-1/2 p-6 mt-20`}>
            <h3
              style={{ color: "#ec4755" }}
              className={`text-3xl text-gray-800 text-[#ec4755] font-bold leading-none mb-3`}
            >
              {firstItem?.title}
            </h3>
            <p className={`text-gray-600`}>{firstItem?.description}</p>
          </div>
          <div
            className={`w-full sm:w-1/2 p-6 flex items-start justify-center`}
          >
            <img
              className="h-4/6 mt-20"
              src={firstItem?.img}
              alt={firstItem?.title}
            />
          </div>
        </div>
        <div className={`flex flex-wrap flex-col-reverse sm:flex-row`}>
          <div
            className={`w-full sm:w-1/2 p-6 flex items-start justify-center`}
          >
            <img
              className="h-[400px]"
              src={secondItem?.img}
              alt={secondItem?.title}
            />
          </div>
          <div className={`w-full sm:w-1/2 p-6`}>
            <div className={`align-middle`}>
              <h3
                style={{ color: "#ec4755" }}
                className={`text-3xl text-[#ec4755] font-bold leading-none mb-3`}
              >
                {secondItem?.title}
              </h3>
              <p className={`text-gray-600 mb-8`}>{secondItem?.description}</p>
            </div>
          </div>
        </div>
        <div className={`flex flex-wrap`}>
          <div className={`w-5/6 sm:w-1/2 p-6 mt-20`}>
            <h3
              style={{ color: "#ec4755" }}
              className={`text-3xl text-gray-800 text-[#ec4755] font-bold leading-none mb-3`}
            >
              {thirdItem?.title}
            </h3>
            <p className={`text-gray-600`}>{thirdItem?.description}</p>
          </div>
          <div
            className={`w-full sm:w-1/2 p-6 flex items-start justify-center`}
          >
            <img
              className="h-4/6 mt-20"
              src={thirdItem?.img}
              alt={thirdItem?.title}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;
