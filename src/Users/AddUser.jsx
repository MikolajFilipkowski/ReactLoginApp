import React, {useState} from 'react'; 
import Button from '../UI/Button';
import Card from '../UI/Card';
import classes from './AddUser.module.css' ;
import ErrorModal from '../UI/ErrorModal' ;

const AddUser = (props) => {
    const [enteredName, setEnteredName] = useState("");
    const [enteredAge, setEnteredAge] = useState("");
    const [enteredEmail, setEnteredEmail] = useState("");
    const [enteredPassword, setEnteredPassword] = useState("");
    const [errorModal, setErrorModal] = useState(null);

    function nameChangeHandler(event){
        setEnteredName(event.target.value) ;
        
    }

    function ageChangeHandler(event){
        setEnteredAge(event.target.value) ;
    }

    function emailChangeHandler(event){
        setEnteredEmail(event.target.value) ;
    }

    function passwordChangeHandler(event){
        setEnteredPassword(event.target.value) ;
    }

    async function sendDataHandler(){
  
        const my_object={
          name: enteredName,
          age: enteredAge,
          email: enteredEmail,
          password: enteredPassword
        }
  
        console.log(my_object);
        
        const res = await fetch('https://szkola-284c0-default-rtdb.europe-west1.firebasedatabase.app/data.json',
        {
          method: 'POST',
          body: JSON.stringify(my_object),
          headers:{
            'Content-Type': 'application.json'
          }
  
        }) ;
         const data = await res.json() ;
         console.log(data) ;

         props.sendData(props.trigger+1)
    }

    function addUserHandler(event){
        event.preventDefault();

        if (enteredName.length < 3) {
            setErrorModal({
                title:"Błędna nazwa",
                msg:"Nazwa uzytkownika powinna zawierac co najmniej 3 znaki"
            })
        }
        else if (+enteredAge < 1){
            setErrorModal({
                title:"Błędnie podany wiek",
                msg:"Wiek musi być większy od 0"
            })
        }
        else if (!(enteredEmail.includes("@") && enteredEmail.split("@")[1].includes("."))) {
            setErrorModal({
                title:"Błędny email",
                msg:"Nieprawidlowy format adresu email"
            })
        }
        else {
            sendDataHandler()
            setEnteredName('');
            setEnteredAge('');
            setEnteredEmail('');
            setEnteredPassword('');
        }
    }

    function errorHandler(event){
        setErrorModal(null)
    }

    return(
        <>
        {errorModal && <ErrorModal 
                        title={errorModal.title} 
                        msg={errorModal.msg} 
                        onConfirm={errorHandler}
                        /> }
    <Card className={classes.input} >
        <form onSubmit={addUserHandler}>
            <label htmlFor="username"> Nazwa </label>
            <input  id="username" 
                    type="text" 
                    onChange={nameChangeHandler}
                    value={enteredName}
                    required
                    title="Musi zawierać co najmniej 3 znaki"
                    />

            <label htmlFor="age"> Wiek </label>
            <input id="age" type="Number"
                    onChange={ageChangeHandler}
                    value={enteredAge}
                    required
                    title="Musi być większy od 0"
            />
            <label htmlFor="email"> Email </label>
            <input id="email" type="email"
                    onChange={emailChangeHandler}
                    value={enteredEmail}
                    required
            />
            <label htmlFor="password"> Hasło </label>
            <input id="password" type="password"
                    onChange={passwordChangeHandler}
                    value={enteredPassword}
                    required
                    title="Musi zawierać co najmniej jedną cyfre, jedną małą i wielką literę, oraz co najmniej 8 znaków"
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            />

            <Button type="submit">Wyślij</Button>
        </form>
    </Card>
    </>
    );
}

export default AddUser;
