import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

import './Navbar.css'
import Temple from '../assets/temple.svg'

export default function Navbar() {

    const { logout, isPending } = useLogout()
    const { user } = useAuthContext()

    return (
        <div className='navbar'>
            <ul>
                <li className='logo'>
                    <img src={Temple} alt='dojo logo' />
                    <span>the dojo</span>
                </li>

                {user ?
                    <li>
                            {!isPending && <button className='btn' onClick={logout}>logout</button>}
                            {isPending && <button className='btn' disabled>logging out</button>}
                    </li>
                :
                    <>
                        <li>
                            <Link to='/login'>login</Link>
                        </li>
                        <li>
                            <Link to='/signup'>signup</Link>
                        </li>
                    </>
                }
            </ul>
        </div>

    )

}