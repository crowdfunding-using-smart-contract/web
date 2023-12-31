import { useQuery } from "@tanstack/react-query";
import { GetTransactionParams, Transaction } from "@/types/transaction";
import { getTransaction } from "../api/transaction.api";

export const useTransactionQuery = (params: GetTransactionParams) =>
	useQuery<Transaction>({
		queryKey: ["transactions", params.refCode],
		queryFn: async () => {
			const res = await getTransaction(params);
			return res.result;
		},
	});
