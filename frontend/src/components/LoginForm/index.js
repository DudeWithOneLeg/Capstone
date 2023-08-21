import { useState } from "react"
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router-dom";
import './index.css'

export default function LoginForm() {
    const dispatch = useDispatch()
    const sessionUser = useSelector((state) => state.session.user);

    const [errors, setErrors] = useState({});
    const [credential, setCredential] = useState("")
    const [password, setPassword] = useState("")

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault()

        const user = {
            credential,
            password
        }

        setErrors({});
    return dispatch(sessionActions.login(user)).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );

    }

    return (
        <div id='login-form'>
            <form onSubmit={handleSubmit}>
                <input
                className="example"
                type='text'
                placeholder='Usrname or Email'
                onChange={(e) => setCredential(e.target.value)}
                />
                <input
                className="example"
                placeholder="Password"
                type='password'
                onChange={(e) => setPassword(e.target.value)}
                />
                {errors.credential && <p class='errors'>{errors.credential}</p>}
                <button
                className="example" type='submit'>Login</button>
            </form>
        </div>

    )
}
