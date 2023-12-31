import { Button } from "@/components";
import { useTransactionQuery } from "@/services/query/transaction.query";

export default function Homepage() {
	const { isLoading, data } = useTransactionQuery({ refCode: "abc-123" });

	if (isLoading) {
		return <p>Loading...</p>;
	}

	return (
		<>
			<p>Hello World RefCode: {data?.refCode}</p>
			<Button message={"ทักทาย"} />
		</>
	);
}
