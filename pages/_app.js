import "../styles/globals.css";
require("dotenv").config()
//INTRNAL IMPORT
import { NavBar,Footer } from "../components/componentsindex";
import { NFTMarketplaceProvider } from "@/context/NFTMarketPlaceContext";
const MyApp = ({ Component, pageProps }) => (
  <div>
    <NFTMarketplaceProvider>
    <NavBar />
    <Component {...pageProps} />
    <Footer/>
    </NFTMarketplaceProvider>
  </div>
);

export default MyApp;
