export default function HourPicker() {
	return (
		<select className="border text-sm p-[6px]">
			<option hidden>Hour</option>
			{Array.from({ length: 24 }, (_, i) => i).map((hour) => (
				<option value={hour} key={hour}>
					{hour >= 0 && hour <= 9 ? `0${hour}` : hour}
				</option>
			))}
		</select>
	);
}
