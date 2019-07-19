import React from "react";

const VerifiedBadge = React.forwardRef((props, ref) => (
	<svg width={33} height={33} {...props} ref={ref}>
		<defs>
			<circle id="verified_svg__b" cx={9.5} cy={9.5} r={9.5} />
			<filter
				x="-55.3%"
				y="-55.3%"
				width="210.5%"
				height="210.5%"
				filterUnits="objectBoundingBox"
				id="verified_svg__a"
			>
				<feMorphology
					radius={0.5}
					operator="dilate"
					in="SourceAlpha"
					result="shadowSpreadOuter1"
				/>
				<feOffset in="shadowSpreadOuter1" result="shadowOffsetOuter1" />
				<feGaussianBlur
					stdDeviation={3}
					in="shadowOffsetOuter1"
					result="shadowBlurOuter1"
				/>
				<feColorMatrix
					values="0 0 0 0 0.314369351 0 0 0 0 0.8883757 0 0 0 0 0.759899616 0 0 0 1 0"
					in="shadowBlurOuter1"
				/>
			</filter>
		</defs>
		<g fill="none" fillRule="evenodd">
			<g transform="translate(7 7)">
				<use
					fill="#000"
					filter="url(#verified_svg__a)"
					xlinkHref="#verified_svg__b"
				/>
				<use fill="#FFF" xlinkHref="#verified_svg__b" />
			</g>
			<text
				fontFamily="Ionicons"
				fontSize={14}
				fontWeight={400}
				fill="#50E3C2"
				transform="translate(7 7)"
			>
				<tspan x={4} y={15}>
					{"\uF122"}
				</tspan>
			</text>
		</g>
	</svg>
));

export default VerifiedBadge;
