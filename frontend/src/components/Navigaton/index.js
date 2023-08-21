import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
import Logo from "../Logo"
import './index.css'
import ProfileDropdown from "../ProfileDropdown"

export default function Navigation({setLogin, setSignup}) {

    const sessionUser = useSelector(state => state.session.user)

    return (
        <div id='navigation'>

                <Logo />
            {!sessionUser && <div id='login-signup'>
                    <a
                    onClick={() => {setSignup(false); setLogin(true)}}>
                    <h1>Login</h1>
                    </a>

                    <a onClick={() => {setLogin(false); setSignup(true)}}>
                    <h1

                    >Sign Up</h1>
                    </a>

            </div>}
            {
                sessionUser && <ProfileDropdown sessionUser={sessionUser}/>
            }

        </div>
    )
}