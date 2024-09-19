import React, { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";
import { useUserContext } from "../../contexts/UserContext";

const WalletBalance: React.FC = () => {
  const { publicKey, connected } = useWallet();
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { walletbalance, setWalletBalance } = useUserContext();

  useEffect(() => {
    const fetchBalance = async () => {
      if (!publicKey) {
        setBalance(null);
        setLoading(false);
        return;
      }

      try {
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        const balance = await connection.getBalance(publicKey);
        setBalance(balance / 1e9); // Convert lamports to SOL
        setWalletBalance(balance / 1e9);
      } catch (error) {
        console.error("Failed to fetch balance:", error);
        setBalance(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, [publicKey]);

  if (loading) {
    return <p>Loading balance...</p>;
  }

  return (
    <div>
      {connected ? (
        <p>
          Balance:{" "}
          {balance !== null
            ? `${balance.toFixed(4)} SOL`
            : "Failed to fetch balance"}
        </p>
      ) : (
        <p>Connect your wallet to see the balance</p>
      )}
    </div>
  );
};

export default WalletBalance;
