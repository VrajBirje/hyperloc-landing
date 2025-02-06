import "../index.css"
import config from "../config/index.json";

const MainHero = () => {
  const { mainHero } = config;
  return (
    <main className="mt-20 mx-auto 
    //max-w-7xl 
    px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28 w-full h-[100%]">
      <div style={{ background: "white", zIndex: "999" }} className="sm:text-center lg:text-center h-auto flex flex-col items-center">
        <h1 className="text-4xl tracking-normal font-extrabold text-gray-900 sm:text-5xl md:text-5xl">
          <span className="block xl:inline" style={{textAlign:'center'}}>{mainHero.title}</span>{" "}
        </h1>
        <h1 className="text-2xl mt-7  sm:mt-7 tracking-normal font-bold text-gray-900 sm:text-5xl md:text-3xl">
          <span className={`block text-[#ec4755] xl:inline`} style={{textAlign:'center'}}>
            {mainHero.subtitle}
          </span>
        </h1>
        <p style={{textAlign:'center'}} className="mt-7 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
          {mainHero.description}
        </p>
        <div className="mt-8 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
          <div className="button2 text-white-900 rounded-md shadow bg-[#ec4755]">
            <a
              href={mainHero.primaryAction.href}
              style={{ background: "#ec4755", color: "white" }}
              className={`w-full button2 flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-background bg-[#ec4755] hover:bg-border hover:text-[#ec4755] md:py-4 md:text-lg md:px-10 text-white-900`}
            >
              {mainHero.primaryAction.text}
            </a>
          </div>
          <div className="mt-7 sm:mt-0 sm:ml-3">
            <a
              href={mainHero.secondaryAction.href}
              className={`w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md border-primary text-secondary bg-background hover:bg-border hover:text-[#ec4755] md:py-4 md:text-lg md:px-10`}
            >
              {mainHero.secondaryAction.text}
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainHero;
