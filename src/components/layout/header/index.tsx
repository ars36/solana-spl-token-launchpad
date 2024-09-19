// import { useWallet } from "@solana/wallet-adapter-react";
// import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import WalletProviderComponent from "../../section/WalletProvider";
import WalletInfo from "../../section/WalletInfo";
import WalletBalance from "../../section/WalletBalance";
import * as S from "./index.styled";

const Header = () => {
  return (
    <S.HeaderMainContainer>
      <S.MainContainer>
        <Link to="/">
          <S.Title>P3PERLA</S.Title>
        </Link>
        {/* <WalletProviderComponent> */}
        <WalletInfo />
        <WalletBalance />
        <WalletMultiButton />
        {/* </WalletProviderComponent> */}
      </S.MainContainer>
    </S.HeaderMainContainer>
  );
};

export default Header;
