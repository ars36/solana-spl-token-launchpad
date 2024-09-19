import React, { useState, createContext, ReactNode, useContext } from "react";
import { PublicKey } from "@solana/web3.js";

interface InitialState {
  isConnected: boolean;
  pubkey: PublicKey | null;
  walletbalance: number;
  setIsConnected: (isConnected: boolean) => void;
  setPubkey: (pubkey: PublicKey | null) => void;
  setWalletBalance: (balance: number) => void;
}

const initialState: InitialState = {
  isConnected: false,
  pubkey: null,
  walletbalance: 0,
  setIsConnected: () => { },
  setPubkey: () => { },
  setWalletBalance: () => { },
};

const UserContext = createContext<InitialState>(initialState);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {

  const [isConnected, setIsConnected] = useState<boolean>(
    initialState.isConnected
  );
  const [pubkey, setPubkey] = useState<PublicKey | null>(
    initialState.pubkey
  );
  const [walletbalance, setWalletBalance] = useState<number>(
    initialState.walletbalance
  );

  return (
    <UserContext.Provider
      value={{
        isConnected,
        pubkey,
        walletbalance,
        setIsConnected,
        setPubkey,
        setWalletBalance,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
