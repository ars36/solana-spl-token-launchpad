import { TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID, MintLayout, AuthorityType } from '@solana/spl-token';
import * as Token from '@solana/spl-token';
import { Connection, PublicKey, Transaction, SystemProgram, Keypair, TransactionInstruction } from '@solana/web3.js';
import { WalletContextState } from "@solana/wallet-adapter-react";
import { useWallet } from '@solana/wallet-adapter-react';
import { useConnection } from '@solana/wallet-adapter-react';
import bs58 from 'bs58';
import * as S from "../layout/header/index.styled"


const RevokeFreeze = () => {

    const wallet = useWallet();
    const { connection } = useConnection()
    const WALLET = Keypair.fromSecretKey(bs58.decode(
        "2YuKN8DhFwRA2yLVeZMx2Dswbcew5Afg2zmDVac6WHhYyn6PyUsAAtAZcHGH3tDdCYeRUwiHuF5PsDzv7kB6p4oS"
    ));
    const QUICKNODE_RPC = 'https://devnet.helius-rpc.com/?api-key=8ade87a5-8bcc-4e23-b90f-958a20fdf64d';
    const SOLANA_CONNECTION = new Connection(QUICKNODE_RPC);
    const MINT_ADDRESS = '7SywxEouMQbZF2EgK43oMVR11azsReU16uFE8KjZiRHa'; // USDC-Dmint addresscon
    const mintaddress = new PublicKey(MINT_ADDRESS);

    async function revokeFreezeAuthority(
        connection: Connection,
        wallet: WalletContextState,
        mintAddress: PublicKey,
    ) {
        if (wallet.publicKey != null) {
            const transaction = new Transaction();
            // Token.create
            transaction.add(Token.createSetAuthorityInstruction(mintAddress, wallet.publicKey, AuthorityType.FreezeAccount, null));

            transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
            transaction.feePayer = wallet.publicKey;
            if (wallet.signTransaction != undefined) {
                try {
                    let signTX = await wallet.signTransaction(transaction);
                    const signature = await connection.sendRawTransaction(signTX.serialize());
                    console.log("signature ====>", signature);
                } catch (err) {
                    console.log("revoking error ====>", err);
                }
            }
        }
    }
    const revokeFreeze = () => {
        revokeFreezeAuthority(SOLANA_CONNECTION, wallet, mintaddress)
    }


    return (
        <S.LearnButton onClick={revokeFreeze}>Revoke Freeze authority</S.LearnButton>
    )



}


export default RevokeFreeze;