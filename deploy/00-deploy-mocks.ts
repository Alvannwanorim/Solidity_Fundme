import { HardhatRuntimeEnvironment } from "hardhat/types";
import {
    DECIMALS,
    INITIAL_ANSWER,
    developmentChains,
} from "../helper-hardhat-config";
import { DeployFunction } from "hardhat-deploy/dist/types";

const deployMock: DeployFunction = async function ({
    deployments,
    network,
    getNamedAccounts,
}: HardhatRuntimeEnvironment) {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const chainId: number = network.config.chainId!;

    if (developmentChains.includes(network.name)) {
        log("Local network detected, deploying mocks");
        await deploy("MockV3Aggregator", {
            from: deployer,
            log: true,
            args: [DECIMALS, INITIAL_ANSWER],
        });
        log("Mocks deployed");
        log("-------------------------------------");
    }
};

export default deployMock;
deployMock.tags = ["all", "mocks"];
