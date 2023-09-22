import React, { useState } from 'react';
import Button from '@mui/material/Button/Button';
import TextField from '@mui/material/TextField/TextField';
import Box from '@mui/material/Box';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const ModalContent = () => {
    const location = useLocation();
    const accessToken = location.state.accessToken;
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        if(title && description) {
            try {
                const response = await axios({
                    method: "post",
                    url: "http://byrdbox-env.eba-4kxk4yka.eu-north-1.elasticbeanstalk.com/projects/create",
                    data: {
                        title,
                        description
                    },
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })
                if (response.status === 200 && response.statusText === "OK") {
                    window.location.reload();
                }
            } catch(e) {
                console.error(e);
            }
        }
    }
    return (
        <div>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                gap: "10px"
            }}>
                <form action=""></form>
                <TextField 
                    id="title"
                    label="Title"
                    variant="outlined"
                    value={title}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setTitle(event.target.value);
                    }}
                />
                <TextField 
                    id="outlined-multiline-static"
                    label="Description"
                    variant="outlined"
                    multiline
                    rows={4}
                    value={description}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setDescription(event.target.value);
                    }}
                />
                <Button 
                    variant="contained" 
                    color="success"
                    onClick={handleSubmit}
                    type="submit"
                >Add
                </Button>
            </Box>
        </div>
    );
};

export default ModalContent;