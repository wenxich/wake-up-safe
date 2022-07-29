import {Amplify, Auth, Logger} from 'aws-amplify';
import React, {useEffect, useState} from "react";
import {Authenticator, useAuthenticator} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
import {SelectField, TextField} from '@aws-amplify/ui-react';


Amplify.configure(awsExports);
const logger = new Logger('WUS_log', 'DEBUG');

async function getUserInfo() {
    const user = await Auth.currentAuthenticatedUser();
    console.log('attributes:', user.attributes);
}

export default function App() {
    const [username, setUsername] = useState("");
    const [userID, setUserID] = useState("");

    //create setRole function
    const [role, setRole] = useState("");

    //create setInstitution function (option value for institution)
    const [institution, setInstitution] = React.useState('');

    useEffect(() => {
        Auth.currentAuthenticatedUser().then((data) => {
            setUserID(data.attributes.sub);
        });
    });
    useEffect(() => {
        Auth.currentAuthenticatedUser().then((data) => {
            setUserID(data.attributes.role);
        });
    });
    const services = {
        async handleSignUp(formData) {
            let {username, password, attributes} = formData;
            console.log('attributes:', user.attributes);
            return Auth.signUp({
                username,
                password,
                attributes
            });
        },
    }

    const funcc = async () => {
        let user = await Auth.currentAuthenticatedUser();
        logger.info('user name = ', user)
        const {username} = user;
        setUsername(username)
        if (user) {
            logger.info('Redirect to CHOP WUS page');
            //window.location = "http://localhost:3000/?userID="+userID+"&username="+username+"&role="+role;
        }
        await Auth.updateUserAttributes(user, {
            'custom:institution': {institution},
            'custom:role': {role}
        })
    }
    funcc();
    return (
        <Authenticator
            // Default to Sign Up screen
            initialState="signUp"

            services={services}
            // Customize `Authenticator.SignUp.FormFields`
            components={{
                SignUp: {
                    FormFields() {
                        const {validationErrors} = useAuthenticator();

                        return (
                            <>
                                {/* Re-use default `Authenticator.SignUp.FormFields` */}
                                <Authenticator.SignUp.FormFields/>

                                <TextField
                                    isRequired="true"
                                    errorMessage={validationErrors.lname}
                                    hasError={!!validationErrors.lname}
                                    key="lastname"
                                    name="lastname"
                                    label='Last name'/>
                                <TextField
                                    isRequired="true"
                                    errorMessage={validationErrors.fname}
                                    hasError={!!validationErrors.fname}
                                    key="firstname"
                                    name="firstname"
                                    label='First Name'
                                />


                                {/* Append & require Terms & Conditions field to sign up  */}
                                <SelectField
                                    isRequired="true"
                                    errorMessage={validationErrors.institution}
                                    hasError={!!validationErrors.institution}
                                    key='institution'
                                    name='institution'
                                    placeholder="Institution"

                                    //set value on change
                                    value={institution}
                                    onChange={(e) => setInstitution(e.target.value)}

                                    label='Select your institution.'

                                >
                                    <option value="1">Akron Children’s Hospital</option>
                                    <option value="2">Ann and Robert H. Lurie Children’s Hospital of Chicago</option>
                                    <option value="3">Arkansas Children’s Hospital</option>
                                    <option value="4">Buffalo Children’s Hospital</option>
                                    <option value="5">Cardinal Glennon Children’s Hospital, St. Louis, MO</option>
                                    <option value="6">Children’s Hospital Boston</option>
                                    <option value="7">Children’s Hospital Los Angeles</option>
                                    <option value="8">Children’s Hospitals and Clinics of Minnesota</option>
                                    <option value="9">Children’s Hospital of Omaha</option>
                                    <option value="10">The Children’s Hospital of Philadelphia</option>
                                    <option value="11">Children’s Hospital of Pittsburgh</option>
                                    <option value="12">Children’s Medical Center, Dallas, TX</option>
                                    <option value="13">Children’s National Medical Center, Washington DC</option>
                                    <option value="14">Cleveland Clinic Children’s Hospital</option>
                                    <option value="15">Cincinnati Children’s Hospital Medical Center</option>
                                    <option value="16">Colorado Children’s Hospital</option>
                                    <option value="17">Cook Children’s Hospital</option>
                                    <option value="18">Dayton Children’s Hospital</option>
                                    <option value="19">Dell Children’s Medical Center</option>
                                    <option value="20">Emory Children’s Center</option>
                                    <option value="21">Johns Hopkins All Children’s Hospital</option>
                                    <option value="22">Johns Hopkins Children’s Center</option>
                                    <option value="23">Kaiser Oakland Medical Center</option>
                                    <option value="24">Lucile Salter Packard Children’s Hospital at Stanford</option>
                                    <option value="25">Medical University of South Carolina</option>
                                    <option value="26">Montefiore Children’s Hospital</option>
                                    <option value="27">Monroe Carell Jr Children’s Hospital at Vanderbilt</option>
                                    <option value="28">Morgan Stanley Children’s Hospital of Columbia University Medical
                                        Center
                                    </option>
                                    <option value="29">Nationwide Children’s Hospital</option>
                                    <option value="30">Nemours/Alfred I DuPont Hospital for Children</option>
                                    <option value="31">Penn State Hershey Children’s Center</option>
                                    <option value="32">Phoenix Children’s Hospital</option>
                                    <option value="33">Riley Children’s Hospital</option>
                                    <option value="34">Seattle Children’s Hospital</option>
                                    <option value="35">St. Jude Children’s Research Hospital</option>
                                    <option value="36">Texas Children’s Hospital</option>
                                    <option value="37">University of Iowa Stead Family Children’s Hospital</option>
                                    <option value="38">University of Michigan C. S. Mott Children’s Hospital</option>
                                    <option value="39">US Anesthesia Partners</option>
                                </SelectField>

                                <SelectField
                                    isRequired="true"
                                    errorMessage={validationErrors.role}
                                    hasError={!!validationErrors.role}
                                    key='role'
                                    name='role'
                                    placeholder="Role"

                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}

                                    label='Select your role.'>
                                    <option value="1">Administrator</option>
                                    <option value="2">IT</option>
                                    <option value="3">Provider</option>
                                </SelectField>
                            </>
                        );
                    },
                },
            }}
        >
            {({signOut, user}) => (
                <main>
                    <h1>Hello {user.username}</h1>
                    <button onClick={signOut}>Sign out</button>
                </main>
            )}
        </Authenticator>
    );
}
