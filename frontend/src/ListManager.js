import React, { useState, useEffect } from 'react';

function ListManager() {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState('');
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        fetch('http://127.0.0.1:5000/items')
            .then(res => res.json())
            .then(data => setItems(data));
    }, []);

    const addItem = () => {
        fetch('http://127.0.0.1:5000/items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ item: newItem }),
        })
            .then(() => {
                setItems([...items, newItem]);
                setNewItem('');
            });
    };

    const deleteItem = (index) => {
        fetch(`http://127.0.0.1:5000/items/${index}`, {
            method: 'DELETE',
        })
            .then(() => {
                setItems(items.filter((_, i) => i !== index));
            });
    };

    const updateItem = () => {
        fetch(`http://127.0.0.1:5000/items/${editIndex}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ item: newItem }),
        })
            .then(() => {
                let updatedItems = [...items];
                updatedItems[editIndex] = newItem;
                setItems(updatedItems);
                setNewItem('');
                setEditIndex(null);
            });
    };

    return (
        <div>
            <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
            />
            <button onClick={editIndex !== null ? updateItem : addItem}>
                {editIndex !== null ? 'Update' : 'Add'}
            </button>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>
                        {item}{' '}
                        <button onClick={() => setEditIndex(index)}>Edit</button>{' '}
                        <button onClick={() => deleteItem(index)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListManager;
