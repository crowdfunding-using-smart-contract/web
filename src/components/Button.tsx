type ButtonProps = {
	message: string;
};

export default function Button({ message }: ButtonProps) {
	return <button>{message}</button>;
}
