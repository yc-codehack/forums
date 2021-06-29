import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container:{
        // backgroundColor:'white',
        padding:theme.spacing(8, 0, 6),
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
    },

    card:{
        width:'750px',
        // height:'450px',
        borderRadius:'10px'
    },

    toggleBtn:{
        marginTop:'1%',
        marginLeft:'83%',
    },
    
    imgHolder:{
    margin: 'auto',
    width: '150px',
    height: '150px',
    borderRadius:'100px',
},

img:{
    width: '150px',
    height: '150px',
    border:'3px solid black',
    borderRadius:'100px',
    objectFit:'cover',
},

imgupload:{
    marginLeft:'32%',
    marginRight:'32%',
    display:'flex',
    textAlign:'center',
    justifyContent:'center',
    justifyItems:'center',
},

user:{
    marginTop:'2rem',
    textAlign:'center',
},

username:{
    textTransform:'UpperCase',
    margin:'0px 0px 15px 0px'
},

description:{
    margin:'0px 0px 15px 0px',
},

rows:{
    marginTop:'32px',
    display:'flex',
    justifyContent:'space-evenly'
},

col:{
    // margin:'80px',
    textAlign:'center',
    justifyContent:'space-evenly',
},

inputFile:{
    // width: '100%',
    // marginTop:'1.5rem',
    // display: 'flex',
    textAlign:'center',
    justifyContent:'center',
    inputFile:[typeof 'file'],
    display:'none',
},

imageupload:{
    // margin:'auto',
    width:'270px',
    // height:'30px',
    // backgroundColor:'white',
    color:'black',
    display:'flex',
    textAlign:'center',
    justifyContent:'center',
    cursor: 'pointer'
},


}));

export default useStyles;