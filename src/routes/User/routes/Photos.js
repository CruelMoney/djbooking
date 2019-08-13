import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import GracefullImage from "../components/GracefullImage";
import {
	USER_PHOTOS,
	UPLOAD_FILE,
	DELETE_FILE,
	UPDATE_PHOTOS_ORDER,
	USER
} from "../gql";
import { useQuery, useMutation } from "react-apollo";
import EmptyPage from "../../../components/common/EmptyPage";
import { getErrorMessage } from "../../../components/common/ErrorMessageApollo";
import { SecondaryButton, Col, TeritaryButton } from "../components/Blocks";
import { ButtonFileInput } from "../components/FormComponents";
import { SavingIndicator } from "..";
import RemoveButton from "react-ionicons/lib/MdRemoveCircle";
import { ImageCompressor } from "../../../utils/ImageCompressor";
import { useInView } from "react-intersection-observer";
import GracefullVideo from "../components/GracefullVideo";
import ReorderGrid from "../components/ReorderGrid";
import { ME } from "../../../components/gql";

const LIMIT = 6;

const RemoveImageWrapper = styled.div`
	opacity: 0;
	background: rgba(0, 0, 0, 0.8);
	display: flex;
	justify-content: flex-end;
	align-items: flex-start;
	padding: 1em;
`;

const ImageGrid = styled.ul`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-gap: 3px;
	list-style: none;
`;

