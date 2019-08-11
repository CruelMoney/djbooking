import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import GracefullImage from "../components/GracefullImage";
import { USER_PHOTOS, UPLOAD_FILE, DELETE_FILE } from "../gql";
import { useQuery, useMutation } from "react-apollo";
import EmptyPage from "../../../components/common/EmptyPage";
import { getErrorMessage } from "../../../components/common/ErrorMessageApollo";
import { SecondaryButton, Col, TeritaryButton } from "../components/Blocks";
import { ButtonFileInput } from "../components/FormComponents";
import { SavingIndicator } from "..";
import RemoveButton from "react-ionicons/lib/MdRemoveCircle";
import { ImageCompressor } from "../../../utils/ImageCompressor";
import { useInView } from "react-intersection-observer";

const LIMIT = 6;

const RemoveImageWrapper = styled.div`
	opacity: 0;
	background: rgba(0, 0, 0, 0.8);
	display: flex;
	justify-content: flex-end;
	align-items: flex-start;
	padding: 1em;
`;

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
	:hover ${RemoveImageWrapper} {
		opacity: 1;
	}
`;

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

const imgPlaceholders = [
	{ path: null },
	{ path: null },
	{ path: null },
	{ path: null },
	{ path: null },
	{ path: null }
];

const Photos = ({ user, loading }) => {
	const [uploadError, setUploadError] = useState();
	const [saving, setSaving] = useState([]);
	const [saveMutation] = useMutation(UPLOAD_FILE);
	const [deleteMutation] = useMutation(DELETE_FILE);
	const [ref, inView] = useInView({ rootMargin: "0px" });

	const {
		data,
		error: photosError,
		loading: loadingPhotos,
		fetchMore
	} = useQuery(USER_PHOTOS, {
		skip: loading,
		variables: {
			id: user && user.id,
			pagination: {
				limit: LIMIT,
				page: 1
			}
		}
	});

	const error = uploadError || photosError;

	const images =
		loading || loadingPhotos ? imgPlaceholders : data.user.media.edges;

	const hasNextPage =
		loading || loadingPhotos ? false : data.user.media.pageInfo.hasNextPage;

	const nextPage =
		loading || loadingPhotos ? 1 : data.user.media.pageInfo.nextPage;

	const userId = user && user.id;

	const loadMore = useCallback(
		() =>
			fetchMore({
				variables: {
					id: userId,
					pagination: {
						limit: LIMIT,
						page: nextPage
					}
				},

				updateQuery: (prev, { fetchMoreResult }) => {
					console.log(!fetchMoreResult ? "returning prev" : "return niew");
					console.log({ prev, fetchMoreResult, nextPage });

					if (!fetchMoreResult) return prev;
					return {
						...prev,
						user: {
							...prev.user,
							media: {
								...fetchMoreResult.user.media,
								edges: [
									...prev.user.media.edges,
									...fetchMoreResult.user.media.edges
								]
							}
						}
					};
				}
			}),
		[nextPage, fetchMore, userId]
	);

	useEffect(() => {
		if (inView && hasNextPage) {
			loadMore();
		}
	}, [inView, hasNextPage, loadMore, nextPage]);

	if (error) {
		return <EmptyPage title={"Error"} message={getErrorMessage(error)} />;
	}

	const saveFile = async (file, idGuess) => {
		try {
			setSaving(ff => [...ff, file]);

			const { imageData: base64, file: compressedFile } = await ImageCompressor(
				file,
				true,
				{
					maxWidth: 1000,
					maxHeight: 1000
				}
			);

			await saveMutation({
				variables: {
					file: compressedFile
				},
				optimisticResponse: {
					__typename: "Mutation",
					singleUpload: {
						__typename: "Media",
						id: idGuess,
						path: base64,
						type: "IMAGE"
					}
				},
				update: (proxy, { data: { singleUpload, ...rest } }) => {
					debugger;
					const data = proxy.readQuery({
						query: USER_PHOTOS,
						variables: {
							id: userId,
							pagination: {
								limit: LIMIT,
								page: 1
							}
						}
					});
					proxy.writeQuery({
						query: USER_PHOTOS,
						variables: {
							id: userId,
							pagination: {
								limit: LIMIT,
								page: 1
							}
						},
						data: {
							user: {
								...data.user,
								media: {
									...data.user.media,
									edges: [...data.user.media.edges, singleUpload]
								}
							}
						}
					});
				}
			});
		} catch (error) {
			setUploadError(error);
		} finally {
			setSaving(ff => ff.filter(f => f !== file));
		}
	};

	const deleteFile = async id => {
		try {
			setSaving(ff => [...ff, id]);
			await deleteMutation({
				variables: {
					id
				},
				optimisticResponse: {
					__typename: "Mutation",
					deleteFile: true
				},
				update: proxy => {
					const data = proxy.readQuery({
						query: USER_PHOTOS,
						variables: {
							id: userId,
							pagination: {
								limit: LIMIT,
								page: 1
							}
						}
					});
					proxy.writeQuery({
						query: USER_PHOTOS,
						variables: {
							id: userId,
							pagination: {
								limit: LIMIT,
								page: 1
							}
						},
						data: {
							user: {
								...data.user,
								media: {
									...data.user.media,
									edges: data.user.media.edges.filter(e => e.id !== id)
								}
							}
						}
					});
				}
			});
		} catch (error) {
			setUploadError(error);
		} finally {
			setSaving(ff => ff.filter(f => f !== id));
		}
	};

	const uploadFiles = async files => {
		await Promise.all(
			[...files].map((file, idx) => saveFile(file, images.length + idx + 1))
		);
	};

	const { isOwn } = user || {};

	if (images.length === 0) {
		return (
			<>
				<EmptyPage
					title="No Photos or Videos"
					message={
						isOwn ? <EmptyCTA user={user} uploadFiles={uploadFiles} /> : ""
					}
				/>
				<SavingIndicator loading={saving.length > 0} message={"Uploading"} />
			</>
		);
	}

	debugger;

	return (
		<>
			<ImageGrid>
				{images.map((img, idx) => (
					<Cell key={idx} css={getCellStyle(idx)}>
						<GracefullImage src={img.path} animate />
						{isOwn && img.id && (
							<RemoveImageButton deleteImage={() => deleteFile(img.id)} />
						)}
					</Cell>
				))}
				{hasNextPage && (
					<Cell css={getCellStyle(images.length)} ref={ref}>
						<LoadMoreButtonWrapper onClick={loadMore}>
							<TeritaryButton>Load more</TeritaryButton>
						</LoadMoreButtonWrapper>
					</Cell>
				)}
				<SavingIndicator loading={saving.length > 0} message={"Uploading"} />
			</ImageGrid>
			{isOwn && (
				<Col style={{ marginTop: "30px", width: "250px" }}>
					<ButtonFileInput
						accept="image/*"
						onChange={e => uploadFiles(e.target.files)}
						multiple
					>
						Add photos or videos
					</ButtonFileInput>
				</Col>
			)}
		</>
	);
};

const LoadMoreButtonWrapper = styled.div`
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const RemoveImageButton = ({ deleteImage }) => {
	return (
		<RemoveImageWrapper>
			<RemoveButton
				onClick={deleteImage}
				color="#fff"
				style={{ cursor: "pointer" }}
				fontSize="36px"
			/>
		</RemoveImageWrapper>
	);
};

const EmptyCTA = ({ uploadFiles, onClick }) => {
	return (
		<>
			<Col
				style={{
					marginTop: "30px",
					height: "150px",
					justifyContent: "space-between"
				}}
			>
				<ButtonFileInput
					accept="image/*"
					onChange={e => uploadFiles(e.target.files)}
					multiple
				>
					Add photos or videos
				</ButtonFileInput>
				<SecondaryButton onClick={onClick}>Connect Instagram</SecondaryButton>
				<SecondaryButton onClick={onClick}>Connect Youtube</SecondaryButton>
			</Col>
		</>
	);
};

export default Photos;
