import { useEffect, useReducer, useRef} from 'react';
import s from './JournalForm.module.css';
import Button from '../Button/Button';
import cn from 'classnames';
import { INITIAL_STATE, formReducer } from './JournalForm.state';
import Input from '../Input/Input';

function JournalForm({onSubmit, updateData}) {
	const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
	const {isValid, isFormReadyToSubmit, values} = formState;
	const titleRef = useRef();
	const dateRef = useRef();
	const textRef = useRef();
	const tagRef = useRef();

	const focusError = (isValid) => {
		switch(true) {
		case !isValid.title:
			titleRef.current.focus();
			break;
		case !isValid.date:
			dateRef.current.focus();
			break;
		case !isValid.tag:
			tagRef.current.focus();
			break;
		case !isValid.text:
			textRef.current.focus();
			break;
		}
	};

	useEffect(() => {
		if (!updateData){
			dispatchForm({type: 'CLEAR_FORM'});
			
		}
		dispatchForm({type: 'SET_VALUE', payload: {...updateData}});

		
	}, [updateData]);

	useEffect(() => {
		let timerId;
		if (!isValid.date || !isValid.text || !isValid.tag || !isValid.title){
			focusError(isValid);

			timerId = setTimeout(() =>{
				dispatchForm({type: 'RESET_VALIDITY'});
			}, 2000);
		}
		return() => {
			clearTimeout(timerId);
		};
	}, [isValid]);

	useEffect(() => {
		if (isFormReadyToSubmit){
			
			onSubmit(values);
			dispatchForm({type: 'CLEAR_FORM'});
		}
	}, [isFormReadyToSubmit, onSubmit, values]);



	const addJournalItem = (e) => {
		e.preventDefault();
		dispatchForm({type: 'SUBMIT' });
	};
	const onChange = (e) =>{
		dispatchForm({type: 'SET_VALUE', payload: {[e.target.name]: e.target.value}});
	};
	const onDelete = () =>{
		onSubmit({...values, isDelete: true});
		dispatchForm({type: 'CLEAR_FORM'});
	};
	return (
		<form className={s['journal-form']} onSubmit={addJournalItem} >
			<div className={s.row}>
				<Input  type="text" ref={titleRef} isValid={isValid.title} name='title' value={values.title} onChange={onChange} appearence="title"/>
				{updateData?.id && <img  onClick={onDelete} src='/delete.svg'/>}
			</div>
			<div className={s.row}>
				<label htmlFor="date" className={s.labels}><img src='/date.svg' alt='Иконка клаендаря'></img> <span >Дата</span></label>
				<Input type='date' ref={dateRef} isValid={isValid.date} name='date' id="date" value={values.date ? new Date(values.date).toISOString().slice(0, 10) : ''} onChange={onChange} className={cn( s['input'],s['input_date'],{
					[s['invalid']]: !isValid.date
				})}/>
			</div>
			<div className={s.row}>	
				<label htmlFor="tag" className={s.labels}><img src='/tag.svg' alt='Иконка ntujd'></img> <span>Тэг</span></label>
				<Input type="text" name='tag' id='tag' ref={tagRef} isValid={isValid.tag}  value={values.tag} onChange={onChange} className={cn( s['input'],s['input_tag'],{
					[s['invalid']]: !isValid.tag
				})}/>
			</div>
			<textarea name="text" ref={textRef} id="" cols="30" rows="10" value={values.text} onChange={onChange} className={cn( s['input'], s['input_text'],{
				[s['invalid']]: !isValid.text
			})}></textarea>
			<Button >Сохранить</Button> 
		</form>	
	); 
}

export default JournalForm;
