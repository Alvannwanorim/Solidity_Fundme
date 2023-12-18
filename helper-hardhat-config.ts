export interface networkConfigItem {
    ethUsdPriceFeed?: string;
    blockConfirmations?: number;
    chainId?: number;
}

export interface networkConfigInfo {
    [key: string]: networkConfigItem;
}

export const networkConfig: networkConfigInfo = {
    localhost: {},
    hardhat: {},
    sepolia: {
        ethUsdPriceFeed: "0x694AA1769357215DE4FAC081bf1f309aDC325306",
        chainId: 11155111,
        blockConfirmations: 6,
    },
};

export const developmentChains = ["hardhat", "localhost"];

export const DECIMALS = 0;
export const INITIAL_ANSWER = 200000000000;
