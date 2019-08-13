import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import useDraggableItems from "../../../utils/useDraggableItems";

const GridItem = styled.button`
	cursor: grab;
	:active {
		cursor: grabbing;
		cursor: -moz-grabbing;
		cursor: -webkit-grabbing;
	}
`;

const ReorderGrid = (props: ReorderGridProps) => {
	const { Wrapper, data, children, onOrderChanged } = props;
	const lastOrder = useRef(data);

	const { items, getItemProps } = useDraggableItems({
		initialItems: data
	});

	useEffect(() => {
		const hasBeenChanged = items.some(
			(d: any, idx: number) => lastOrder.current[idx].id !== d.id
		);
		debugger;
		if (onOrderChanged && hasBeenChanged) {
			lastOrder.current = items;
			onOrderChanged(
				items.map((item: any, idx: number) => ({ ...item, orderBy: idx + 1 }))
			);
		}
	}, [data, items, onOrderChanged]);

	return (
		<Wrapper>
			{items.map((item: any) => {
				return (
					<GridItem key={item.id} {...getItemProps(item.id)}>
						{item.content}
					</GridItem>
				);
			})}
			{children}
		</Wrapper>
	);
};

export interface ReorderGridProps {
	Wrapper: any;
	data: Array<{
		id: string | number;
		content: any;
	}>;
	children?: any;
	onOrderChanged?: (
		items: Array<{
			id: string | number;
			orderBy: number;
		}>
	) => void;
}

export default ReorderGrid;
