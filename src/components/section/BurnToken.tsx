import React, { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useConnection } from '@solana/wallet-adapter-react';
import { Keypair, Connection, PublicKey, TransactionSignature, GetProgramAccountsFilter } from '@solana/web3.js';
import { createBurnCheckedInstruction, getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import bs58 from 'bs58';
import { TransactionMessage, VersionedTransaction } from '@solana/web3.js';
import * as U from "../../pages/utility/index.styled"
import * as S from "../layout/header/index.styled"


// Your `BurnToken` component

interface WalletToken {
    account: any;
    mint: string;
    tokenbal: number;
}

const BurnToken = () => {
    const wallet = useWallet();
    const { connection } = useConnection()

    const [amount, setAmount] = useState<number>(0);

    const WALLET = Keypair.fromSecretKey(bs58.decode(
        "2YuKN8DhFwRA2yLVeZMx2Dswbcew5Afg2zmDVac6WHhYyn6PyUsAAtAZcHGH3tDdCYeRUwiHuF5PsDzv7kB6p4oS"
    ));
    const QUICKNODE_RPC = 'https://devnet.helius-rpc.com/?api-key=8ade87a5-8bcc-4e23-b90f-958a20fdf64d';
    const SOLANA_CONNECTION = new Connection(QUICKNODE_RPC);
    // const MINT_ADDRESS = '7SywxEouMQbZF2EgK43oMVR11azsReU16uFE8KjZiRHa'; // USDC-Dev mint address
    const MINT_DECIMALS = 8; // Number of decimals for the mint

    const walletToQuery = WALLET.publicKey.toString();
    // const [walletTokenAccount, setWalletTokenAccount] = useState<any>();
    const [walletTokenMintAddress, setWalletTokenMintAddress] = useState<String>("");
    const [walletTokenBalance, setWalletTokenBalance] = useState<Number>(0);
    // const [walletTokens, setWalletTokens] = useState<Array<any>>();
    const [walletTokens, setWalletTokens] = useState<WalletToken[]>([]);
    const tempWalletToken: WalletToken[] = [];

    async function getTokenAccounts(wallet: string, SOLANA_CONNECTION: Connection) {
        const filters: GetProgramAccountsFilter[] = [
            {
                dataSize: 165,    //size of account (bytes)
            },
            {
                memcmp: {
                    offset: 32,     //location of our query in the account (bytes)
                    bytes: wallet,  //our search criteria, a base58 encoded string
                },
            }];


        const accounts = await SOLANA_CONNECTION.getParsedProgramAccounts(
            TOKEN_PROGRAM_ID, //new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA")
            { filters: filters }
        );
        console.log(`Found ${accounts.length} token account(s) for wallet ${wallet}.`);
        accounts.forEach((account, i) => {
            //Parse the account data
            const parsedAccountInfo: any = account.account.data;
            const mintAddress: string = parsedAccountInfo["parsed"]["info"]["mint"];
            const tokenBalance: number = parsedAccountInfo["parsed"]["info"]["tokenAmount"]["uiAmount"];
            //Log results
            console.log(`Token Account No. ${i + 1}: ${account.pubkey.toString()}`);
            console.log(`--Token Mint: ${mintAddress}`);
            console.log(`--Token Balance: ${tokenBalance}`);

            // setWalletTokens()
            tempWalletToken.push({ account: account.pubkey.toString(), mint: mintAddress, tokenbal: tokenBalance });
            console.log(tempWalletToken);
            setWalletTokens(tempWalletToken);
            console.log(walletTokens)

        });
    }

    getTokenAccounts(walletToQuery, SOLANA_CONNECTION);

    // Function to confirm the transaction
    async function confirmTransaction(
        connection: Connection,
        signature: TransactionSignature,
        desiredConfirmationStatus: 'confirmed' | 'finalized' = 'confirmed',
        timeout: number = 30000,
        pollInterval: number = 1000
    ): Promise<void> {
        const start = Date.now();

        while (Date.now() - start < timeout) {
            const { value: statuses } = await connection.getSignatureStatuses([signature]);

            if (!statuses || statuses.length === 0) {
                throw new Error('Failed to get signature status');
            }

            const status = statuses[0];

            if (status === null) {
                await new Promise(resolve => setTimeout(resolve, pollInterval));
                continue;
            }

            if (status.err) {
                throw new Error(`Transaction failed: ${JSON.stringify(status.err)}`);
            }

            if (status.confirmationStatus && status.confirmationStatus === desiredConfirmationStatus) {
                return;
            }

            if (status.confirmationStatus === 'finalized') {
                return;
            }

            await new Promise(resolve => setTimeout(resolve, pollInterval));
        }

        throw new Error(`Transaction confirmation timeout after ${timeout}ms`);
    }

    // Function to burn tokens
    const burnTokens = async () => {

        if (!wallet.publicKey) {
            console.log("Wallet not connected")
            return
        }

        if (!wallet.signTransaction || !wallet.connected) {
            console.log("Wallet not connected")
            return
        }
        try {
            console.log(`Attempting to burn ${amount} tokens from Wallet: ${WALLET.publicKey.toString()}`);

            // Step 1 - Fetch Associated Token Account Address
            const account = await getAssociatedTokenAddress(new PublicKey(walletTokenMintAddress), WALLET.publicKey);

            // Step 2 - Create Burn Instructions
            const burnIx = createBurnCheckedInstruction(
                account,
                new PublicKey(walletTokenMintAddress),
                WALLET.publicKey,
                amount * (10 ** MINT_DECIMALS),
                MINT_DECIMALS
            );

            // Step 3 - Fetch Blockhash
            const { blockhash, lastValidBlockHeight } = await SOLANA_CONNECTION.getLatestBlockhash('finalized');

            // Step 4 - Assemble Transaction
            const messageV0 = new TransactionMessage({
                payerKey: WALLET.publicKey,
                recentBlockhash: blockhash,
                instructions: [burnIx]
            }).compileToV0Message();

            const transaction = new VersionedTransaction(messageV0);
            transaction.sign([WALLET]);

            // Step 5 - Execute & Confirm Transaction
            const txid = await SOLANA_CONNECTION.sendTransaction(transaction);
            console.log("Transaction sent to network");

            await confirmTransaction(SOLANA_CONNECTION, txid);

            const signedTransaction = await wallet.signTransaction(transaction)
            const sendTransaction = await wallet.sendTransaction(signedTransaction, connection);
            await connection.confirmTransaction(sendTransaction);
            console.log('🔥 SUCCESSFUL BURN!🔥', '\n', `https://explorer.solana.com/tx/${txid}?cluster=devnet`);
        } catch (error) {
            console.error('❌ Error burning tokens:', error);
        }
    };


    const handleTokenSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedMint = event.target.value;
        const selectedTokenData = walletTokens.find(token => token.mint === selectedMint);
        if (selectedTokenData) {
            setWalletTokenMintAddress(selectedMint);
            setWalletTokenBalance(selectedTokenData.tokenbal);
        }
    };

    useEffect(() => {
        // setWalletTokenMintAddress(selectedMint);
        setWalletTokenBalance(walletTokenBalance);
    }, [walletTokens])

    return (
        <div>
            <h2>TOKEN</h2>
            <U.TranInfoItem>
                <p>Mint</p>
                <select value={`${walletTokenMintAddress}`} onChange={handleTokenSelect}>
                    {walletTokens.map(token => (
                        <option key={token.mint} value={token.mint}>{token.mint}</option>
                    ))}
                </select>
            </U.TranInfoItem>
            <U.TranInfoItem>
                <p>Balance</p>
                <input
                    type="name"
                    value={`${walletTokenBalance}`}
                    readOnly
                />
            </U.TranInfoItem>
            <U.TranInfoItem>
                <p>Amount</p>
                <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                />
            </U.TranInfoItem>
            <S.LearnButton onClick={burnTokens}>BURN</S.LearnButton>
        </div>
    );
}

export default BurnToken;
