import React from 'react';
import Notes from './Notes';


export default function Home(props) {
    return (
        <div className="container">
            <Notes setAlertState={props.setAlertState} />
        </div>
    )
}
