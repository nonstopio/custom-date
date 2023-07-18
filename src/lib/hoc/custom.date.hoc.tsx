import React from 'react';

const CustomDateHOC = (CustomDate: any) => {
	class NewDateComponent extends React.Component {
		dateValue = new Date();
		render(): React.ReactNode {
			return (
				<CustomDate
					variant='long'
					weekday={true}
					time={true}
					hour12={true}
					timeZoneName={true}
					locale={'zh-CN'}
					value={this.dateValue}
				/>
			);
		}
	}
	return NewDateComponent;
};

export default CustomDateHOC;
