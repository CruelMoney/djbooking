import React from "react";

const Options = ({
	onChange,
	initialValue,
	placeholder,
	options,
	...props
}) => {
	return (
		<div className="dropdown-selector-wrapper fullwidth">
			<select
				className="dropdown-selector "
				onChange={e => onChange && onChange(e.target.value)}
				defaultValue={initialValue || ""}
				{...props}
			>
				{placeholder && (
					<option disabled value="">
						{placeholder}
					</option>
				)}
				{options.map(({ label, value }, idx) => (
					<option key={`option-${idx}`} value={value}>
						{label}
					</option>
				))}
			</select>
			<svg className="collapsible-arrow" viewBox="0 0 24 24">
				<path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
			</svg>
		</div>
	);
};

export default Options;
