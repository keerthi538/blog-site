import React from 'react'
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Create() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('Mario');
    const [isLoading, setIsLoading] = useState(false);

    const history = useHistory();

    const handleSubmit = (e) =>{
        e.preventDefault();
        setIsLoading(true);

        const blog = { title, body, author };

        fetch('http://localhost:8000/blogs',{
            method : 'POST',
            headers : {"content-type" : "application/json"},
            body : JSON.stringify(blog)
        })
        .then(() => {
            setIsLoading(false);
            console.log('New Blog Added');
            history.push('/');
        })
    }

    return (
        <div className="create">
            <h2>Add a New Blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog Title:</label>
                <input 
                    type="text"
                    required
                    value = {title}
                    onChange = {(e) => setTitle(e.target.value)}
                    />

                <label>Blog body:</label> 
                <textarea
                    required
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                ></textarea>
                <label>Blog author:</label>  
                <select
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    >
                    <option value="Mario">Mario</option>
                    <option value="Yoshi">Yoshi</option>
                </select>
                {!isLoading && <button>Add blog</button>} 
                {isLoading && <button disabled>Adding Blog...</button>} 

            </form>
        </div>
    )
}

export default Create;