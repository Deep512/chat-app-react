// src/App.js
import React, { useState } from "react"

const INITIAL_STATE_LAYERS = [
	{
		type: "base-image",
		src: "after-remove-objects.png",
		rect: {
			width: 512,
			height: 512,
			aspectRatio: 1,
			x: 0,
			y: 0,
		},
		showLayer: true,
	},
	{
		type: "image",
		src: "coke.png",
		rect: {
			width: 164,
			height: 312,
			aspectRatio: 1.05,
			x: 163,
			y: 114,
		},
		showLayer: true,
	},
	{
		type: "image",
		src: "apple.png",
		rect: {
			width: 130,
			height: 108,
			aspectRatio: 2.4,
			x: 300,
			y: 308,
		},
		showLayer: true,
	},
]

const DemoContent = () => {
	const [brokenIntoLayers, setBrokenIntoLayers] = useState(false)

	const [imageLayers, setImageLayers] = useState(INITIAL_STATE_LAYERS)
	const [containerWidth, setContainerWidth] = useState(512)
	const [containerHeight, setContainerHeight] = useState(512)

	const onChangedWidthHeight = (width = 891, height = 232) => {
		let scaleX, scaleY
		const containerAspectRatio = width / height
		let completelyNewImageLayers = imageLayers.map((layer) => {
			let newWidth, newHeight
			if (layer.type === "base-image") {
				if (containerAspectRatio >= layer.rect.aspectRatio) {
					newHeight = height
					newWidth = newHeight * layer.rect.aspectRatio
				} else {
					newWidth = width
					newHeight = newWidth / layer.rect.aspectRatio
				}

				scaleX = newWidth / layer.rect.width
				scaleY = newHeight / layer.rect.height

				layer.rect.height = newHeight
				layer.rect.width = newWidth
			}
			return layer
		})

		completelyNewImageLayers = completelyNewImageLayers.map((layer) => {
			if (layer.type !== "base-image") {
				layer.rect.x = layer.rect.x * scaleX
				layer.rect.y = layer.rect.y * scaleY
				layer.rect.width = scaleX * layer.rect.width
				layer.rect.height = scaleY * layer.rect.height
			}
			return layer
		})

		setContainerHeight(height)
		setContainerWidth(width)
		setImageLayers(completelyNewImageLayers)
	}

	return (
		<div className="flex h-screen bg-gray-200 justify-center items-center">
			{!brokenIntoLayers ? (
				<img src="/orig-image.png" alt="originalImage" />
			) : (
				<div
					style={{ width: containerWidth, height: containerHeight }}
					className={`relative`}
				>
					{imageLayers.map(({ type, src, rect, showLayer }, idx) =>
						showLayer ? (
							<img
								className={`absolute`}
								src={src}
								alt={src}
								style={{ top: rect.y, left: rect.x, zIndex: idx }}
								width={rect.width}
								height={rect.height}
							></img>
						) : null
					)}
				</div>
			)}
			<div>
				<button
					className="p-4 text-white bg-gray-500 border border-black"
					onClick={() => {
						setBrokenIntoLayers((brokenIntoLayers) => !brokenIntoLayers)
					}}
				>
					{brokenIntoLayers ? "Show the original Image" : "Break into Layers"}
				</button>
				{brokenIntoLayers ? (
					<button
						className="p-4 text-white bg-gray-500 border border-black"
						onClick={() => {
							onChangedWidthHeight()
						}}
					>
						Recalculate
					</button>
				) : null}
			</div>
		</div>
	)
}

export default DemoContent
