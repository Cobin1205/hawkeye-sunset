import {useEffect} from 'react'

function Slider({value, onChange}){

    useEffect(() => {
        const percent = (value / 10) * 100;
        document.documentElement.style.setProperty('--vote-color', voteColors[value]);
        document.documentElement.style.setProperty('--percent', `${percent}%`);
    }, [value]);

    const voteColors = {
        0: "#818181",
        1: "#6e70af", 
        2: "#6e8a99",
        3: "#6ea6af",
        4: "#e3caa8",
        5: "#ebae7d",
        6: "#f1a162",
        7: "#ea893c",
        8: "#f95c84",
        9: "#f02c5e",
        10: "#ff009b",
    }

    return(
        <input
        type="range"
        min="0"
        max="10"
        value={value}
        name="voteScore"
        className="voteSlider"
        onChange={e => onChange(Number(e.target.value))}
        />
    )
}

export default Slider