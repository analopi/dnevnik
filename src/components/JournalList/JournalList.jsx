import { useContext, useMemo} from 'react';
import CardButton from '../CardButton/CardButton';
import JournalItem from '../JournalItem/JournalItem';
import './JournalList.css';
import { UserContext } from '../../context/user.context';

function JournalList({ data, setItem }) {
	

	const {userId} = useContext(UserContext);
	const sortItems = (a, b) => {
		if (a.date < b.date) return 1;
		return -1;
	};



	const filterdeItems = useMemo(() => data
		.filter(el => el.userId === userId)
		.sort(sortItems), [data, userId]);

	if (data.length === 0) {
		return <p>Записей пока нет добавьте новую</p>;
	}


	return (
		<>
			{
				(filterdeItems
					.map((el) => (
						<CardButton key={el.id} onClick={() => setItem(el)}>
							<JournalItem title={el.title} text={el.text} date={el.date} />
						</CardButton>
					)))
			}
		</>
	);
}

export default JournalList;
