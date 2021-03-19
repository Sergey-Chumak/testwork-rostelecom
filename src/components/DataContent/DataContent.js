import classes from './DataContent.module.css'
import getData from "../../services/getData"
import {useState, useEffect} from 'react'
import TableUsers from "../TableUsers/TableUsers"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function DataContent() {
    const [users, setUsers] = useState([])
    const [filtredUsers, setFiltredUsers] = useState([])
    const [inputValue, setInputValue] = useState('')
    const [activeThead, setActiveThead] = useState('id')

    useEffect(() => {
        async function getUsers() {
            const users = await getData()
            return users
        }

        getUsers().then(users => {
            setUsers(users)
            setFiltredUsers(users)
        }).catch((e) => {
            toast.dark(`${e.name}: ${e.message}`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        })
    }, [])

    useEffect(() => {
        if (inputValue) {
            setFiltredUsers(users.filter((user) => {
                return user.name.toLowerCase().startsWith(inputValue.toLowerCase().trim())
            }))
            setActiveThead('id')
            return
        }
        setFiltredUsers(users)
        setActiveThead('id')
    }, [inputValue])

    function handleInput($event) {
        setInputValue($event.target.value)
    }

    function sortUsersHandler(field) {
        const copyUsers = [...filtredUsers]
        if (field === 'id') {
            setActiveThead(field)
            const sortData = copyUsers.sort(
                (a, b) => {
                    return a[field] > b[field] ? 1 : -1
                }
            )
            setFiltredUsers(sortData)
        } else if (field === 'name' || field === 'email') {
            setActiveThead(field)
            const sortData = copyUsers.sort(
                (a, b) => {
                    let nameA = a[field].toLowerCase(), nameB = b[field].toLowerCase()
                    if (nameA < nameB)
                        return -1
                    if (nameA > nameB)
                        return 1
                    return 0
                }
            )
            setFiltredUsers(sortData)
        } else if (field === 'company') {
            setActiveThead(field)
            const sortData = copyUsers.sort(
                (a, b) => {
                    let nameA = a[field].name.toLowerCase(), nameB = b[field].name.toLowerCase()
                    if (nameA < nameB)
                        return -1
                    if (nameA > nameB)
                        return 1
                    return 0
                }
            )
            setFiltredUsers(sortData)
        } else {
            setActiveThead(field)
            const sortData = copyUsers.sort(

                (a, b) => {
                    let nameA = a[field].city.toLowerCase(), nameB = b[field].city.toLowerCase()
                    if (nameA < nameB)
                        return -1
                    if (nameA > nameB)
                        return 1
                    return 0
                }
            )
            setFiltredUsers(sortData)
        }
    }

    return (
        <div className={classes.DataContent}>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <input className={"search "} placeholder={'Search'} onChange={handleInput}/>
            {
                filtredUsers.length > 0
                ? <TableUsers active={activeThead} usersFilter={filtredUsers} sortUsersHandler={sortUsersHandler}/>
                : <p style={{fontSize: '3vw', color: 'white'}}>User not found</p>
            }
        </div>
    )

}

export default DataContent