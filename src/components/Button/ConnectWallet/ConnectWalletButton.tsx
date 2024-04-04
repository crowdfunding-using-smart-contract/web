import React, { useEffect, useState } from "react";
import { Button } from "@mantine/core";
import { BsFillTrashFill } from "react-icons/bs";
import { ethers } from "ethers";
import useAuthStore from "@/store/useAuthStore";
import { Swal } from "@/libs/sweetalert2";

export default function ConnectWalletButton() {
	const { user, updateUserByIdAsync } = useAuthStore();
	const [balance, setBalance] = useState<string | undefined>();

	async function connect(userId: string) {
		const ethereum = window.ethereum;

		if (!ethereum) {
			console.error("Ethereum object not found");
			return;
		}

		const accounts = await ethereum.request<string[]>({
			method: "eth_requestAccounts",
		});

		if (!accounts || accounts.length === 0) {
			console.error("No accounts found");
			return;
		}

		const address = accounts[0];
		if (!address) {
			console.error("No address found");
			return;
		}

		await updateUserByIdAsync(userId, { metamaskAccountId: address });

		const provider = new ethers.BrowserProvider(ethereum);
		const balance = await provider.getBalance(address);
		setBalance(ethers.formatEther(balance));
	}

	async function disconnect(userId: string) {
		console.log("disconnecting wallet");

		Swal.fire({
			title: "Are you sure?",
			text: "You will be disconnected from your Metamask wallet",
			icon: "warning",
			showCancelButton: true,
			confirmButtonText: "Yes",
			cancelButtonText: "No",
		}).then(async (result) => {
			if (result.isConfirmed) {
				await updateUserByIdAsync(userId, { metamaskAccountId: "empty" });
			}
		});
	}

	async function getBalance(address: string) {
		const ethereum = window.ethereum;

		if (!ethereum) {
			console.error("Ethereum object not found");
			return;
		}

		const provider = new ethers.BrowserProvider(ethereum);
		const balance = await provider.getBalance(address);
		return ethers.formatEther(balance);
	}

	useEffect(() => {
		if (user && user.metamaskAccountId) {
			getBalance(user.metamaskAccountId).then((balance) => setBalance(balance));
		}
	}, [user]);

	if (!user) return null;

	if (user.metamaskAccountId !== "empty") {
		return (
			<React.Fragment>
				<span>Metamask Wallet (${balance} USD)</span>
				<div className="flex mt-1 gap-x-3">
					<Button size="md" className="py-2 px-8 border border-[#f18623] text-[#f18623] w-max" disabled>
						{user.metamaskAccountId}
					</Button>
					<button onClick={() => disconnect(user.id)}>
						<BsFillTrashFill color="gray" size={20} />
					</button>
				</div>
			</React.Fragment>
		);
	}

	return (
		<Button
			size="md"
			className="py-2 px-8 border border-[#f18623] text-[#f18623] w-max"
			leftSection={<MetaMaskIcon size={24} />}
			onClick={() => connect(user.id)}
		>
			Connect Metamask Wallet
		</Button>
	);
}

function MetaMaskIcon({ size = 16 }: { size?: number }) {
	return <img src="/assets/metamask.png" alt="metamask" style={{ width: `${size}px` }} />;
}
