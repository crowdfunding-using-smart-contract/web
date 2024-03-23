type HourPickerProps = {
	disabled?: boolean;
	value?: number;
	setValue: (value: number) => void;
};

export default function HourPicker({ disabled = false, value, setValue }: HourPickerProps) {
	return (
		<select
			className="border text-sm p-[6px]"
			disabled={disabled}
			value={value}
			onChange={(e) => setValue(parseInt(e.target.value))}
		>
			<option hidden>Hour</option>
			{Array.from({ length: 24 }, (_, i) => i).map((hour) => (
				<option value={hour} key={hour}>
					{hour >= 0 && hour <= 9 ? `0${hour}` : hour}
				</option>
			))}
		</select>
	);
}
