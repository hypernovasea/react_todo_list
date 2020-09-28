import React from 'react';
import './list-items.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import FlipMove from 'react-flip-move';

function ListItems(props) {
    const items = props.items;
    const listItems = items.map(item => 
        {
            return <div className="list" key={item.id}>
                <p>
                    <input type="text" id={item.id} value={item.task} onChange={(e) => {
                        props.setUpdate(e.target.value, item.id)}}/>
                    <span>
                        <FontAwesomeIcon className="faicons" onClick={() => {
                            props.deleteItem(item.id)
                        }} icon={faTrash} />
                    </span>
                </p>
            </div>
        });
        return <div>
            <FlipMove duration={300} easing="ease-in-out">
                {listItems}
            </FlipMove>
        </div>;
}

export default ListItems;