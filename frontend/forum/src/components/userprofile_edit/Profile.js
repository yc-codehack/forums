import React, { useState } from 'react';
import { CssBaseline, Container, Card, CardActions,FormControl, Input, CardMedia, CardContent, Typography, Grid, InputLabel} from '@material-ui/core';
import { AddPhotoAlternate, Create } from '@material-ui/icons';
import ToggleButton from '@material-ui/lab/ToggleButton';
import useStyles from './styles1';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import {Link} from 'react-router-dom'

export default function User(){

    const classes = useStyles();
    const [count, setCount] = useState(1);
    // const IncNum = () => {
    //     setCount(count + 1);
    // };

    const [imgPreview, setImgPreview] = useState('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png');
        const handleImageChange =(e) =>{
            const ALLOWED_TYPES = ["image/png", "image/jpg", "image/jpeg"];
            if(e.target.files[0] && ALLOWED_TYPES.includes(e.target.files[0].type)){
                let reader = new FileReader();
                reader.onloadend=()=>{
                    setImgPreview(reader.result);
                }
                reader.readAsDataURL(e.target.files[0]);
            }
        };
    
    return(
        <>
            <CssBaseline />
            <main>
                <div>
                <Container className={classes.container}>
                <Card className={classes.card}>
                <CardActions className={classes.toggleBtn}>
                    <Link to='/user'>
                        
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            className={classes.button}
                            startIcon={<SaveIcon />}
                        >
                            Save 
                        </Button>

                        
                    </Link>
                    </CardActions>
                    
                    <CardMedia className={classes.imgHolder}>
                        <img src={imgPreview} alt="" className={classes.img}/><br></br>
                    </CardMedia>
                    <CardActions className={classes.imgPreview}>
                        <FormControl className={classes.imgupload}>

                    <div className={classes.profile}>
                    <Grid item xs={6}>
                            <Input type="file" name="imageupload" id="input" accept="image/*" className={classes.inputFile} onChange={handleImageChange}></Input>
                            
                          
                            <InputLabel htmlFor="input" className={classes.imageupload}><AddPhotoAlternate /> .</InputLabel>                                               
                            <InputLabel htmlFor="input" className={classes.imageuploadone}><AddPhotoAlternate /> .</InputLabel> 
                            <InputLabel htmlFor="input" className={classes.imageuploadtwo}><AddPhotoAlternate /> .</InputLabel>        
                            
                            </Grid>
                      
                            {/* <Grid item xs={6}>                          
                            {imgPreview && (
 <button onClick={() => setImgPreview = {handleImageChange}}  className={classes.imageupload}>Remove Image</button>
                    )}
                    </Grid> */}
                            </div>

                        </FormControl>
                    </CardActions>
                    
                    <CardContent>
                        <div className={classes.user}>
                            <div className={classes.username}> <Input type="text" color='primary' variant='standard' placeholder='Username'></Input>
                                {/* <InputLabel color='primary' variant='standard'>Username</InputLabel> */}
                            </div>
                            <div className={classes.description}>
                                {/* <InputLabel color='primary' variant='standard'>Description</InputLabel> */}
                            <textarea name="" id="" cols="25" rows="5" color='primary' variant='standard' placeholder='Description'></textarea>
                            </div>
                        <div>
                            <Typography color='initial' variant='subtitle1'>Profile Created</Typography>
                        </div>
                        </div>
                        <div className={classes.rows}>
                            <Grid item xs={4}>
                                <InputLabel className={classes.col} color='primary' variant='standard'>{count}<br/>Answers</InputLabel>
                            </Grid>
                            <Grid item xs={4}>
                                <InputLabel className={classes.col} color='primary' variant='standard'>{count}<br/>Questions</InputLabel>
                            </Grid>
                            <Grid item xs={4}>
                                <InputLabel className={classes.col} color='primary' variant='standard'>{count}<br/>Up Votes</InputLabel>
                            </Grid>
                        </div>
                    </CardContent>
                </Card>
            </Container>
            </div>
            </main>
        </>
    )
};