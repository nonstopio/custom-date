import React from 'react';
import logo from './logo.svg';
import CustomDateHOC from './lib/hoc/custom.date.hoc';
import './App.css';
import { dateFormatOptions } from './lib/models/format.options.interface';
import DATE_VARIANTS from './lib/constants/date.variants';

// -------- FUTURE WORK --------
// import LOCALES from './constants/locale';

function App(props: any) {
	const {
		variant,
		value,
		children,
		weekday,
		time,
		timeZoneName,
		hour12,
		locale,
	} = props;

	// -------- FUTURE WORK --------

	// if (format && locale) {
	// 	console.error(
	// 		'`format` and `locale` cannot be used together in CustomDate component'
	// 	);
	// 	return (
	// 		<div className='App'>
	// 			<header className='App-header'>
	// 				<div>
	// 					Something went wrong! Please see the browser console for more
	// 					details.
	// 				</div>
	// 			</header>
	// 		</div>
	// 	);
	// }

	let dateFormatOptions: dateFormatOptions = {
		weekday: DATE_VARIANTS.long,
		year: DATE_VARIANTS.numeric,
		month: DATE_VARIANTS.long,
		day: DATE_VARIANTS.numeric,
		hour: DATE_VARIANTS.numeric,
		minute: DATE_VARIANTS.numeric,
		second: DATE_VARIANTS.numeric,
		timeZoneName: DATE_VARIANTS.long,
		hour12: true,
	};
	let formattedDate = null;
	let matchedLocale = locale ? locale : navigator.language;

	// -------- FUTURE WORK --------
	// const mapToLocale = (localeObj: any, value: string) => {
	// 	let matchedLocales = Object.keys(localeObj).filter(
	// 		(key) => localeObj[key] === value
	// 	);
	// 	for (let localItem in matchedLocales) {
	// 		if (navigator.language === localItem) {
	// 			matchedLocale = localItem;
	// 		}
	// 	}
	// };

	const getFormattedDate = (variant: string) => {
		dateFormatOptions.hour12 = hour12 ? true : false;
		if (weekday) {
			dateFormatOptions.weekday = variant;
		}
		if (variant === DATE_VARIANTS.short || variant === DATE_VARIANTS.narrow) {
			if (time) {
				dateFormatOptions.hour = DATE_VARIANTS['2-digit'];
				dateFormatOptions.minute = DATE_VARIANTS['2-digit'];
			}
		}
		formattedDate = value
			? value.toLocaleDateString(matchedLocale, dateFormatOptions)
			: children.toLocaleDateString(matchedLocale, dateFormatOptions);
		// -------- FUTURE WORK --------
		// if (format) {
		// 	mapToLocale(LOCALES, format);
		// }
		return formattedDate;
	};

	switch (variant) {
		case DATE_VARIANTS.narrow:
			dateFormatOptions = {
				year: DATE_VARIANTS['2-digit'],
				month: DATE_VARIANTS['2-digit'],
				day: DATE_VARIANTS.numeric,
			};
			if (timeZoneName) {
				dateFormatOptions.timeZoneName = DATE_VARIANTS.short;
			}
			getFormattedDate(variant);
			break;
		case DATE_VARIANTS.short:
			dateFormatOptions = {
				year: DATE_VARIANTS['2-digit'],
				month: variant,
				day: DATE_VARIANTS.numeric,
			};
			if (timeZoneName) {
				dateFormatOptions.timeZoneName = variant;
			}
			getFormattedDate(variant);
			break;
		case DATE_VARIANTS.long:
			dateFormatOptions = {
				year: DATE_VARIANTS.numeric,
				month: variant,
				day: DATE_VARIANTS['2-digit'],
			};
			if (time) {
				dateFormatOptions.hour = DATE_VARIANTS.numeric;
				dateFormatOptions.minute = DATE_VARIANTS.numeric;
				dateFormatOptions.second = DATE_VARIANTS.numeric;
			}
			if (timeZoneName) {
				dateFormatOptions.timeZoneName = variant;
			}
			getFormattedDate(variant);
			break;
		default:
			getFormattedDate(variant);
			break;
	}
	return (
		<div className='App'>
			<header className='App-header'>
				<img src={logo} className='App-logo' alt='logo' />
				<div> {`The variant is:  ${variant ? variant : 'default'}`}</div>
				<br />
				<div> {`The locale is:  ${locale ? locale : navigator.language}`} </div>
				<h1>{formattedDate}</h1>
			</header>
		</div>
	);
}

export default CustomDateHOC(App);
