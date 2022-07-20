import { Amplify, Auth } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
import { SelectField } from '@aws-amplify/ui-react';
Amplify.configure(awsExports);

const formFields = {
  signUp: {
    email:{
      //label: 'Email',
      key: 'email',
      required: true,
      placeholder: 'Enter your email',
      type: 'email',
      displayOrder: 2
    },
    password:{
      //label: 'Password',
      key: 'password',
      required: true,
      placeholder: 'Enter your password',
      type: 'password',
      displayOrder: 3
    },
    given_name: {
      //label: 'First Name',
      key: 'fname',
      required: true,
      placeholder: 'First Name',
      type: 'string',
      displayOrder: 4
    },
    family_name: {
      //label: 'Last Name',
      key: 'lname',
      required: true,
      placeholder: 'Last Name',
      type: 'string',
      displayOrder: 5
    },
    username: {
      //label: 'User Name',
      key: 'username',
      required: true,
      placeholder: 'UserName',
      type: 'string',
      displayOrder: 1
    },
    site:{
      //label: 'Site',
      key: 'site',
      required: true,
      placeholder: 'Site',
      type: 'phone_number',
      dialCodeList: ['+1', '+123', '+227', '+229'],
      displayOrder: 6
    },

  },
}

export default function App() {
  return (
    <Authenticator formFields={formFields}>
      {({ signOut }) => <button onClick={signOut}>Sign out</button>}
    </Authenticator>
  );
}
