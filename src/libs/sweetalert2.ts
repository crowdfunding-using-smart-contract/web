import swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const Swal = withReactContent(swal);

export const Toast = Swal.mixin({
	toast: true,
	position: "top-end",
	showConfirmButton: false,
	timer: 2000,
});
