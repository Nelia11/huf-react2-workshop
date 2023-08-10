import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function SignUpPage() {
  const [name, setName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name && lastName && phoneNumber && email && password) {
      try {
        const response = await axios({
          method: 'post',
          url: 'http://byrdbox-env.eba-4kxk4yka.eu-north-1.elasticbeanstalk.com/auth/sign-up',
          data : {
            name,
            familyName: lastName,
            phoneNumber,
            password,
            email
          }
        })
        if (response.status === 200 && response.statusText === 'OK') {
          navigate('/verify-email');
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <div className="layout">
      <form action="" className="form">
        <Typography variant="h5" component="h2">
          Sign Up
        </Typography>
        <TextField
          value={name}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setName(event.target.value);
          }}
          id="firstName"
          label="First name"
          variant="outlined"
          required
        />
        <TextField
          value={lastName}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setLastName(event.target.value);
          }}
          id="LastName"
          label="Last name"
          variant="outlined"
          required
        />
        <TextField
          value={phoneNumber}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setPhoneNumber(event.target.value);
          }}
          id="phoneNumber"
          label="Phone number"
          variant="outlined"
          required
        />
        <TextField
          value={email}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(event.target.value);
          }}
          id="email"
          label="Email"
          variant="outlined"
          required
        />
        <TextField
          value={password}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(event.target.value);
          }}
          id="password"
          label="Password"
          variant="outlined"
          required
        />
        <Button variant="contained" onClick={submitForm}>
          Submit
        </Button>
      </form>
      <div>
        <Link to={'/login'}> Navigate to Login </Link>
      </div>
    </div>
  );
}

export default SignUpPage;
