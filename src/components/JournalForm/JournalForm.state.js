export const INITIAL_STATE = {
	isValid: {
		text: true,
		title: true,
		date: true,
		tag: true
	},
	values:{
		text: '',
		title: '',
		date: '',
		tag: ''
	},
	isFormReadyToSubmit: false
};

export function formReducer(state, action) {
	switch(action.type){
	case 'RESET_VALIDITY':
		return {...state, isValid: INITIAL_STATE.isValid};
	case 'SUBMIT' :{
		const titleValidity = state.values.title?.trim().length;
		const textValidity = state.values.text?.trim().length;
		const dateValidity = state.values.date;
		const tagValidity = state.values.tag;
		return {
			...state,
			isValid:{
				text: textValidity,
				title: titleValidity,
				date: dateValidity,
				tag: tagValidity
			},
			isFormReadyToSubmit: textValidity && titleValidity && dateValidity && tagValidity
		};
	}
	case 'CLEAR_FORM':
		return {...state, values: INITIAL_STATE.values, isFormReadyToSubmit: false };
	case 'SET_VALUE':
		return {...state,  values:{ ...state.values, ...action.payload}};
		

	}
}