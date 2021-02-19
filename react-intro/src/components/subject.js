import React from 'react';

const subject = (props) => {

    return (
        <div className="card">
            <p>This is a subject! It is called {props.title} and it is in {props.year} of the course.</p>
            <p>{props.children}</p>
        </div>
    )
}

export default subject;