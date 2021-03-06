import React from 'react';


class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Email: '',
            密碼: ''
        }
    }

    輸入Eail = (event) => {
        this.setState({ Email: event.target.value })
    }

    輸入密碼 = (event) => {
        this.setState({ 密碼: event.target.value })
    }

    登入= () => {
        fetch('https://fathomless-everglades-24693.herokuapp.com/signin',{
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.state.Email,
                password: this.state.密碼
            }) 
        })
        .then(res => res.json())
        .then(data => {
            if (data.id) {
                this.props.loadUser(data)
                this.props.onRouteChange('home')
            }
        })
    }

    onKeyboardSubmit = (event) => {
        if (event.key === 'Enter') {
          this.登入()
        }
      }

    render () {
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input 
                            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="email" 
                            name="email-address"  
                            id="email-address"
                            onChange={this.輸入Eail}
                         />
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input 
                            className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="password" 
                            name="password"  
                            id="password"
                            onKeyPress={this.onKeyboardSubmit}
                            onChange={this.輸入密碼}
                        />
                    </div>
                    </fieldset>
                    <div className="">
                        <input 
                            className="b ph3 pv2 input-reset border b--black bg-transparent grow pointer f6 dib br2" 
                            type="submit" 
                            value="登入"  
                            onClick={this.登入}
                        />
                    </div>
                    <div className="lh-copy mt3">
                        <p className="f5 link dim black db pointer" onClick={() => this.props.onRouteChange('register')}>Register</p>
                    </div>
                </div>
                </main>
            </article>
        )
    }
}

export default Signin;