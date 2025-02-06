import config from "../config/index.json";
// import Divider from "./Divider";

const Product = () => {
  const { product } = config;
  const [firstItem, secondItem, thirdItem] = product.items;

  return (
    <section className={`bg-background py-8`} id="about">
      <div className={`container max-w-5xl flex flex-col mx-auto m-8`}>
        <h1
          className={`w-full my-2 text-5xl font-bold leading-tight text-center text-primary`}
        >
          <span
            className="text-[#ec4755]"
          >
            About us
          </span>
        </h1>
        <p className="text-xl font-regular text-[#ec4755] text-center">HyperLoc India: Revolutionizing Local Deliveries</p>
        <p className="text-md px-3 text-gray-600 font-semibold text-center">At HyperLoc India, we bridge the gap between local businesses and consumers by providing seamless, fast, and reliable hyperlocal deliveries. Whether it’s food from your favorite restaurant, fresh produce from nearby markets, or essential groceries and medicines, we ensure it reaches you on time.</p>
        {/* <Divider /> */}
        <div className={`flex flex-wrap`}>
          <div className={`w-full sm:w-1/2 p-6 mt-20`}>
            <h3
              style={{ color: "#ec4755" }}
              className={`text-3xl text-gray-800 text-[#ec4755] font-bold leading-none mb-3`}
            >
              💡 Why HyperLoc India?
            </h3>
            <ul className={`text-gray-600 text-lg`}>
              <li className="flex"><p>✅</p><p><strong>Super Fast Delivery –</strong> Get your orders within minutes.</p></li>
              <li className="flex"><p>✅</p><p><strong>No App Needed –</strong> Just place your order via WhatsApp.</p></li>
              <li className="flex"><p>✅</p><p><strong>Wide Range of Products –</strong> From groceries to medicines, we deliver everything.</p></li>
              <li className="flex"><p>✅</p><p><strong>Local Business Friendly –</strong> Supporting local vendors and restaurants.</p></li>
            </ul>
          </div>
          <div
            className={`w-full sm:w-1/2 p-6 flex items-start justify-center`}
          >
            <img
              className="h-[250px] mt-20"
              src="whyhyperloc.jpg"
              alt={firstItem?.title}
            />
          </div>
        </div>
        <div className={`flex flex-wrap-reverse flex-col-reverse sm:flex-row`}>
          <div
            className={`w-full sm:w-1/2 p-6 flex items-start justify-center`}
          >
            <img
              className="h-[250px] mt-20"
              src="/howitworks.png"
              alt={secondItem?.title}
            />
          </div>
          <div className={`w-full sm:w-1/2 p-6 mt-20`}>
            <div className={`align-middle`}>
              <h3
                style={{ color: "#ec4755" }}
                className={`text-3xl text-[#ec4755] font-bold leading-none mb-3`}
              >
                How It Works?
              </h3>
              <ul className={`text-gray-600 text-lg`}>
                <li className="flex"><p>1️⃣</p><p><strong>Browse & Choose –</strong> Check out the available products and services.</p></li>
                <li className="flex"><p>2️⃣</p><p><strong>Order via WhatsApp –</strong> Send us a message with your requirements.</p></li>
                <li className="flex"><p>3️⃣</p><p><strong>Quick Confirmation –</strong> Our team confirms and processes your order.</p></li>
                <li className="flex"><p>4️⃣</p><p><strong>Swift Delivery –</strong> Get your order delivered at your doorstep in no time.</p></li>
              </ul>
            </div>
          </div>
        </div>
        <div className={`flex flex-wrap`}>
          <div className={`w-full sm:w-1/2 p-6 mt-20`}>
            <h3
              style={{ color: "#ec4755" }}
              className={`text-3xl text-gray-800 text-[#ec4755] font-bold leading-none mb-3`}
            >
              What We Deliver?
            </h3>
            <ul className={`text-gray-600 text-lg`}>
              <li className="flex"><p>🍽️</p><span><strong>Restaurant Food –</strong> Your favorite meals from top local eateries.</span></li>
              <li className="flex"><p>🍏</p><span><strong>Groceries & Fresh Produce –</strong> Fresh fruits, vegetables, and essentials.</span></li>
              <li className="flex"><p>🛒</p><span><strong>Daily Needs & Essentials –</strong> Dairy, snacks, beverages, and more.</span></li>
              <li className="flex"><p>💊</p><span><strong>Medicines –</strong> Get pharmacy essentials delivered quickly.</span></li>
            </ul>

          </div>
          <div
            className={`w-full sm:w-1/2 p-6 flex items-start justify-center`}
          >
            <img
              className="mt-20 h-[250px]"
              src="/whatdeliver.jpg"
              alt={thirdItem?.title}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;
