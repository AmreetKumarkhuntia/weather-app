import React from 'react';

const header = () => {
    var api='https://rapidapi.com/user/weatherbit';
    var github='https://github.com/AmreetKumarkhuntia';
    var linkedin='https://www.linkedin.com/in/amreet-khuntia-15193220b/';

    return (
        <header>
            <h2>W-ORT</h2>
            <h3>
            <div className='grid'>
                <p className="links"><a href={linkedin}>Linkendin</a></p>
                <p className="links"><a href={github}>githbub</a></p>
                <p className="links"><a href={api}>api</a></p>
            </div></h3>
        </header>
    );
}

export default header;