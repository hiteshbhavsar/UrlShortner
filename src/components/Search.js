import React, {useState} from 'react'
import {TextField,Button,LinearProgress} from '@material-ui/core'
import shrtcode from '../api/shortcode';
import {Links} from './Search.css'
import {BsClipboardData} from 'react-icons/bs'
import ReactTooltip from 'react-tooltip';

const Search = () => {
    const [link,setlink]=useState('');
    const [short,setShort]=useState('');
    const [isLoading, setIsLoading]=useState(false);
    const [isSearchBoxEnabled,setSearchBox]=useState(true);
    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log(link);
        getLink();
        setlink('');
        setIsLoading(!isLoading);
        setSearchBox(true);
        
    }

    const handleLinkClick=(e)=>{
        e.preventDefault();
        console.log(document.getElementById('clip-icon').innerText);
        window.open(document.getElementById('clip-icon').innerText);
    }
    const copytoclipboard=(e)=>
    {
        e.preventDefault();
        
        console.log("Inside copy to clipboard");
        var element=document.getElementById('clip-icon');
        console.log(element.innerText);
        navigator.clipboard.writeText(element.innerText);
    }
    const getLink = async () =>{
        await shrtcode
        .get(`shorten?url=${link}`)
        .then((response) =>{
            //console.log(response);
            setShort(response.data.result.short_link);
            setIsLoading(false);
            setSearchBox(false);
        })
        .catch((error) =>{
            console.error(error);
        })
    }

    return (
        <div>
            <form onSubmit={(e)=> handleSubmit(e)} style={{display:'flex', flexDirection:'column'}}>
            <h1>Link to Convert</h1>
            <TextField style={{marginBottom:'20px'}} 
            label="Input your Link here" variant="outlined" 
            value={link}
            onChange={(e)=> setlink(e.target.value)}
            />
            {!isLoading &&(
            <Button 
            style={{marginBottom:'20px'}}
            onClick={(e)=>handleSubmit(e)} 
            variant="contained" 
            color="primary">Submit
            </Button>
            )
            }
            {isLoading && <LinearProgress/>}
            </form>
            {short && <div>Short Link:  &nbsp; &nbsp;
                <a id='clip-icon' target="_blank" className="Links" href={short} onClick={(e)=>handleLinkClick(e)}>{short}</a>
                <BsClipboardData style={{marginLeft:'20px'}} color='#3f51b5' 
                onClick={(e)=>copytoclipboard(e)} data-tip='Copy to Clipboard'></BsClipboardData>
            
            </div>}
        </div>
    )   
}

export default Search
