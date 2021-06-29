import React, { useState } from 'react';
import { CssBaseline, Container, Card, CardActions, CardMedia, CardContent, Typography, Grid, InputLabel} from '@material-ui/core';
import { AddPhotoAlternate, Create } from '@material-ui/icons';
import ToggleButton from '@material-ui/lab/ToggleButton';
import useStyles from './styles';

export default function UserProfile(){

    const classes = useStyles();
    const [count, setCount] = useState(1);
    // const IncNum = () => {
    //     setCount(count + 1);
    // };
    
    return(
        <>
            <CssBaseline />
            <main>
                <div>
                <Container className={classes.container}>
                <Card className={classes.card}>
                    <CardActions className={classes.toggleBtn}>
                        <ToggleButton color='primary' variant='contained'>
                            <a href=""><Create /></a>
                        </ToggleButton>
                    </CardActions>
                    <CardMedia className={classes.imgHolder}>
                        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="" className={classes.img}/><br></br>
                    </CardMedia>
                    {/* <CardActions>
                        <FormControl className={classes.imgupload}>
                            <Input type="file" name="imageupload" id="input" accept="image/*" className={classes.inputFile}></Input>
                            <InputLabel htmlFor="input" className={classes.imageupload}><AddPhotoAlternate /> Choose Your Photo</InputLabel>                        
                        </FormControl>
                    </CardActions> */}
                    <CardContent>
                        <div className={classes.user}>
                            <div className={classes.username}>
                                <InputLabel color='primary' variant='standard'>Username</InputLabel>
                            </div>
                            <div className={classes.description}>
                                <InputLabel color='primary' variant='standard'>Description</InputLabel>
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