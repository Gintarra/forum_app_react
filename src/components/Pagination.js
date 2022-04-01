import Pagination from 'react-js-pagination';
import { useContext, useState } from 'react';
import UserContext from '../context/UserContext'


const UsePagination = ({ activePage, handlePageChange, totalCount}) => {
    return (
        <div>
        <Pagination
          activePage={activePage === 0 ? 1 : activePage}
          itemsCountPerPage={10}
          totalItemsCount={totalCount}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
        />
      </div>
    );
  };

  export default UsePagination;

