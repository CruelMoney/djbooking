import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";

const GridItem = styled.button`
	cursor: grab;
	${({ large }) => (large ? "grid-column: 1 / span 2;" : "")}
`;

const ReorderGrid = ({ Wrapper, data, children }) => {
	return (
		<Wrapper>
			{data.map(({ content, id }) => {
				return (
					<GridItem key={id} draggable>
						{content}
					</GridItem>
				);
			})}
			{children}
		</Wrapper>
	);
};

export default ReorderGrid;
