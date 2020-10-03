import React from 'react';
import './list-item.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'

function ListItems(props) {
    const item = props.item;

    return (
        <div className="list" key={item.id}>
            <p>
                <input 
                    type="text" 
                    id={item.id} 
                    value={item.task} 
                    onChange={(e) => {
                        props.startUpdate(e, item.id)
                    }}
                    onKeyDown={(e) => {
                        props.finalizeUpdate(e, item.id, item.task)
                    }}
                />
                <span>
                    <FontAwesomeIcon 
                        className="faicons" 
                        onClick={() => {
                            props.deleteItem(item.id)
                        }} 
                        icon={faTrash}
                    />
                </span>
            </p>
        </div>
    );
}

export default ListItems;