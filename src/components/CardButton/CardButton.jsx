import './CardButton.css';

function CardButton({children, className, onClick }) {
	const cl = 'card-button' + (className ? ' ' + className : '');

	return (
		<button onClick={onClick} className={cl}>{children}</button>
		
	);
}

export default CardButton;
