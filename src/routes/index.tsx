import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../components/layout";
import Home from "../pages/home";
import MintToken from "../components/section/createTokenPinata";
import WalletProviderComponent from "../components/section/WalletProvider";
// import Token from "../pages/token";
import { PublicKey } from "@solana/web3.js";
import { UserProvider } from "../contexts/UserContext";
import Utility from "../pages/utility";


export const MainRouter = () => {
  return (
    <UserProvider>
      <WalletProviderComponent>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/token" element={<MintToken />} />
              <Route path="/utility" element={<Utility />} />
            </Route>
          </Routes>
        </BrowserRouter></WalletProviderComponent>
    </UserProvider>
  );
};
