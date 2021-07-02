import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {Card , CardActions , CardContent, Button, Typography, CardHeader, Tabs, Tab, Paper} from '@material-ui/core';
import ProfileQues from '../../components/profileques/ProfileQues.js';
import ProfileAns from '../profileans/ProfileAns.js';
import { CallMissedSharp } from '@material-ui/icons';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';




function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-auto-tabpanel-${index}`}
        aria-labelledby={`scrollable-auto-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };




const useStyles = makeStyles({
    root: {
      minWidth: 275,
      textAlign : 'center',
      flexGrow: 1,
      marginLeft : 20,
      marginRight : 20
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });



export default function UserActivity() {
      const classes = useStyles();
      const [value, setValue] = React.useState(0);
    
      const handleChange = (event, newValue) => {
        setValue(newValue);
      };

    return (
        <div>
                <Paper className={classes.root}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        <Tab label="Answer" />
                        <Tab label="Questions" />
                    </Tabs>

                    <TabPanel value={value} index={0}>
                        <ProfileAns/>
                    </TabPanel>
                    
                    <TabPanel value={value} index={1}>
                        <ProfileQues/>
                    </TabPanel>

                    </Paper>
        </div>
    )
}
