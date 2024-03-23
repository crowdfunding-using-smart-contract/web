type MinutePickerProps = {
	disabled?: boolean;
	value?: number;
	setValue: (value: number) => void;
};

export default function MinutePicker({ disabled = false, value, setValue }: MinutePickerProps) {
	return (
		<select
			className="border text-sm p-[6px]"
			disabled={disabled}
			value={value}
			onChange={(e) => setValue(parseInt(e.target.value))}
		>
			<option hidden>Minute</option>
			{Array.from({ length: 60 }, (_, i) => i).map((minute) => (
				<option value={minute} key={minute}>
					{minute >= 0 && minute <= 9 ? `0${minute}` : minute}
				</option>
			))}
		</select>
	);
}
