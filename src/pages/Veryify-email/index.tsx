import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import './VerifyEmail.css';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

function VerifyEmail()  {
    const [code, setCode] = useState<string>('');
    const [showPassword, setShowPassword] = useState<Boolean>(false);
    const navigate = useNavigate();
    const location = useLocation();
    
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };

    const submitForm = async (e: React.FormEvent) => {
        e.preventDefault();
        if(code) {
            try {
                const email = location.state.email;

                const response = await axios({
                    method: 'post',
                    url: 'http://byrdbox-env.eba-4kxk4yka.eu-north-1.elasticbeanstalk.com/auth/verify-user',
                    data: {
                        email,
                        code
                    }
                })
                if (response.status === 200 && response.statusText === 'OK') {
                    navigate('/login');
                } 
            } catch (error) {
                console.error(error);
            }
        }
    }

    return (
        <div className="verify-layout">
            <form action="" onSubmit={submitForm}>
                <InputLabel htmlFor="outlined-adornment-password">Verify e-mail</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-code"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setCode(event.target.value);
                          }}
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        autoComplete='off'
                        required
                />
            </form>
        </div>
    );
};

export default VerifyEmail;