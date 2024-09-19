import { Keypair, PublicKey, SystemProgram, Transaction, ComputeBudgetProgram, Connection } from '@solana/web3.js';
import {
    createAssociatedTokenAccountInstruction, createInitializeMintInstruction, createMintToInstruction,
    getAssociatedTokenAddress, getMinimumBalanceForRentExemptMint, MintLayout, TOKEN_PROGRAM_ID
} from '@solana/spl-token';
import { PROGRAM_ID, DataV2, createCreateMetadataAccountV3Instruction } from '@metaplex-foundation/mpl-token-metadata';
import axios from 'axios';
import FormData from 'form-data';
import React, { useState } from "react";
import * as T from "../../pages/token/index.styled";
import * as S from "../../components/layout/header/index.styled";
import { useUserContext } from "../../contexts/UserContext";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { BN } from 'bn.js';


interface Extension {
    website?: string
    twitter?: string
    telegram?: string
}

interface Creator {
    name: string
    site: string
}
interface UserToken {
    name: string
    symbol: string
    decimals: number
    description: string
    uiAmount: number
    image: string
    extensions?: Extension
    tags?: string[]
    creator?: Creator
    mainKp: string
    solAmount: number
    tokenAmountToPutInPool: number
}

interface Metadata {
    name: string
    symbol: string
    description: string
    decimals: number
    image: string
    extensions?: Extension
    tags?: string[]
    creator?: Creator
}



// const cluster = "devnet";
const pinataApiKey = "b0f6ea9dcbd5ce5ae539";
const pinataSecretApiKey = "d00ca5913d8a14b9e16df98797fc32e08157e31667f88659e0cf6f157264e260"
// const connection = new Connection(clusterApiUrl(cluster), "confirmed");
const secret = "2YuKN8DhFwRA2yLVeZMx2Dswbcew5Afg2zmDVac6WHhYyn6PyUsAAtAZcHGH3tDdCYeRUwiHuF5PsDzv7kB6p4oS";




const MintToken = () => {

    const globalContext = useUserContext();
    const wallet = useWallet();
    const { connection } = useConnection()
    console.log("globalContext:", globalContext)
    const [tname, setTname] = useState<string>("");
    const [tsymbol, setTsymbol] = useState<string>("");
    const [tdescription, setTdescription] = useState<string>("");
    const [tamount, setTamount] = useState<number>(0);
    const [tdecimal, setTdecimal] = useState<number>(8);
    const [tfile, setTfile] = useState<File | null>(null);

    const [image, setImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    if (!wallet.connect) {
        console.log("Wallet not connected")
        return
    }
    if (wallet.publicKey == null) {
        console.log("Wallet not connected")
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setImage(file);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };
    const handleRemoveImage = () => {
        setImage(null);
        setPreviewUrl(null);
    };

    const handleMint = async () => {
        // Construct the UserToken object using state value


        if (!wallet.publicKey) {
            console.log("Wallet not connected")
            return
        }

        if (!wallet.signTransaction || !wallet.connected) {
            console.log("Wallet not connected")
            return
        }

        if (!tfile) {
            console.log("Please select image to upload")
            return
        }
        try {
            // console.log("hello");
            const token: UserToken = {
                name: tname,
                symbol: tsymbol,
                description: tdescription,
                decimals: tdecimal,
                uiAmount: tamount,
                image: "",
                mainKp: secret,
                solAmount: 0,
                tokenAmountToPutInPool: 0
            };

            const result = await createTokenWithMetadata(token, connection, wallet.publicKey, tfile);

            if (!result) {
                console.log("Failed to create token.")
                return
            }

            const signedTransaction = await wallet.signTransaction(result)
            const sendTransaction = await wallet.sendTransaction(signedTransaction, connection);
            await connection.confirmTransaction(sendTransaction);
            console.log("Token created successfully");
        } catch (error) {
            console.log("Mint TokenError:", error)
        }
    };

    return (
        <T.TokenBodyContainer>
            {globalContext.isConnected ? (
                <T.TokenMainContainer>
                    <T.TokenUpSide>
                        <T.TokenUpLeftSide>
                            <T.IMAGE>
                                <img
                                    src={previewUrl || null}
                                    alt="Selected"
                                    style={{ width: '200px', height: 'auto', marginTop: '10px' }}
                                />
                                <button onClick={handleRemoveImage} style={{ marginTop: '10px' }}>
                                    Remove Image
                                </button>
                            </T.IMAGE>
                            <div>
                                <input type="file" onChange={handleFileChange} />
                            </div>
                        </T.TokenUpLeftSide>
                        <T.TokenUpRightSide>
                            <T.TokenInfoItem>
                                {" "}
                                <h2>Name</h2>
                                <input
                                    type="text"
                                    placeholder="Token Name"
                                    value={tname}
                                    onChange={(e) => setTname(e.target.value)}
                                />
                            </T.TokenInfoItem>
                            <T.TokenInfoItem>
                                <h2>Symbal</h2>
                                <input
                                    type="text"
                                    placeholder="Token Symbol"
                                    value={tsymbol}
                                    onChange={(e) => setTsymbol(e.target.value)}
                                />
                            </T.TokenInfoItem>
                            <T.TokenInfoItem>
                                <h2>Decimal</h2>
                                <input
                                    type="number"
                                    placeholder="Decimal"
                                    value={tdecimal}
                                    onChange={(e) => setTdecimal(Number(e.target.value))}
                                />
                            </T.TokenInfoItem>
                            <T.TokenInfoItem>
                                <h2>Amount</h2>
                                <input
                                    type="number"
                                    placeholder="Amount"
                                    value={tamount}
                                    onChange={(e) => setTamount(Number(e.target.value))}
                                />
                            </T.TokenInfoItem>
                        </T.TokenUpRightSide>
                    </T.TokenUpSide>
                    <T.TokenDownSide>
                        <T.TokenInfoItem>
                            <h2>Description</h2>
                            <textarea
                                name="Description"
                                placeholder="Say something about the token here"
                                rows={5}
                                value={tdescription}
                                onChange={(e) => setTdescription(e.target.value)}
                            />
                        </T.TokenInfoItem>
                        <S.LearnButton onClick={handleMint} >MINT</S.LearnButton>
                    </T.TokenDownSide>
                </T.TokenMainContainer>
            ) : (
                <p>Please connect your wallet to access this content.</p>
            )}
        </T.TokenBodyContainer>

        // <p>token</p>
    );
};

const uploadToIPFS = async (file: File) => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    const data = new FormData();

    data.append('file', file);

    const res = await axios.post(url, data, {
        maxContentLength: Infinity,
        headers: {
            'Content-Type': `multipart/form-data`,
            'pinata_api_key': pinataApiKey,
            'pinata_secret_api_key': pinataSecretApiKey
        }
    });

    return res.data.IpfsHash;
};

