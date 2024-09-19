import { Connection, GetProgramAccountsFilter } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { Keypair, PublicKey } from "@solana/web3.js";
import bs58 from 'bs58';

const QUICKNODE_RPC = 'https://devnet.helius-rpc.com/?api-key=8ade87a5-8bcc-4e23-b90f-958a20fdf64d';
const solanaConnection = new Connection(QUICKNODE_RPC);


const WALLET = Keypair.fromSecretKey(bs58.decode(
    "2YuKN8DhFwRA2yLVeZMx2Dswbcew5Afg2zmDVac6WHhYyn6PyUsAAtAZcHGH3tDdCYeRUwiHuF5PsDzv7kB6p4oS"
));

const walletToQuery = WALLET.publicKey.toString();

console.log(walletToQuery);

async function getTokenAccounts(wallet: string, solanaConnection: Connection) {
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
    const accounts = await solanaConnection.getParsedProgramAccounts(
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
    });
}
getTokenAccounts(walletToQuery, solanaConnection);