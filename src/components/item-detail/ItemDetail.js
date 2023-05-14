import React, { useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import api from "../../api/api";
import "./item-detail.css";
import "../../App.css";

const ItemDetail = (props) => {
    const { itemId } = useParams();
    const formType = props.formType;
    const navigation = useNavigate();
    const [item, setItem] = useState(null);
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [available, setAvailable] = useState(false);

    const handleSave = () => {
        const newItem = {
            name,
            description,
            price,
            available,
        };

        if (itemId) {
            // Send a PUT request to update the item
            api.put(`/items/${itemId}`, newItem)
                .then(response => {
                    console.log('Item updated:', response);
                    navigation(`/items/${itemId}`);
                    //fetchItem();
                })
                .catch(error => {
                    console.error('Error updating item:', error);
                });
        } else {
            // Send a POST request to add a new item
            api.post('/items', newItem)
                .then(response => {
                    console.log('Item added:', response);
                    navigation(`/items/${response.id}`)
                })
                .catch(error => {
                    console.error('Error adding item:', error);
                });
        }
    };

    const handleDelete = () => {
        // Send a DELETE request to the API endpoint to delete the item
        api.delete(`/items/${itemId}`)
            .then(response => {
                console.log('Item deleted:', response);
                navigation('/');
            })
            .catch(error => {
                console.error('Error deleting item:', error);
            });
    };

    const handleEdit = () => {
        navigation(`/items/${itemId}/edit`);
    }

    useEffect(() => {
        const fetchItem = () => {
            // Fetch the item from the database using the item ID
            api.get(`/items/${itemId}`)
                .then(response => {
                    setItem(response);
                    setName(response.name);
                    setDescription(response.description);
                    setPrice(response.price);
                    setAvailable(response.available);
                })
                .catch(error => {
                    console.error('Error fetching item:', error);
                });
        };

        if (itemId) {
            fetchItem();
        } else {
            setName('');
            setDescription('');
            setPrice(0);
            setAvailable(false);
        }
    }, [itemId, formType]);

    const handleAvailableChange = (event) => {
        setAvailable(event.target.checked);
    };

    if (!item && itemId) {
        return <div>Loading...</div>;
    }

    return (
        <div className="app-content">
            {(formType === 'edit' || formType === 'add') ? (
                <div className="edit-item-form">
                    <h2>{ formType === 'add' ? 'Add' : 'Edit'} Bike</h2>
                    <form onSubmit={handleSave}>
                        <div className="form-grid">
                            <label htmlFor="name">Name:</label>
                            <input type="text" value={name} onChange={e => setName(e.target.value)} id="name" />

                            <label htmlFor="description">Description:</label>
                            <textarea value={description} onChange={e => setDescription(e.target.value)} id="description"/>

                            <label htmlFor="price">Price:</label>
                            <input type="number" value={price} onChange={e => setPrice(+e.target.value)} id="price"/>

                            <label htmlFor="available">Available:</label>
                            <input type="checkbox" checked={available || false} onChange={handleAvailableChange} id="available"/>

                            <div className="button-cell">
                                {formType === 'edit' ? <button type="button" onClick={handleDelete} className="sec-btn">Delete</button> : ''}
                                <button type="button" onClick={() => navigation('/')} className="sec-btn">Cancel</button>
                                <button type="button" onClick={handleSave} className="main-btn">Save</button>
                            </div>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="item-detail">
                    <h2>Bike info</h2>
                    <h3>Name: {item ? item.name : name}</h3>
                    <p>Description: {item ? item.description : description}</p>
                    <p>Price: {item ? item.price : price}</p>
                    <p>Available: {available ? 'Yes' : 'No'}</p>
                    <button onClick={handleEdit} className="sec-btn">>Edit Item</button>
                    <button onClick={handleDelete} className="sec-btn">Delete Item</button>
                </div>
            )}
        </div>
    );
};

export default ItemDetail;
