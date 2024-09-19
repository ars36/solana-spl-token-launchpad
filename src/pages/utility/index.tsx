import * as U from "./index.styled";
import * as S from "../../components/layout/header/index.styled";
// import React, { useState, useEffect } from "react";
// import { useWallet } from "@solana/wallet-adapter-react";
import SendTransaction from "../../components/section/SendTransaction";
import WalletProviderComponent from "../../components/section/WalletProvider";
import Tokentrans from "../../components/section/Tokentrans";
import BurnToken from "../../components/section/BurnToken";
import { useUserContext } from "../../contexts/UserContext";
import RevokeMintAuthority from "../../components/section/RevokeMint";
import RevokeFreeze from "../../components/section/RevokeFreezeAutority";


const Utility = () => {
  const globalContext = useUserContext();
  return (
    <U.UtilBodyContainer>
      {globalContext.isConnected ? (
        <U.UtilMainCotainer>
          <U.UtilBottomSide>
            <U.UtilLeftSide>
              <h2>TRANSFER SOL</h2>
              <WalletProviderComponent>
                <SendTransaction />
              </WalletProviderComponent>
            </U.UtilLeftSide>
            <U.UtilRightDown>
              <U.UtilRightUp>
                <Tokentrans />
                <BurnToken />
              </U.UtilRightUp>
              <U.UtilRightDown>
                <RevokeMintAuthority />
                <RevokeFreeze />
                {/* <S.LearnButton onClick={() => { revokeFreezeAuthority }}>Revoke freeze authority</S.LearnButton> */}
              </U.UtilRightDown>
            </U.UtilRightDown>
          </U.UtilBottomSide>
        </U.UtilMainCotainer>
      ) : (
        <p>Please connect your wallet to access this content.</p>
      )}
    </U.UtilBodyContainer>
  );
};

export default Utility;
