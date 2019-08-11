import React from "react";
import styled from "styled-components";
import GracefullImage from "../components/GracefullImage";

const ImageGrid = styled.section`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-gap: 3px;
`;

const Cell = styled.div`
	background: #ebebeb;
	position: relative;
	${({ css }) => css}
	> * {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	:before {
		content: "";
		display: block;
		padding-top: 100%;
	}
`;

const images = [
	"https://d1i5zrp3ng76nh.cloudfront.net/user_uploads/images/c12a7500-8f33-11e9-a409-e36d5ddf8bfe.jpg",
	"https://d1i5zrp3ng76nh.cloudfront.net/user_uploads/images/c12a7500-8f33-11e9-a409-e36d5ddf8bfe.jpg",
	"https://d1i5zrp3ng76nh.cloudfront.net/user_uploads/images/c12a7500-8f33-11e9-a409-e36d5ddf8bfe.jpg",
	"https://d1i5zrp3ng76nh.cloudfront.net/user_uploads/images/c12a7500-8f33-11e9-a409-e36d5ddf8bfe.jpg",
	"https://d1i5zrp3ng76nh.cloudfront.net/user_uploads/images/c12a7500-8f33-11e9-a409-e36d5ddf8bfe.jpg",
	"https://d1i5zrp3ng76nh.cloudfront.net/user_uploads/images/c12a7500-8f33-11e9-a409-e36d5ddf8bfe.jpg",
	"https://d1i5zrp3ng76nh.cloudfront.net/user_uploads/images/c12a7500-8f33-11e9-a409-e36d5ddf8bfe.jpg",
	"https://d1i5zrp3ng76nh.cloudfront.net/user_uploads/images/c12a7500-8f33-11e9-a409-e36d5ddf8bfe.jpg",
	"https://d1i5zrp3ng76nh.cloudfront.net/user_uploads/images/c12a7500-8f33-11e9-a409-e36d5ddf8bfe.jpg",
	"https://d1i5zrp3ng76nh.cloudfront.net/user_uploads/images/c12a7500-8f33-11e9-a409-e36d5ddf8bfe.jpg",
	"https://d1i5zrp3ng76nh.cloudfront.net/user_uploads/images/c12a7500-8f33-11e9-a409-e36d5ddf8bfe.jpg",
	"https://d1i5zrp3ng76nh.cloudfront.net/user_uploads/images/c12a7500-8f33-11e9-a409-e36d5ddf8bfe.jpg",
	"https://d1i5zrp3ng76nh.cloudfront.net/user_uploads/images/c12a7500-8f33-11e9-a409-e36d5ddf8bfe.jpg",
	"https://d1i5zrp3ng76nh.cloudfront.net/user_uploads/images/c12a7500-8f33-11e9-a409-e36d5ddf8bfe.jpg",
	"https://d1i5zrp3ng76nh.cloudfront.net/user_uploads/images/c12a7500-8f33-11e9-a409-e36d5ddf8bfe.jpg",
	"https://d1i5zrp3ng76nh.cloudfront.net/user_uploads/images/c12a7500-8f33-11e9-a409-e36d5ddf8bfe.jpg",
	"https://d1i5zrp3ng76nh.cloudfront.net/user_uploads/images/c12a7500-8f33-11e9-a409-e36d5ddf8bfe.jpg",
	"https://d1i5zrp3ng76nh.cloudfront.net/user_uploads/images/c12a7500-8f33-11e9-a409-e36d5ddf8bfe.jpg",
	"https://d1i5zrp3ng76nh.cloudfront.net/user_uploads/images/c12a7500-8f33-11e9-a409-e36d5ddf8bfe.jpg",
	"https://d1i5zrp3ng76nh.cloudfront.net/user_uploads/images/c12a7500-8f33-11e9-a409-e36d5ddf8bfe.jpg",
	"https://d1i5zrp3ng76nh.cloudfront.net/user_uploads/images/c12a7500-8f33-11e9-a409-e36d5ddf8bfe.jpg",
	"https://d1i5zrp3ng76nh.cloudfront.net/user_uploads/images/c12a7500-8f33-11e9-a409-e36d5ddf8bfe.jpg",
	"https://d1i5zrp3ng76nh.cloudfront.net/user_uploads/images/c12a7500-8f33-11e9-a409-e36d5ddf8bfe.jpg",
	"https://d1i5zrp3ng76nh.cloudfront.net/user_uploads/images/c12a7500-8f33-11e9-a409-e36d5ddf8bfe.jpg",
	"https://d1i5zrp3ng76nh.cloudfront.net/user_uploads/images/c12a7500-8f33-11e9-a409-e36d5ddf8bfe.jpg",
	"https://d1i5zrp3ng76nh.cloudfront.net/user_uploads/images/c12a7500-8f33-11e9-a409-e36d5ddf8bfe.jpg",
	"https://d1i5zrp3ng76nh.cloudfront.net/user_uploads/images/c12a7500-8f33-11e9-a409-e36d5ddf8bfe.jpg",
	"https://d1i5zrp3ng76nh.cloudfront.net/user_uploads/images/c12a7500-8f33-11e9-a409-e36d5ddf8bfe.jpg"
];

const getCellStyle = idx => {
	const pos = idx % 12;
	const currentRepeat = Math.floor(idx / 12);
	let currentRow = pos < 4 ? 1 : 4;

	currentRow += currentRepeat * 6;

	// large left
	if (pos === 0) {
		return `
      grid-column: 1 / span 2;
      grid-row: ${currentRow} / span 2;
    `;
	}
	// large right
	if (pos === 8) {
		return `
      grid-column: 2 / span 2;
      grid-row: ${currentRow} / span 2;
    `;
	}

	return "";
};

const Photos = () => {
	return (
		<ImageGrid>
			{images.map((src, idx) => (
				<Cell key={idx} css={getCellStyle(idx)}>
					<GracefullImage src={src} animate />
				</Cell>
			))}
		</ImageGrid>
	);
};
export default Photos;
