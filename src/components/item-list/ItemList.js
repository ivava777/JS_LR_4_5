import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import './ItemList.css';
import { CartContext } from '../../cart-context/CartContext';

const ItemList = () => {
    const [items, setItems] = useState([]);
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [filter] = useState('');
    const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);

    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = () => {
        // Fetch items from the database using the configured Axios instance
        api.get('/items')
            .then(response => {
                setItems(response);
            })
            .catch(error => {
                console.error('Error fetching items:', error);
            });
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSortChange = (event) => {
        setSortOrder(event.target.value);
    };

    const handleAvailabilityChange = () => {
        setShowOnlyAvailable(!showOnlyAvailable);
    };

    const filteredItems = items.filter((item) =>
        item.name?.toLowerCase().includes(searchTerm?.toLowerCase())
    );

    const sortedItems = filteredItems.sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.name.localeCompare(b.name);
        } else {
            return b.name.localeCompare(a.name);
        }
    });

    const filteredAndSortedItems = sortedItems.filter((item) =>
        item.name?.toLowerCase().includes(filter?.toLowerCase())
    );

    const filteredAndSortedItemsWithAvailability = filteredAndSortedItems.filter((item) =>
        showOnlyAvailable ? item.available : true
    );

    const handleViewDetail = itemId => {
        // Navigate to the item detail page with the specified item ID
        navigate(`/items/${itemId}`);
    };

    const handleAddToCart = (item) => {
        addToCart(item);
    };

    return (
        <div className="item-list-container">
            <h2>Bikes</h2>
            <div className="filter-container">
                <label htmlFor="searchName">
                    Search by name
                </label>
                <input
                    id="searchName"
                    type="text"
                    placeholder="Search by name"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <label htmlFor="sortName">
                    Sort by name
                </label>
                <select value={sortOrder} onChange={handleSortChange} id="sortName">
                    <option value="asc">Sort A-Z</option>
                    <option value="desc">Sort Z-A</option>
                </select>
                <label>
                    <input
                        type="checkbox"
                        checked={showOnlyAvailable}
                        onChange={handleAvailabilityChange}
                    />
                    Filter Only Available
                </label>
            </div>
            <table className="item-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Available</th>
                    <th></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {filteredAndSortedItemsWithAvailability.map((item) => (
                    <tr key={item.id}>
                        <td className="align-center">{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td className="align-center">{item.available ? 'Yes' : 'No'}</td>
                        <td className="align-center"><button onClick={() => handleViewDetail(item.id)} className="view-detail-button">View Detail</button></td>
                        <td className="align-center"><button onClick={() => handleAddToCart(item)} disabled={!item.available} className="add-to-cart-button">Add to Cart</button></td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ItemList;
