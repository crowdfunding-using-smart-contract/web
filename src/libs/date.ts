import { DateType } from "@/types/date";
import dayjs from "dayjs";

function dateFormatter(date: DateType, format: string): string {
	const formatDate = dayjs(date).format(format);
	if (formatDate === "Invalid Date") {
		return "-";
	}

	return formatDate;
}

export { dateFormatter };
