import { api } from "@/libs/api";
import type { ResultResponse } from "@/types/response";
import type { GetTransactionParams, Transaction } from "@/types/transaction";

export async function getTransaction(params: GetTransactionParams): Promise<ResultResponse<Transaction>> {
	const { data } = await api.get(`/api/transactions/${params.refCode}`);

	return data;
}
