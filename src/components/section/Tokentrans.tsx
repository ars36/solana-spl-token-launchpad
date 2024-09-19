import { getOrCreateAssociatedTokenAccount, createTransferInstruction, } from "@solana/spl-token";
import { Connection, Keypair, ParsedAccountData, PublicKey, sendAndConfirmTransaction, Transaction, GetProgramAccountsFilter } from "@solana/web3.js";
import bs58 from "bs58";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";

// import { useWallet } from "@solana/wallet-adapter-react";
// import { useUserContext } from "../../contexts/UserContext";
import { useState, useEffect } from "react";
import * as U from "../../pages/utility/index.styled"
import * as S from "../../components/layout/header/index.styled"
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

interface WalletToken {
    account: any;
    mint: string;
    tokenbal: number;
}
const Tokentrans = () => {

    const wallet = useWallet();
    const { connection } = useConnection()
    const [decentinationwallet, setDecentinationwallet] = useState<string>("");
    const [amount, setAmount] = useState<number>(0);
    const QUICKNODE_RPC = 'https://devnet.helius-rpc.com/?api-key=8ade87a5-8bcc-4e23-b90f-958a20fdf64d';
    const SOLANA_CONNECTION = new Connection(QUICKNODE_RPC);
    // const decentinationwallet = '51DbASBHawx8kKzxw33w1ecudjLwfieyG4Rza2SxRDmC';
    // const walletTokenMintAddress = '7SywxEouMQbZF2EgK43oMVR11azsReU16uFE8KjZiRHa';
    const FROM_KEYPAIR = Keypair.fromSecretKey(bs58.decode(
        "2YuKN8DhFwRA2yLVeZMx2Dswbcew5Afg2zmDVac6WHhYyn6PyUsAAtAZcHGH3tDdCYeRUwiHuF5PsDzv7kB6p4oS"
    ));

    const walletToQuery = FROM_KEYPAIR.publicKey.toString();
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

    async function getNumberDecimals(mintAddress: string): Promise<number> {
        const info = await SOLANA_CONNECTION.getParsedAccountInfo(new PublicKey(walletTokenMintAddress));
        const result = (info.value?.data as ParsedAccountData).parsed.info.decimals as number;
        return result;
    }
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

    async function sendTokens() {



        if (!wallet.publicKey) {
            console.log("Wallet not connected")
            return
        }

        if (!wallet.signTransaction || !wallet.connected) {
            console.log("Wallet not connected")
            return
        }
        try {
            console.log(`Sending ${amount} ${(walletTokenMintAddress)} from ${(FROM_KEYPAIR.publicKey.toString())} to ${(decentinationwallet)}.`)
            //Step 1
            console.log(`1 - Getting Source Token Account`);
            let sourceAccount = await getOrCreateAssociatedTokenAccount(
                SOLANA_CONNECTION,
                FROM_KEYPAIR,
                new PublicKey(walletTokenMintAddress),
                FROM_KEYPAIR.publicKey
            );
            console.log(`    Source Account: ${sourceAccount.address.toString()}`);
            console.log(`2 - Getting Destination Token Account`);
            let destinationAccount = await getOrCreateAssociatedTokenAccount(
                SOLANA_CONNECTION,
                FROM_KEYPAIR,
                new PublicKey(walletTokenMintAddress),
                new PublicKey(decentinationwallet)
            );
            console.log(`    Destination Account: ${destinationAccount.address.toString()}`);

            //Step 3
            console.log(`3 - Fetching Number of Decimals for Mint: ${walletTokenMintAddress}`);
            const numberDecimals = await getNumberDecimals(walletTokenMintAddress);
            console.log(`    Number of Decimals: ${numberDecimals}`);

            //Step 4
            console.log(`4 - Creating and Sending Transaction`);
            const tx = new Transaction();
            tx.add(createTransferInstruction(
                sourceAccount.address,
                destinationAccount.address,
                FROM_KEYPAIR.publicKey,
                amount * Math.pow(10, numberDecimals)
            ))

            const latestBlockHash = await SOLANA_CONNECTION.getLatestBlockhash('confirmed');
            tx.recentBlockhash = await latestBlockHash.blockhash;
            const signature = await sendAndConfirmTransaction(SOLANA_CONNECTION, tx, [FROM_KEYPAIR]);


            const signedTransaction = await wallet.signTransaction(tx)
            const sendTransaction = await wallet.sendTransaction(signedTransaction, connection);
            await connection.confirmTransaction(sendTransaction);


            console.log(
                '\x1b[32m', //Green Text
                `   Transaction Success!🎉`,
                `\n    https://explorer.solana.com/tx/${signature}?cluster=devnet`
            );
            alert(`Transaction Success!🎉`);
        } catch (error) {
            console.log("Transfer Token:", error)
        }
    }

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

                <p>To</p>
                <input
                    type="text"
                    placeholder="Receiver address"
                    value={decentinationwallet}
                    onChange={(e) => setDecentinationwallet(e.target.value)}
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
            <S.LearnButton onClick={sendTokens}>SEND</S.LearnButton>
        </div>
    );
}



export default Tokentrans;



