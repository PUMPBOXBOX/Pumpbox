import { web3, Program, Provider, Wallet } from '@project-serum/anchor';
import { PublicKey, Keypair, Connection } from '@solana/web3.js';
import { TokenState } from '../target/types/pump_box';

export async function deployPumpBox() {
    // Initialize connection and wallet
    const connection = new Connection('https://api.devnet.solana.com');
    const wallet = new Wallet(Keypair.generate());
    const provider = new Provider(connection, wallet, {
        commitment: 'confirmed',
    });

    // Deploy program
    console.log('Deploying PUMP.BOX program...');
    const programId = new PublicKey('your_program_id');
    const program = new Program(IDL, programId, provider);

    // Initialize platform configuration
    console.log('Initializing platform configuration...');
    const platformConfig = Keypair.generate();
    await program.rpc.initialize({
        accounts: {
            config: platformConfig.publicKey,
            authority: wallet.publicKey,
            systemProgram: web3.SystemProgram.programId,
        },
        signers: [platformConfig],
    });

    // Set up AI service configuration
    console.log('Configuring AI service...');
    await program.rpc.configureAiService(
        'https://api.pump.box/ai',
        {
            accounts: {
                config: platformConfig.publicKey,
                authority: wallet.publicKey,
            },
        }
    );

    // Initialize bonding curve parameters
    console.log('Setting up bonding curve...');
    await program.rpc.initializeBondingCurve(
        {
            initialPrice: new web3.BN(4000), // $4000 initial market cap
            kingThreshold: new web3.BN(30000), // $30,000 King of the Hill threshold
            graduationThreshold: new web3.BN(69000), // $69,000 Raydium graduation threshold
        },
        {
            accounts: {
                config: platformConfig.publicKey,
                authority: wallet.publicKey,
            },
        }
    );

    // Set up reward pool
    console.log('Initializing reward pool...');
    const rewardPool = Keypair.generate();
    await program.rpc.initializeRewardPool(
        {
            accounts: {
                rewardPool: rewardPool.publicKey,
                config: platformConfig.publicKey,
                authority: wallet.publicKey,
                systemProgram: web3.SystemProgram.programId,
            },
            signers: [rewardPool],
        }
    );

    console.log('Deployment completed successfully!');
    console.log('Program ID:', programId.toString());
    console.log('Platform Config:', platformConfig.publicKey.toString());
    console.log('Reward Pool:', rewardPool.publicKey.toString());

    return {
        programId,
        platformConfig: platformConfig.publicKey,
        rewardPool: rewardPool.publicKey,
    };
}

// Run deployment
if (require.main === module) {
    deployPumpBox()
        .then(() => process.exit(0))
        .catch((error) => {
            console.error(error);
            process.exit(1);
        });
}