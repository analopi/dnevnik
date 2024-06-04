
import './App.css';
import Header from './components/Header/Header';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalForm from './components/JournalForm/JournalForm';
import JournalList from './components/JournalList/JournalList';
import Body from './layouts/Body/Body';
import LeftPanel from './layouts/LeftPanel/LeftPanel';
import { useLocalStorage } from './hooks/use-localstorage.hook';
import {UserContext  } from './context/user.context';
import { useContext, useState } from 'react';



function mapItems(items) {
	if (!items) {
		return [];
	}
	return items.map (i => ({
		...i,
		date: new Date(i.date)
	}));

}


function App() {
	const [items, setItems] = useLocalStorage(['data']);
	const [selectedItem, setSelectedItem] = useState(null);
	const {userId} = useContext(UserContext);


	const addItem = (item) => {
		if (!item.id) {
			setItems([...mapItems(items), {
				userId: userId,
				text: item.text,
				title: item.title,
				tag: item.tag,
				date: new Date(item.date),
				id: items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1
			}
			]);
		}else if(item.isDelete){
			console.log('delete');
			console.log(item);
			setItems(items.filter(i => {
				return i.id != item.id;
			}));
			setSelectedItem(null);
		}
		else{
			setItems([...mapItems(items).map(i =>{
				if (i.id === item.id){
					return{
						...item,
						date: new Date(i.date)
					};
				}
				return i;
			})]);
			setSelectedItem(null);
		}
		
	};
	

	return (
		

			
		<div className="app">
			<LeftPanel>
				<Header />
				<JournalAddButton clearForm={() => setSelectedItem(null)} />
				<JournalList data={mapItems(items)} setItem={setSelectedItem} />
			</LeftPanel>
			<Body>
				<JournalForm onSubmit={addItem} updateData={selectedItem}/>
			</Body>
		</div>
	);
}


export default App;
