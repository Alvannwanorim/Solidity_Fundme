import { HardhatRuntimeEnvironment } from "hardhat/types";
import { developmentChains, networkConfig } from "../helper-hardhat-config";
import { DeployFunction } from "hardhat-deploy/dist/types";
import verify from "../utils/verify";

const FundMe: DeployFunction = async function ({
    getNamedAccounts,
    deployments,
    network,
}: HardhatRuntimeEnvironment) {
    console.log("Hi");

    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const chainId: number = network.config.chainId!;

    let ethUsdPriceFeedAddress;
    if (developmentChains.includes(network.name)) {
        const ethUsdAggregator = await deployments.get("MockV3Aggregator");
        ethUsdPriceFeedAddress = ethUsdAggregator.address;
    } else {
        ethUsdPriceFeedAddress = networkConfig[network.name].ethUsdPriceFeed!;
    }

    const args = [ethUsdPriceFeedAddress];
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args,
        log: true,
        waitConfirmations: networkConfig[network.name].blockConfirmations || 0,
    });
    log("-------------------------------------------------");

    //very contract

    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(fundMe.address, args);
    }
};

export default FundMe;
FundMe.tags = ["all", "fundMe"];
