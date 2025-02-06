import { useNavigate } from "react-router-dom";

const Partner = () => {
    const navigate = useNavigate();

    return (
        <section id="Partners" className="flex flex-col items-center">
            <h1 className="text-center font-bold text-5xl text-[#ec4755]">Partner with us</h1>
            <p className="px-3 font-semibold text-gray-600 text-md text-center mt-8">
                Are you a restaurant, store, or local business looking to expand your reach? Join HyperLoc India and start delivering to more customers effortlessly!
            </p>
            <div className="flex items-center justify-center mt-8">
                <img src="/partner2.png" className="w-[200px] mr-3 sm:block hidden" alt="Partner with us" />
                <ul>
                    <li className="text-[#ec4755] font-semibold text-xl">💡 Benefits of Partnering with Us:</li>
                    <li className="mt-2 text-gray-600 font-semibold text-md">✔ Increased Sales & Visibility</li>
                    <li className="text-gray-600 font-semibold text-md">✔ Hassle-free Delivery Network</li>
                    <li className="text-gray-600 font-semibold text-md">✔ Customer Support & Order Management</li>
                </ul>
            </div>
            <div className="w-full flex sm:flex-row flex-col items-center px-5 sm:px-20 gap-5 mt-20 gap-10">
                <div className="flex w-full sm:w-[50%] gap-5 p-5 border border-gray-600 rounded-xl">
                    <img className="w-[170px] h-[180px]" src="/seller.jpg" alt="Become a Seller" />
                    <div className="flex flex-col items-start gap-3 justify-center">
                        <p className="text-xl font-bold text-[#ec4755]">Become a Seller</p>
                        <p className="text-sm text-gray-600 font-semibold">
                            Register as a seller & open a shop in HyperLoc to start your business.
                        </p>
                        <button
                            className="cursor-pointer bg-[#ec4755] px-5 py-2 text-white rounded-md text-md"
                            onClick={() => navigate("/vendor")}
                        >
                            Register
                        </button>
                    </div>
                </div>
                <div className="flex w-full sm:w-[50%] gap-5 p-5 border border-gray-600 rounded-xl">
                    <img className="w-[170px] h-[180px]" src="/deliveryman.jpg" alt="Become a Delivery Man" />
                    <div className="flex flex-col items-start gap-3 justify-center">
                        <p className="text-xl font-bold text-[#ec4755]">Become a Delivery Man</p>
                        <p className="text-sm text-gray-600 font-semibold">Register as a delivery partner and earn money.</p>
                        <button
                            className="cursor-pointer bg-[#ec4755] px-5 py-2 text-white rounded-md text-md"
                            onClick={() => navigate("/deliveryman")}
                        >
                            Register
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Partner;
