import { HardhatRuntimeEnvironment } from "hardhat/types";

export default async ({
    getNamedAccounts,
    deployments,
    network,
}: HardhatRuntimeEnvironment) => {
    console.log("Hi");

    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();

    const chainId = network.config.chainId;
};