const uploadMetadata = async (metadata: object) => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    const res = await axios.post(url, metadata, {
        headers: {
            'pinata_api_key': pinataApiKey,
            'pinata_secret_api_key': pinataSecretApiKey
        }
    });
    return res.data.IpfsHash;
};


const createTokenWithMetadata = async (token: UserToken, connection: Connection, wallet: PublicKey, file: File) => {
    try {
        const { name, symbol, description, decimals, uiAmount } = token

        const imageHash = await uploadToIPFS(file);
        console.log(`Image link: https://gateway.pinata.cloud/ipfs/${imageHash}`)

        // Prepare metadata
        const metadata: Metadata = {
            name,
            symbol,
            description,
            decimals,
            image: `https://gateway.pinata.cloud/ipfs/${imageHash}`,
        };

        if (token.extensions)
            metadata.extensions = token.extensions
        if (token.tags)
            metadata.tags = token.tags
        if (token.creator)
            metadata.creator = token.creator
        // Upload metadata to IPFS
        const metadataHash = await uploadMetadata(metadata);
        const metadataUri = `https://gateway.pinata.cloud/ipfs/${metadataHash}`;
        console.log(`Metadata uploaded: ${metadataUri}`);

        const mint_rent = await getMinimumBalanceForRentExemptMint(connection)
        const mintKp = Keypair.generate()
        const mint = mintKp.publicKey
        const tokenAta = await getAssociatedTokenAddress(mint, wallet)
        const [metadataPDA] = await PublicKey.findProgramAddress(
            [
                Buffer.from("metadata"),
                PROGRAM_ID.toBuffer(),
                mint.toBuffer(),
            ], PROGRAM_ID
        );

        const amount = BigInt(new BN(uiAmount).mul(new BN(10 ** decimals)).toString())
        const tokenMetadata: DataV2 = {
            name: name,
            symbol: symbol,
            uri: metadataUri,
            sellerFeeBasisPoints: 0,
            creators: null,
            collection: null,
            uses: null
        };
        const transaction = new Transaction().add(
            ComputeBudgetProgram.setComputeUnitPrice({
                microLamports: 60_000,
            }),
            ComputeBudgetProgram.setComputeUnitLimit({
                units: 200_000,
            }),
            SystemProgram.createAccount({
                fromPubkey: wallet,
                newAccountPubkey: mint,
                space: MintLayout.span,
                lamports: mint_rent,
                programId: TOKEN_PROGRAM_ID,
            }),
            createInitializeMintInstruction(mint, decimals, wallet, wallet),
            createAssociatedTokenAccountInstruction(wallet, tokenAta, wallet, mint),
            createMintToInstruction(mint, tokenAta, wallet, amount),
            createCreateMetadataAccountV3Instruction(
                {
                    metadata: metadataPDA,
                    mint: mint,
                    mintAuthority: wallet,
                    payer: wallet,
                    updateAuthority: wallet,
                },
                {
                    createMetadataAccountArgsV3: {
                        data: tokenMetadata,
                        isMutable: true,
                        collectionDetails: null
                    }
                }
            )
        )
        transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash
        transaction.feePayer = wallet
        transaction.sign(mintKp)
        return transaction


        // console.log(await connection.simulateTransaction(transaction))
        // const sig = await sendAndConfirmTransaction(connection, transaction, [payer, mintKp], { skipPreflight: true, commitment: "finalized" })
        // console.log(`Token is created: https://solscan.io/tx/${sig}${cluster == "devnet" ? "?cluster=devnet" : ""}`)
        // console.log(`Token contract link: https://solscan.io/token/${mint}${cluster == "devnet" ? "?cluster=devnet" : ""}`)
        // return { mint, amount }
    } catch (error) {
        console.log("Create token error: ", error)
        return
    }
};

export default MintToken;