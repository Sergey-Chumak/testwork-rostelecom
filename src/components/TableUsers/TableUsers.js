import classes from './TableUsers.module.css'

export default function TableUsers(props) {
    return (
        <table className={classes.TableUsers}>
            <thead>
            <tr>
                <td className={props.active === 'id' ? classes.active : ''} onClick={() => props.sortUsersHandler('id')}>ID</td>
                <td className={props.active === 'name' ? classes.active : ''} onClick={() => props.sortUsersHandler('name')}>Name</td>
                <td className={props.active === 'company' ? classes.active : ''} onClick={() => props.sortUsersHandler('company')}>Company</td>
                <td className={props.active === 'email' ? classes.active : ''} onClick={() => props.sortUsersHandler('email')}>E-mail</td>
                <td className={props.active === 'address' ? classes.active : ''} onClick={() => props.sortUsersHandler('address')}>Address</td>
            </tr>
            </thead>
            <tbody>
            {props.usersFilter.map((user, index) => {
                    return (
                        <tr key={index}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.company.name}</td>
                            <td>{user.email}</td>
                            <td>`{user.address.city}, {user.address.street} `</td>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
    )
}

