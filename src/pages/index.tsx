import About from "../components/About";
// import Analytics from "../components/Analytics";
import Canvas from "../components/Canvas";
import Features from "../components/Features";
import Header from "../components/Header";
import LazyShow from "../components/LazyShow";
import MainHero from "../components/MainHero";
import Partner from "../components/partner";
import Pricing from "../components/Pricing";
// import Pricing from '../components/Pricing';
import Product from "../components/Product";

const Home = () => {
  return (
    <div className={`bg-background grid gap-y-16 overflow-hidden`}>
      <div className={`relative bg-background h-[100vh]`}>
        <div className="max-w-7xl mx-auto ">
          <div
            style={{ background: "white", zIndex: "999" }}
            className={`outer relative z-10 md:h-[100vh] bg-background w-full`}
          >
            <Header />
            <MainHero />
          </div>
        </div>
        {/* <MainHeroImage /> */}
      </div>
      <Canvas />
      <LazyShow>
        <>
          <Partner/>
          <Canvas />
        </>
      </LazyShow>
      <LazyShow>
        <>
          <Product />
          <Canvas />
        </>
      </LazyShow>
      <LazyShow>
        <>
          <Features />
          <Canvas />
          <Pricing />
          {/* <Timeline /> */}
        </>
      </LazyShow>
      <LazyShow>
        <>
          <Canvas />
          <About />
        </>
      </LazyShow>
      {/* <Analytics /> */}
    </div>
  );
};

export default Home;
