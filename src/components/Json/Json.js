import classes from './Json.module.css'
import dataJson from '../../data/Json.json'

export function Json () {
    function createMarkup() {
        return {__html: dataJson[0].text};
    }

    return (
        <div className={classes.Json}>
            <ul>{dataJson[0].tax.map((item, index)=> {
                return (
                    <li key={index}>{item}</li>
                )
            })}</ul>
            <div dangerouslySetInnerHTML={createMarkup()} />;
        </div>
    )
}
