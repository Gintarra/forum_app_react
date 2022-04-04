import React, { useContext, useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import UsePagination from './Pagination';
import UserContext from '../context/UserContext';
import http from '../plugins/http';
import OneComment from './OneComment';
import { IoIosArrowForward } from 'react-icons/io'
import Loader from './Loader';
import io from "socket.io-client"

const socket = io.connect("http://localhost:4000")

const Topic = () => {
    const { getUser, setUser } = useContext(UserContext)
    const { id } = useParams()
    const nav = useNavigate()
    const [getTopicComments, setTopicComments] = useState([])
    const [getTitle, setTitle] = useState(false)
    const [getError, setError] = useState(null)
    const inputText = useRef()
    const location = useLocation()
    const [currentPage, setCurrentPage] = useState(null);
    const [postsPerPage] = useState(10);
    const [getTotalCount, setTotalCount] = useState(null)
    const [getLoader, setLoader] = useState(true)


    useEffect(() => {
        if (currentPage !== null) {
            http.get("topic/" + id + '/' + currentPage).then(res => {
                if (res.success) {
                    setTopicComments(res.data)
                    setTotalCount(res.data2)
                    setUser(res.data3)
                    setTitle(res.data4)
                    setLoader(false)
                }
            })
        }
    }, [currentPage])

    useEffect(() => {
        socket.on('realTimeComment', dataAll => {
            if (id === dataAll[2]) {
                setTopicComments(dataAll[0])
                setTotalCount(dataAll[1])
             //   http.post('decrease', {id})
            }
        })
    }, [])

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
            id: id,
            pageIndex: currentPage
        }
        http.post(post, "comment").then(res => {
            if (res.success) {
                inputText.current.value = ""
                setError(null)
            } else {
                setError(res.message)
            }
        })
    }

    return (
        <div className='p-3'>
            <div className='d-flex my-2'>
                <h5 onClick={() => nav('/')} className="link-topic d-flex align-items-end">Forumas <IoIosArrowForward /> </h5>
                <h5>{getTitle}</h5>
            </div>
            {getLoader && <div className='d-flex justify-content-center'><Loader /></div>}
            {postsPerPage < getTotalCount &&
                <UsePagination activePage={currentPage} handlePageChange={handlePageChange} totalCount={getTotalCount}
                />}
            {getTopicComments.length === 0 && !getLoader && <div>Komentarų dar nėra</div>}
            {getTopicComments.length > 0 && getTopicComments.map((x, i) => <div key={i}><OneComment x={x} /></div>)}
            {postsPerPage < getTotalCount &&
                <UsePagination activePage={currentPage} handlePageChange={handlePageChange} totalCount={getTotalCount}
                />}
            {getUser && !getLoader && <div className='d-flex flex-column align-items-center'>
                <textarea placeholder='Komentaro tekstas' ref={inputText} />
                <div>{getError}</div>
                <button className='btn' onClick={sendComment}>Komentuoti</button>
            </div>}
        </div>
    );
};

export default Topic;