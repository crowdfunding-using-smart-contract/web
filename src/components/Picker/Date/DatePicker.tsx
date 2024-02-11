import { DatePickerInput } from "@mantine/dates";
import { FaCalendarAlt } from "react-icons/fa";
import "./style.css";
import { DateType } from "@/types/date";

type DatePickerProps = {
	value: DateType;
	setValue: (value: DateType) => void;
};

export default function DatePicker({ value, setValue }: DatePickerProps) {
	const icon = <FaCalendarAlt color={"#222222"} size={16} />;

	return (
		<DatePickerInput
			leftSection={icon}
			leftSectionPointerEvents="none"
			variant="filled"
			minDate={new Date()}
			value={value}
			onChange={setValue}
			valueFormatter={() => ""}
			size={"md"}
			className="w-max"
		/>
	);
}
