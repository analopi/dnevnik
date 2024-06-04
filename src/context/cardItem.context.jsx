import {createContext, useState} from 'react';

export const CardContext = createContext({
	userId: 1,
	text: '',
	title: '',
	date: '',
	tag: ''
});

export const CardContextProvider = ({children}) => {
	const [cardData, setCardData] = useState({
		userId: '',
		text: '',
		title: '',
		date: '',
		tag: ''
	});

	return <CardContext.Provider value={{cardData, setCardData}}>
		{children}
	</CardContext.Provider>;
};