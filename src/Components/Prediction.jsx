
function Prediction(props){
    let date = new Date()

    const barStyle = {
        background: `linear-gradient(to bottom right, orange, rgb(227, 64, 124))`,
        width: Math.round(props.score*10) + "%",
        height: "40px",
        borderRadius: "20px"
    }

    return(
        <div className="main-panel">
            <div style={{display:"flex"}}>
                <div style={{flex: "50%"}}>
                    <h3>
                        Predicted Rating
                        <br/>{props.score}/10
                    </h3>
                </div>
                <div style={{flex:"50%", textAlign: "right"}}>
                    <p> {props.time} </p>
                    <p> {date.toLocaleString("default", {month: 'long'})} {date.getDate()}, {date.getFullYear()} </p>
                </div>
            </div>


            <div className="meterBackground"> <div className="meter" style = {barStyle}></div> </div>

        </div>
    );
}

export default Prediction