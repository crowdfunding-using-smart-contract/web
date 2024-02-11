export default function MinutePicker() {
	return (
		<select className="border text-sm p-[6px]">
			<option hidden>Minute</option>
			{Array.from({ length: 60 }, (_, i) => i).map((minute) => (
				<option value={minute} key={minute}>
					{minute >= 0 && minute <= 9 ? `0${minute}` : minute}
				</option>
			))}
		</select>
	);
}
