import React, { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  Connection,
  Transaction,
  SystemProgram,
  PublicKey,
  LAMPORTS_PER_SOL,
  clusterApiUrl,
} from "@solana/web3.js";
// import * as U from "./index.styled";
import * as U from "../../pages/utility/index.styled";
import * as S from "../../components/layout/header/index.styled";

const SendTransaction: React.FC = () => {
  const { publicKey, sendTransaction } = useWallet();
  const [recipient, setRecipient] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  const handleSend = async () => {
    if (!publicKey) return;

    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: new PublicKey(recipient),
        lamports: parseFloat(amount) * LAMPORTS_PER_SOL, // Convert SOL to lamports
      })
    );

    try {
      if (!sendTransaction) {
        throw new Error("Wallet does not support sending transactions.");
      }
      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature, "confirmed");
      console.log("Transaction successful:", signature);
    } catch (error) {
      console.error("Transaction failed:", error);
    }
  };

  return (
    <>
      <U.TranInfoItem>
        <p>To</p>
        <input
          type="text"
          placeholder="Recipient Address"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />
      </U.TranInfoItem>
      <U.TranInfoItem>
        <p>Amount</p>
        <input
          type="number"
          placeholder="Amount (SOL)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </U.TranInfoItem>
      <S.LearnButton onClick={handleSend}>Send</S.LearnButton>
    </>
  );
};

export default SendTransaction;
