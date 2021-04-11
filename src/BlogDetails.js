import React from 'react'
import { useHistory, useParams } from 'react-router';
import useFetch from './useFetch';

function BlogDetails() {
    const { id } = useParams();
    const { data: blog, isLoading, error} = useFetch('http://localhost:8000/blogs/' + id);

    const history = useHistory();

    const handleClick = () =>{
        fetch('http://localhost:8000/blogs/' + blog.id,{
            method: 'DELETE'
        })
        .then(() =>{
            history.push('/');
        })
    }


    return (
        <div className="blog-details">
            {isLoading && <div>Loading ...</div>}
            {error && <div>{ error } msg</div>}
            {blog && (
                <article>
                    <h2>{ blog.title }</h2>
                    <p>Written by { blog.author }</p>
                    <div>{ blog.body }</div>
                    <button onClick={handleClick}>Delete</button>
                </article>
            )}
        </div>
    )
}

export default BlogDetails;