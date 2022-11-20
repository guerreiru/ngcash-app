import styled from "styled-components";

export const Table = styled.table`
	width: 100%;
	thead {
		border-bottom: 1px solid ${({ theme }) => theme["gray-100"]};

		tr {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			text-align: left;
			column-gap: 16px;
		}

		@media (max-width: 576px) {
			&,
			tr {
				border-bottom: 1px solid ${({ theme }) => theme["gray-100"]};
				display: none;
			}
		}
	}

	tbody {
		tr {
			margin-top: 16px;
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			align-items: center;
			column-gap: 16px;
			border-bottom: 1px solid ${({ theme }) => theme["gray-100"]};

			@media (max-width: 576px) {
				border-bottom: 1px solid ${({ theme }) => theme["gray-100"]};
				margin-bottom: 16px;

				td:nth-child(1) p::before {
					content: "Tipo:";
					font-weight: 700;
					left: 0;
					top: 10%;
					margin-right: 8px;
				}

				td:nth-child(2) p::before {
					content: "Data:";
					font-weight: 700;
					left: 0;
					top: 10%;
					margin-right: 8px;
				}

				td:nth-child(3) p::before {
					content: "Valor:";
					font-weight: 700;
					left: 0;
					top: 10%;
					margin-right: 8px;
				}
			}

			td {
				margin-bottom: 16px;

				span {
					font-weight: 700;
					font-size: 16px;
					line-height: 24px;
					margin-right: 4px;
				}

				@media (max-width: 576px) {
					margin-bottom: 8px;
					padding-bottom: 8px;
					border-bottom: none;
					position: relative;
				}
			}

			@media (max-width: 576px) {
				grid-template-columns: 1fr;
			}
		}
	}
`;