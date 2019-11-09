let userList = null
let currentUser = null
function getCookies() {
    var res = document.cookie
        .split("; ")
        .map(
            x => {
                var tmp = x.split("=")
                var elem = {}
                elem[tmp[0]] = tmp[1]
                return elem
            }
        )
    return Object.assign({}, ...res)
}
window.onload = (event) => {
    fetch('https://fea-15-andry.glitch.me/users/all')
        .then(response => response.json())
        .then(response => {
            userList = response

            let userCookie = getCookies()
            currentUser = userList[userCookie.login]
            if (userCookie['userPass'] && userCookie['userPass'] === currentUser['pass-hash']) {
                console.log('user identifier: ok')
                document.getElementsByTagName('sign-up')[0].setAttribute('avtorize', true)
                // notavtorized.style.display = 'none'
                // avtorized.style.display = 'block'
            }

            else {
                document.getElementsByTagName('sign-up')[0].setAttribute('avtorize', false)
                console.log('cookies is empty!!!')
                // notavtorized.style.display = 'block'
                // avtorized.style.display = 'none'
            }
        })
}
class LoginForms extends HTMLElement {
    constructor() {
        super()
        this.shadow = this.attachShadow({ mode: 'closed' })
    }
    connectedCallback() {
        this.shadow.innerHTML = `
        <style>
        .block-scheme {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
        
        h1 {
            align-self: center;
            font-size: 28px;
        }
        
        a {
            text-decoration: none;
            border: 1px solid grey;
            border-radius: 20px;
            padding: 10px;
            margin: 20px;
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
            font-family: Arial, Helvetica, sans-serif;
            transform: scale(1);
            transition: all 0.5s;
            background-color: grey;
        }
        
        a:hover {
            background-color: seagreen;
            color: silver;
            padding: 15px;
        }
        
        .pushbutton {
            transform: scale(0.8);
            box-shadow: none;
        }
        
        @keyframes bouncing {
            0% {
                bottom: 0;
                box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
                transform: scale(1);
            }
            50% {
                bottom: 50px;
                box-shadow: 0 50px 50px rgba(0, 0, 0, 0.1);
                transform: scale(0.8);
            }
            100% {
                bottom: 0;
                box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
                transform: scale(1);
            }
        }
        
        .loading-button {
            animation: bouncing 0.5s cubic-bezier(0.1, 0.25, 0.1, 1) 0s alternate both;
        }
        
        #listuserwrapper {
            top:40%;
            left:40%;
            position: fixed;
            display:flex;
            
            width: 40vw;
            height: 40vh;
            background-color: dimgray;
            border:1px solid darkgray;
        }
        
        .regwrapper{
            position: fixed;
            display:flex;
            flex-direction: column;
            border:1px solid gray;
            box-shadow: 0 50px 50px rgba(0, 0, 0, 0.1);
            padding: 5px;
            left:40%;
            top:-100%;
            transition: all 1s;
            z-index:100;
            background-color: lightgrey;
        }
        
        .log-wrapper{
            position: fixed;
            display:flex;
            flex-direction: column;
            border:1px solid gray;
            box-shadow: 0 50px 50px rgba(0, 0, 0, 0.1);
            padding: 5px;
            left:40%;
            top:-100%;
            transition: all 1s;
            z-index:100;
            background-color: lightgrey
        }
        #registration{
            padding:10px;
            border:1px solid gray;
            width:30vw;
            height:50vh;
            display:flex;
            flex-direction: column;
            justify-content: space-around;
        }
        #avtorized img,#avtorized p ,#avtorized a{
            margin: 5px;
        }
        #avtorized{
            display:flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
        
        }
        

        </style>
        <div class="block-scheme">
        <div id="notavtorized">
            <a href="#" id="signup"> ЗАРЕГИСТРИРОВАТЬСЯ </a>
            <a href="#" id="signin"> ВОЙТИ </a>
        </div>
        <div id="avtorized">
            <img src="" alt="User avatar" width="40" id="useravatar">
            <p id="username"></p>
            <a href="#" id="logout"> LogOut </a>
        </div>
    </div>
    <div class="regwrapper" id="registrationForm">
        <h3>Registration form</h3>
        <form id="registration">
            Login:<input type="text" id="login">
            First Name:<input type="text" name="firstname" id="firstName">
            Last Name:<input type="text" name="lastname" id="lastName">
            E-mail:<input type="email" name="email" id="email">
            Password:<input type="password" id="pass1">
            Confirm Password:<input type="password" id="pass2">
            <img src="./img/anonim.png" width="50" alt="user avatar" id="avatar">
            Choose avatar image <input type="file" id="chooseFile">
            <input type="hidden" value="" name="pass-hash" id="passHash">
            <input type="hidden" value="" name="user-photo" id="userPhoto">
        </form>
        <div>
            <button id="accept">Accept</button><button id="exitbutton">Cancel</button>
        </div>
    </div>
    <div class='log-wrapper' id="logform">
        <h3>Sign in </h3>
        Login:<input type="text" id="signLogin">
        Password:<input type="password" id="signPass">
        <button id="signAccept">Accept</button><button id="signCancel">Cancel</button>
    </div>

        `
        this.shadow.getElementById('registrationForm').onblur = (event) => {
            event.target.style=''
        }
       
        this.shadow.getElementById('signup').onclick = (event) => {
            event.target.classList.add('loading-button')
            setTimeout(() => event.target.classList.remove('loading-button'), 500)
            this.shadow.getElementById('registrationForm').style = "top:20%;"
        }
        this.shadow.getElementById('exitbutton').onclick = (event) => {
            this.shadow.getElementById('registrationForm').style = ""
        }
        this.shadow.getElementById('signin').onclick = (event) => {
            event.target.classList.add('loading-button')
            setTimeout(() => event.target.classList.remove('loading-button'), 500)
            this.shadow.getElementById('logform').style = "top:20%;"
        }
        this.shadow.getElementById('logout').onclick = (event) => {
            event.target.classList.add('loading-button')
            setTimeout(() => event.target.classList.remove('loading-button'), 500)
        }
        
        this.shadow.getElementById('signCancel').onclick = (event) => {
            this.shadow.getElementById('logform').style = ""
        }
        this.shadow.getElementById('signLogin').oninput = (event) => {
            let arrayOfLogins = []
            for (let key in userList) arrayOfLogins.push(key)
            event.target.valid = arrayOfLogins.find(item => item === event.target.value)
            event.target.style.color = event.target.valid ? "green" : "red"
        }
        this.shadow.getElementById('signAccept').onclick = (event) => {
            let login = this.shadow.getElementById('signLogin').value
            let signPass = this.shadow.getElementById('signPass').value
            if (userList[login]['pass-hash'] === Sha256.hash(signPass)) {
                currentUser = userList[login]
                document.cookie = `login=${login}`
                document.cookie = `userPass=${currentUser['pass-hash']}`
                this.shadow.getElementById('notavtorized').style.display = 'none'
                this.shadow.getElementById('avtorized').style.display = 'block'
                this.shadow.getElementById('username').innerText = currentUser['firstname']
                this.shadow.getElementById('useravatar').src = currentUser['user-photo']
                alert(`Hello user ${currentUser.firstname}`)
            }
            else alert('Incorrect password!!!')
        }
        this.shadow.getElementById('chooseFile').onchange = (event) => {
            let photo = event.target.files[0]
            let reader = new FileReader()
            reader.readAsDataURL(photo)
            reader.onload = (event) => {
                if (photo.type.indexOf("image") !== 0 || photo.size > 100000) return alert('Incorrect format file')
                this.shadow.getElementById('avatar').src = URL.createObjectURL(photo)
                this.shadow.getElementById('userPhoto').value = event.target.result
            }
        }
        
        this.shadow.getElementById('pass1').oninput = function (event) {
            let pass = event.target.value
            event.target.valid = pass.length > 6 && !!pass.match(/\d/) && !!pass.match(/\D/)
            event.target.style.color = event.target.valid ? "green" : "red"
            pass2.disabled = !event.target.valid
        }
        
        this.shadow.getElementById('pass2').oninput = function (event) {
            event.target.valid = event.target.value === pass1.value
            event.target.style.color = event.target.valid ? "green" : "red"
        }
        this.shadow.getElementById('pass2').onchange = function (event) {
            event.target.valid ?
            this.shadow.getElementById('passHash').value = Sha256.hash(event.target.value) : null
        }
        this.shadow.getElementById('accept').onclick = (event) => {
            let formData = new FormData(registration)
            let result = {}
            formData.forEach(
                (val, key) => Object.assign(result, { [key]: val })
            )
            let login = this.shadow.getElementById('signLogin').value
            fetch(`https://fea-15-andry.glitch.me/user/${login}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(result)
            }).then(response => response.json())
                .then(response => {
                    currentUser = response
                    document.cookie = `login=${login}`
                    document.cookie = `userPass=${currentUser['pass-hash']}`
                })
        }
    }
    static get observedAttributes() {
        return [ 'avtorize']
    }
    attributeChangedCallback( attrName, oldVal, newVal ) {
        if (attrName==='avtorize'&&newVal==='true') {
            this.shadow.getElementById('notavtorized').style.display = 'none'
            this.shadow.getElementById('avtorized').style.display = 'block'
            this.shadow.getElementById('username').innerText = currentUser['firstname']
            this.shadow.getElementById('useravatar').src = currentUser['user-photo']

        }
        else if (attrName==='avtorize'&&newVal==='false'){
            this.shadow.getElementById('notavtorized').style.display = 'block'
            this.shadow.getElementById('avtorized').style.display = 'none'

        }
    }
}
customElements.define('sign-up', LoginForms)