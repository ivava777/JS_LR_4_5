import React, { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import api from "../../api/api";
import "./item-detail.css"

const ItemDetail = (props) => {
    const { itemId } = useParams();
    const navigation = useNavigate();
    const [item, setItem] = useState(null);
    const [formType, setFormType ] = useState(props?.formType || '');
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [available, setAvailable] = useState(false);

    console.log(formType, props);

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

    const handleSave = () => {
        const newItem = {
            name,
            description,
            price,
            available: available || false,
        };

        if (itemId) {
            // Send a PUT request to update the item
            api.put(`/items/${itemId}`, newItem)
                .then(response => {
                    console.log('Item updated:', response);
                    setFormType('');
                    //navigation(`/items/${response.id}`);
                })
                .catch(error => {
                    console.error('Error updating item:', error);
                });
        } else {
            // Send a POST request to add a new item
            api.post('/items', newItem)
                .then(response => {
                    console.log('Item added:', response);
                    //setFormType('');
                    //navigation(`/items/${response.id}`);
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
                navigation('/')
            })
            .catch(error => {
                console.error('Error deleting item:', error);
            });
    };

    const handleEdit = () => {
        setFormType('editing');
        navigation(`/items/${itemId}/edit`);
    }

    useEffect(() => {
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
            {(formType === 'editing' || formType === 'adding') ? (
                <>
                    <h2>{ formType === 'adding' ? 'Add Item' : 'Edit Item'}</h2>
                    <form onSubmit={handleSave}>
                        <label>
                            Name:
                            <input type="text" value={name} onChange={e => setName(e.target.value)} />
                        </label>
                        <br />
                        <label>
                            Description:
                            <textarea value={description} onChange={e => setDescription(e.target.value)} />
                        </label>
                        <br />
                        <label>
                            Price:
                            <input type="number" value={price} onChange={e => setPrice(+e.target.value)} />
                        </label>
                        <label>
                            Available:
                            <input type="checkbox" checked={available || false} onChange={handleAvailableChange} />
                        </label>
                        <br />
                        {formType === 'editing' ? <button type="button" onClick={handleDelete}>Delete</button> : ''}
                        <button type="button" onClick={handleSave}>Save</button>
                        <button type="button" onClick={() => setFormType('')}>Cancel</button>
                    </form>
                </>
            ) : (
                <>
                    <h2>Item Detail</h2>
                    <h3>Name: {item ? item.name : name}</h3>
                    <p>Description: {item ? item.description : description}</p>
                    <p>Price: {item ? item.price : price}</p>
                    <p>Available: {available ? 'Yes' : 'No'}</p>
                    <button onClick={handleEdit}>Edit Item</button>
                    <button onClick={handleDelete}>Delete Item</button>
                </>
            )}
        </div>
    );
};

export default ItemDetail;
