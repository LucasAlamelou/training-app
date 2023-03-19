import React from 'react';
import styled from 'styled-components';
import { usePagination, DOTS } from '../util/usePagination.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

export const Pagination = ({
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
}) => {
    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize,
    });

    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    let lastPage = paginationRange[paginationRange.length - 1];
    return (
        <PaginationContainer>
            <PaginationItem onClick={onPrevious}>
                <FontAwesomeIcon icon={faArrowLeft} />
            </PaginationItem>
            {paginationRange.map((pageNumber) => {
                if (pageNumber === DOTS) {
                    return <PaginationItem>&#8230;</PaginationItem>;
                }

                return (
                    <PaginationItem onClick={() => onPageChange(pageNumber)}>
                        {pageNumber}
                    </PaginationItem>
                );
            })}
            <PaginationItem onClick={onNext}>
                <FontAwesomeIcon icon={faArrowRight} />
            </PaginationItem>
        </PaginationContainer>
    );
};

const PaginationContainer = styled.ul`
    display: flex;
    justify-content: center;
    list-style-type: none;
    cursor: pointer;
`;

const PaginationItem = styled.li`
    padding: 0 12px;
    height: 32px;
    text-align: center;
    margin: auto 4px;
    color: rgba(0, 0, 0, 0.87);
    display: flex;
    box-sizing: border-box;
    align-items: center;
    letter-spacing: 0.01071em;
    border-radius: 16px;
    line-height: 1.43;
    font-size: 13px;
    min-width: 32px;

    :hover {
        background-color: #6bb3f2;
    }
`;