const Cell = styled.div`
	background: #eff2f5;
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

const imgPlaceholders = [
	{ path: null, type: "IMAGE" },
	{ path: null, type: "IMAGE" },
	{ path: null, type: "IMAGE" },
	{ path: null, type: "IMAGE" },
	{ path: null, type: "IMAGE" },
	{ path: null, type: "IMAGE" }
];

const Photos = ({ user, loading }) => {
	const [uploadError, setUploadError] = useState();
	const [saving, setSaving] = useState([]);
	const [saveMutation] = useMutation(UPLOAD_FILE);
	const [updateMutation] = useMutation(UPDATE_PHOTOS_ORDER);
	const [deleteMutation] = useMutation(DELETE_FILE);
	const [ref, inView] = useInView({ rootMargin: "0px" });
	const [lastFetchedPage, setLastFetchedPage] = useState(1);

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
				page: 1,
				orderBy: "ORDER_KEY"
			}
		}
	});

	const error = uploadError || photosError;

	const media =
		loading || loadingPhotos ? imgPlaceholders : data.user.media.edges;

	const hasNextPage =
		loading || loadingPhotos ? false : data.user.media.pageInfo.hasNextPage;

	const nextPage =
		loading || loadingPhotos ? 1 : data.user.media.pageInfo.nextPage;

	const userId = user && user.id;

	const loadMore = useCallback(
		(page, userId) => {
			fetchMore({
				variables: {
					id: userId,
					pagination: {
						limit: LIMIT,
						page,
						orderBy: "ORDER_KEY"
					}
				},

				updateQuery: (prev, { fetchMoreResult }) => {
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
			});
		},
		[fetchMore]
	);

	useEffect(() => {
		if (inView && hasNextPage && lastFetchedPage !== nextPage) {
			setLastFetchedPage(nextPage);
			loadMore(nextPage, userId);
		}
	}, [inView, hasNextPage, loadMore, nextPage, userId, lastFetchedPage]);

	if (error) {
		return <EmptyPage title={"Error"} message={getErrorMessage(error)} />;
	}

	const saveFile = async (file, idGuess) => {
		try {
			setSaving(ff => [...ff, file]);

			let fileToSave = file;
			let previewPath = null;
			let type = file["type"].split("/")[0].toUpperCase();

			if (type === "IMAGE") {
				const {
					imageData: base64,
					file: compressedFile
				} = await ImageCompressor(file, true, {
					maxWidth: 1000,
					maxHeight: 1000
				});
				fileToSave = compressedFile;
				previewPath = base64;
			} else {
				previewPath = URL.createObjectURL(file);
			}

			await saveMutation({
				variables: {
					file: fileToSave
				},
				optimisticResponse: {
					__typename: "Mutation",
					singleUpload: {
						__typename: "Media",
						id: idGuess,
						path: previewPath,
						type,
						orderBy: null
					}
				},
				update: (proxy, { data: { singleUpload } }) => {
					const data = proxy.readQuery({
						query: USER_PHOTOS,
						variables: {
							id: userId,
							pagination: {
								limit: LIMIT,
								page: 1,
								orderBy: "ORDER_KEY"
							}
						}
					});

					proxy.writeQuery({
						query: USER_PHOTOS,
						variables: {
							id: userId,
							pagination: {
								limit: LIMIT,
								page: 1,
								orderBy: "ORDER_KEY"
							}
						},
						data: {
							user: {
								...data.user,
								media: {
									...data.user.media,
									edges: [singleUpload, ...data.user.media.edges]
								}
							}
						}
					});
					const userData = proxy.readQuery({
						query: USER,
						variables: {
							permalink: user.permalink
						}
					});

					proxy.writeQuery({
						query: USER,
						variables: {
							permalink: user.permalink
						},

						data: {
							user: {
								...userData.user,
								media: {
									...userData.user.media,
									edges: [singleUpload, ...userData.user.media.edges].slice(
										0,
										5
									)
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
								page: 1,
								orderBy: "ORDER_KEY"
							}
						}
					});
					proxy.writeQuery({
						query: USER_PHOTOS,
						variables: {
							id: userId,
							pagination: {
								limit: LIMIT,
								page: 1,
								orderBy: "ORDER_KEY"
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
			[...files].map((file, idx) => saveFile(file, media.length + idx + 1))
		);
	};

	const { isOwn } = user || {};

	const renderMedia = media.filter(img =>
		["IMAGE", "VIDEO"].includes(img.type)
	);

	if (renderMedia.length === 0) {
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

	const updateFilesOrder = async items => {
		const updates = items.map(i => ({ id: i.id, orderBy: i.orderBy }));
		await updateMutation({ variables: { updates } });
	};

	return (
		<>
			<Images
				renderMedia={renderMedia}
				isOwn={isOwn}
				deleteFile={deleteFile}
				updateFilesOrder={updateFilesOrder}
			>
				{hasNextPage && (
					<Cell ref={ref}>
						<LoadMoreButtonWrapper onClick={() => loadMore(nextPage, userId)}>
							<TeritaryButton>Load more</TeritaryButton>
						</LoadMoreButtonWrapper>
					</Cell>
				)}
			</Images>

			<SavingIndicator loading={saving.length > 0} message={"Uploading"} />
			{isOwn && (
				<Col style={{ marginTop: "30px", width: "250px" }}>
					<ButtonFileInput
						accept="image/*,video/*"
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

const Images = ({
	renderMedia,
	isOwn,
	deleteFile,
	updateFilesOrder,
	children
}) => {
	const imgData = renderMedia
		.sort((a, b) => a.orderBy - b.orderBy)
		.map((file, idx) => ({
			id: file.id || idx,
			content: (
				<Cell>
					{file.type === "IMAGE" ? (
						<GracefullImage src={file.path} animate={!isOwn} />
					) : (
						<GracefullVideo
							src={file.path}
							animate={!isOwn}
							loop
							autoPlay
							muted
							playsInline
						/>
					)}
					{isOwn && file.id && (
						<RemoveImageButton deleteImage={() => deleteFile(file.id)} />
					)}
				</Cell>
			)
		}));

	if (!isOwn) {
		return (
			<ImageGrid>
				{imgData.map(item => item.content)}
				{children}
			</ImageGrid>
		);
	}

	return (
		<ReorderGrid
			key={imgData
				.map(d => d.id)
				.sort()
				.toString()}
			onOrderChanged={updateFilesOrder}
			Wrapper={ImageGrid}
			data={imgData}
		>
			{children}
		</ReorderGrid>
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
					accept="image/*,video/*"
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
