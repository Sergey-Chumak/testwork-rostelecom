import {Route, Switch, Redirect, NavLink} from 'react-router-dom'
import DataContent from "../components/DataContent/DataContent";
import classes from './Layout.module.css'
import {Json} from "../components/Json/Json";

function Layout() {
    return (
        <div className={classes.Layout}>
        <header>
            <NavLink activeClassName={classes.active} to='/users' >Content</NavLink>
            <NavLink activeClassName={classes.active} to='/json'>Json</NavLink>
        </header>
        <main>
            <Switch>
                <Route path='/users' component={DataContent} exact/>
                <Route path='/json' component={Json}  exact/>
                <Redirect to={'/users'}/>
            </Switch>
        </main>
    <footer>
        <p>Developed by Chumak Sergey</p>
    </footer>
    </div>
    )
}

export default Layout