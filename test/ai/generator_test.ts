import { expect } from 'chai';
import { AIGenerator } from '../../src/ai/generator';

describe('AI Generator Tests', () => {
    let generator: AIGenerator;

    before(() => {
        generator = new AIGenerator({
            apiEndpoint: process.env.AI_API_ENDPOINT || 'https://api.pump.box/ai',
            apiKey: process.env.AI_API_KEY || 'test_key'
        });
    });

    describe('Token Name Generation', () => {
        it('should generate a unique token name based on description', async () => {
            const description = 'A space-themed memecoin with cosmic vibes';
            const preferences = ['funny', 'sci-fi'];

            const name = await generator.generateTokenName(description, preferences);
            
            expect(name).to.be.a('string');
            expect(name.length).to.be.greaterThan(0);
            expect(name).to.match(/^[A-Za-z0-9]+$/); // Alphanumeric validation
        });

        it('should generate different names for different descriptions', async () => {
            const desc1 = 'A funny cat-themed token';
            const desc2 = 'A space ninja warrior token';

            const name1 = await generator.generateTokenName(desc1, ['funny']);
            const name2 = await generator.generateTokenName(desc2, ['action']);

            expect(name1).to.not.equal(name2);
        });
    });

    describe('Token Ticker Generation', () => {
        it('should generate a valid ticker symbol', async () => {
            const name = 'CosmicShiba';
            const ticker = await generator.generateTicker(name);

            expect(ticker).to.be.a('string');
            expect(ticker.length).to.be.within(3, 6);
            expect(ticker).to.match(/^[A-Z0-9]+$/); // Uppercase alphanumeric
        });

        it('should avoid duplicate tickers', async () => {
            const existingTickers = ['CSHIB', 'MOON', 'STAR'];
            const name = 'StarWarrior';

            const ticker = await generator.generateTicker(name, existingTickers);

            expect(existingTickers).to.not.include(ticker);
        });
    });

    describe('Token Image Generation', () => {
        it('should generate a valid image URL', async () => {
            const description = 'A ninja cat in space with laser eyes';
            const preferences = ['funny', 'sci-fi'];

            const imageUrl = await generator.generateImage(description, preferences);

            expect(imageUrl).to.be.a('string');
            expect(imageUrl).to.match(/^https:\/\/arweave\.net\/.+/); // Arweave URL format
        });

        it('should generate different images for different descriptions', async () => {
            const desc1 = 'A golden shiba inu with a crown';
            const desc2 = 'A pixel art space warrior';

            const image1 = await generator.generateImage(desc1, ['funny']);
            const image2 = await generator.generateImage(desc2, ['pixel']);

            expect(image1).to.not.equal(image2);
        });
    });

    describe('Random Seed Verification', () => {
        it('should use Solana VRF for randomness', async () => {
            const seed = await generator.getRandomSeed();
            expect(seed).to.match(/^[0-9a-f]{64}$/); // 32-byte hex string
        });

        it('should generate different seeds for each request', async () => {
            const seed1 = await generator.getRandomSeed();
            const seed2 = await generator.getRandomSeed();

            expect(seed1).to.not.equal(seed2);
        });
    });
});