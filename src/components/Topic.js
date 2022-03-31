import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import http from '../plugins/http';
import OneComment from './OneComment';

const Topic = () => {
    const { id } = useParams()
    const [getTopicComments, setTopicComments] = useState([])
    useEffect(() => {
        http.get("topic/" + id).then(res => {
            if (res.success) {
                setTopicComments(res.data)
            } else {

            }
        })

    }, [])
    return (
        <div>
            {getTopicComments.length > 0 && getTopicComments.map((x, i) => <OneComment key={i} x={x} />)}
        </div>
    );
};

export default Topic;