import React, { useEffect } from "react";
import { useUserContext } from "../../contexts/UserContext";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";

const WalletInfo: React.FC = () => {
  const { publicKey, connected } = useWallet();
  const { setIsConnected, setPubkey } = useUserContext();

  useEffect(() => {
    setIsConnected(connected);
    if (!publicKey) {
      console.log("Wallet not connected")

    } else {
      setPubkey(publicKey);
    }
  }, [connected]);

  return (
    <div>
      {!connected || !publicKey ? (
        <p>No wallet connected</p>
      ) : (
        <p>Connected wallet address: {publicKey.toBase58()}</p>
      )}
    </div>
  );
};

export default WalletInfo;
