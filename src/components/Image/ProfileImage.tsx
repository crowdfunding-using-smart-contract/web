type ProfileImageProps = {
	src: string | undefined;
	alt: string;
	firstLetter: string;
	size: number;
};

export default function ProfileImage({ src, alt, firstLetter, size }: ProfileImageProps) {
	if (!src) {
		return (
			<div
				className="font-bold bg-gray-200 rounded-full flex items-center justify-center"
				style={{
					fontSize: `${size / 2}px`,
					width: `${size}px`,
					height: `${size}px`,
				}}
			>
				{firstLetter}
			</div>
		);
	}
	return (
		<img
			src={src}
			alt={alt}
			className="object-cover rounded-full"
			style={{
				width: `${size}px`,
				height: `${size}px`,
			}}
		/>
	);
}
