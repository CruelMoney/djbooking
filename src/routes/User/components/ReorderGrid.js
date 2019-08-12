import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import useDraggableItems from "react-drag-elements";

const GridItem = styled.button`
	cursor: grab;
	${({ large }) => (large ? "grid-column: 1 / span 2;" : "")}
`;

const ReorderGrid = ({ Wrapper, data, children }) => {
	const { items, getItemProps } = useDraggableItems({
		initialItems: data
	});

	return (
		<Wrapper>
			{items.map(({ content, id }) => {
				return (
					<GridItem key={id} {...getItemProps(id)}>
						{content}
					</GridItem>
				);
			})}
			{children}
		</Wrapper>
	);
};

export default ReorderGrid;
