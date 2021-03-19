import classes from './Json.module.css'

export function Json () {
    let dataJson = require('../../data/Json.json')

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