import React from "react";
import loading from '../../../Images/loading.gif'

const LoadingPage = () => {
    return (<div className="loadingDiv">
    <label className="loadingLabel">Loading</label>
    <img src={loading}></img>
</div>)
}

export default LoadingPage;

