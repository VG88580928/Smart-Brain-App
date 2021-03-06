import React from 'react';


class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            姓名: '',
            Email: '',
            密碼: ''
        }
    }

    輸入姓名 = (event) => {
        this.setState({ 姓名: event.target.value })
    }

    輸入Eail = (event) => {
        this.setState({ Email: event.target.value })
    }

    輸入密碼 = (event) => {
        this.setState({ 密碼: event.target.value })
    }

    註冊 = () => {
        fetch('https://fathomless-everglades-24693.herokuapp.com/register',{
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: this.state.姓名,
                email: this.state.Email,
                password: this.state.密碼
            }) 
        })
        .then(res => res.json())
        .then(user => {
            if (user.id) {
                 this.props.loadUser(user)
                this.props.onRouteChange('home')
            }
        })
    }

    // onKeyboardSubmit = (event) => {
    //     if (event.key === 'Enter') {
    //       this.註冊()
    //     }
    //   }

    render () {
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f1 fw6 ph0 mh0">Register</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                        <input 
                        onChange={this.輸入姓名} 
                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                        type="text" name="name"  
                        id="name" 
                        />
                    </div>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input 
                        onChange={this.輸入Eail} 
                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                        type="email" 
                        name="email-address"  
                        id="email-address" 
                        />
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input 
                        onChange={this.輸入密碼} 
                        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                        type="password" 
                        name="password"  
                        id="password" 
                        />
                    </div>
                    </fieldset>
                    <div className="">
                        <input 
                        className="b ph3 pv2 input-reset border b--black bg-transparent grow pointer f6 dib br2" 
                        type="submit" 
                        value="註冊" 
                        onClick={this.註冊} 
                        />
                    </div>
                </div>
                </main>
            </article>
        )
    } 
}

export default Register;