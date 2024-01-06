import { Button } from "@/components";
import { useTransactionQuery } from "@/services/query/transaction.query";
import useAuthStore from "@/store/useAuthStore";

export default function Homepage() {
	const { isLoading, data } = useTransactionQuery({ refCode: "abc-123" });
	const { isAuthenticated } = useAuthStore();

	if (isLoading) {
		return <p>Loading...</p>;
	}

	return (
		<>
			<p>Hello World RefCode: {data?.refCode}</p>
			<Button message={"ทักทาย"} />
			<p>สวัสดี ไอ้หน้าหี {JSON.stringify(isAuthenticated)}</p>
		</>
	);
}
