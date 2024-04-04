import React, { useEffect, useState } from "react";
import { Button } from "@mantine/core";
import { useSDK } from "@metamask/sdk-react";
import { BsFillTrashFill } from "react-icons/bs";
import { ethers } from "ethers";

export default function ConnectWalletButton() {
	const { sdk, connected, connecting, account: ethAccount } = useSDK();
	const [account, setAccount] = useState<string | undefined>(ethAccount);
	const [balance, setBalance] = useState<string | null>(null);

	async function getBalance(address: string) {
		const ethereum = window.ethereum;

		if (!ethereum) {
			console.log("MetaMask is not installed!");
			return;
		}

		const provider = new ethers.BrowserProvider(ethereum);
		const balance = await provider.getBalance(address);
		setBalance(ethers.formatEther(balance));
	}

	async function handleConnect() {
		if (!sdk) {
			// TODO: Handle SDK not initialized
			return;
		}

		try {
			const accounts = await sdk.connect();
			setAccount(accounts[0]);
			await getBalance(accounts[0]);
		} catch (error) {
			console.warn(error);
		}
	}

	function handleDisconnect() {
		if (!sdk) {
			// TODO: Handle SDK not initialized
			return;
		}

		try {
			sdk.terminate();
		} catch (error) {
			console.warn(error);
		}
	}

	useEffect(() => {
		setAccount(ethAccount);
	}, [ethAccount]);

	useEffect(() => {
		async function getBalanceOnAccountChange() {
			if (account) {
				await getBalance(account);
			}
		}

		getBalanceOnAccountChange();
	}, [account]);

	if (connected) {
		return (
			<React.Fragment>
				<span>Metamask Wallet (${balance} USD)</span>
				<div className="flex mt-1 gap-x-3">
					<Button size="md" className="py-2 px-8 border border-[#f18623] text-[#f18623] w-max" disabled>
						{account}
					</Button>
					<button onClick={handleDisconnect}>
						<BsFillTrashFill color="gray" size={20} />
					</button>
				</div>
			</React.Fragment>
		);
	}

	if (connecting) {
		return (
			<Button size="md" className="py-2 px-8 border border-[#f18623] text-[#f18623] w-max" disabled>
				Connecting...
			</Button>
		);
	}

	return (
		<Button
			size="md"
			className="py-2 px-8 border border-[#f18623] text-[#f18623] w-max"
			leftSection={<MetaMaskIcon size={24} />}
			onClick={handleConnect}
		>
			Connect Metamask Wallet
		</Button>
	);
}

function MetaMaskIcon({ size = 16 }: { size?: number }) {
	return <img src="/assets/metamask.png" alt="metamask" style={{ width: `${size}px` }} />;
}
