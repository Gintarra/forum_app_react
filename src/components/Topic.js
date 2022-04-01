import React, { useContext, useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import UsePagination from './Pagination';
import UserContext from '../context/UserContext';
import http from '../plugins/http';
import OneComment from './OneComment';

const Topic = () => {
    const { getUser } = useContext(UserContext)
    const { id } = useParams()
    const nav = useNavigate()
    const [getTopicComments, setTopicComments] = useState([])
    const [getState, setState] = useState(false)
    const [getError, setError] = useState(null)
    const inputText = useRef()
    const location = useLocation()
    //about pagination
    const [currentPage, setCurrentPage] = useState(null);
    const [postsPerPage] = useState(10);
    const [getTotalCount, setTotalCount] = useState(null)
   


    //pagination ends
    useEffect(() => {
        if (currentPage !== null) {
            http.get("topic/" + id + '/' +currentPage).then(res => {
                if (res.success) {
                    setTopicComments(res.data)
                    setTotalCount(res.data2)
                } else {

                }
            })
        } else {
        
        }
    }, [getState, currentPage])

    useEffect(() => {
        const search = location.search;
        const page = new URLSearchParams(search).get("page");
        if (page !== undefined && page !== null) {
            setCurrentPage(Number(page));
        } else {
            setCurrentPage(1);
        }
      }, [location]);

    const handlePageChange = (newActivePage) => {
        setCurrentPage(newActivePage);
        nav(`/tema/${id}?page=${newActivePage}`);
    };


    function sendComment() {
        const post = {
            text: inputText.current.value,
            id: id
        }
        http.post(post, "comment").then(res => {
            if (res.success) {
                inputText.current.value = ""
                setError(null)
                setState(!getState)
            } else {
                setError(res.message)
            }
        })
    }

    return (
        <div>
            {getTopicComments.length > 0 && getTopicComments.map((x, i) => <div key={i}><OneComment x={x} /></div>)}
            {postsPerPage < getTotalCount &&
                <UsePagination activePage={currentPage} handlePageChange={handlePageChange} totalCount={getTotalCount}
                />}
            {getUser && <div className='d-flex flex-column'>
                <textarea placeholder='Komentaro tekstas' ref={inputText} />
                <div>{getError}</div>
                <button className='btn' onClick={sendComment}>Komentuoti</button>
            </div>}

        </div>
    );
};

export default Topic;