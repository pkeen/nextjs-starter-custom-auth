"use client";
import { useCsrfToken } from "@/context/CsrfContext";

type Props = {};

const CsrfText = (props: Props) => {
	const csrfToken = useCsrfToken();
	return <div>{csrfToken}</div>;
};

export default CsrfText;
