import styled from "styled-components";

export const MarginBottom = styled.div`
	margin-bottom: 48px;
`;

export const Container = styled.div`
	max-width: 1200px;
	width: 100%;
	margin: 0 auto;
	padding: 0 30px;
`;

export const Col = styled.div`
	display: flex;
	flex-direction: column;
`;
export const Row = styled.div`
	display: flex;
	flex-direction: row;
`;
export const FullWidthCol = styled(Col)`
	width: 100%;
`;