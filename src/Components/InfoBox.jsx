
function InfoBox(props){
    return(
        <div className="info-box">
            <img className="icon" alt="Icon" src={props.icon}></img>
            <p>{props.label}</p>
            <p>{props.info}{props.unit}</p>
        </div>
    );
}

export default InfoBox 