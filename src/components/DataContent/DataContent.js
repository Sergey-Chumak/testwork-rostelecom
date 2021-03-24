import classes from './DataContent.module.css'
import getData from "../../services/getData"
import {useState, useEffect} from 'react'
import TableUsers from "../TableUsers/TableUsers"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import _ from 'lodash';

function DataContent() {
    const [users, setUsers] = useState([])
    const [filtredUsers, setFiltredUsers] = useState([])
    const [inputValue, setInputValue] = useState('')
    const [activeThead, setActiveThead] = useState('id')
    const [stateSort, setStateSort] = useState(null)

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
                return user.name.toLowerCase().includes(inputValue.toLowerCase().trim())
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

            if (field === 'id' || field === 'name' || field === 'email')
            {
                if (activeThead !== field) {
                    const copyUsers = _.sortBy(filtredUsers, [(item) => item[field]])
                    setFiltredUsers(copyUsers)
                    setActiveThead(field)
                    setStateSort(field)
                } else {
                   const copyUsers = _.sortBy(filtredUsers, [(item) => item[field]])
                   setFiltredUsers(copyUsers.reverse())
                   setActiveThead(null)
                    setStateSort(field)
                }
            } else if (field === 'company') {

                if (activeThead !== field) {
                    const copyUsers = _.sortBy(filtredUsers, [(item) => item.company.name])
                    setFiltredUsers(copyUsers)
                    setActiveThead(field)
                    setStateSort(field)
                } else {
                    const copyUsers = _.sortBy(filtredUsers, [(item) => item.company.name])
                    setFiltredUsers(copyUsers.reverse())
                    setActiveThead(null)
                    setStateSort(field)
                }
            } else if (field === 'address') {

                if (activeThead !== field) {
                    const copyUsers = _.sortBy(filtredUsers, [(item) => item.address.city])
                    setFiltredUsers(copyUsers)
                    setActiveThead(field)
                    setStateSort({[field]: true})
                } else {
                    const copyUsers = _.sortBy(filtredUsers, [(item) => item.address.city])
                    setFiltredUsers(copyUsers.reverse())
                    setActiveThead(null)
                    setStateSort({[field]: false})
                }
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
                ? <TableUsers active={stateSort} usersFilter={filtredUsers} sortUsersHandler={sortUsersHandler}/>
                : <p style={{fontSize: '3vw', color: 'white'}}>User not found</p>
            }
        </div>
    )

}

export default DataContent