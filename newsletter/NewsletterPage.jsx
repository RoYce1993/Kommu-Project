import React, { useState, useEffect } from 'react';
import newsletterServices from '../../services/newsletterService';
import logger from 'sabio-debug';
import Pagination from 'rc-pagination';
import Article from './Article';
import 'rc-pagination/assets/index.css';
import { useNavigate } from 'react-router-dom';

const NewsletterPage = () => {
    const navigate = useNavigate();
    let [deleteNewsletter] = useState({ isDeleted: 1 });
    const _logger = logger.extend('searchlisting');
    const [searchState, setSearchState] = useState({
        articleArr: [],
        articleComponents: [],
        pageIndex: 0,
        pageSize: 8,
        totalCount: 0,
        current: 1,
    });

    useEffect(() => {
        newsletterServices
            .GetAllNewsletters(searchState.pageIndex, searchState.pageSize)
            .then(onGetPaginatedSuccess)
            .catch(onGetPaginatedError);
    }, [searchState.pageIndex]);

    const onGetPaginatedSuccess = (data) => {
        _logger('Pagination results:', data);
        let articles = data.item.pagedItems;

        setSearchState((prevState) => {
            const newState = { ...prevState };
            newState.articleArr = articles;
            newState.articleComponents = articles.map(mapping);
            newState.totalCount = data.item.totalCount;
            return newState;
        });
    };

    const onGetPaginatedError = (message) => {
        _logger('Paginated results not retrieved: ', message);
    };

    const mapping = (anArticle) => {
        return <Article article={anArticle} key={`article-${anArticle.id}`} onDeleteClicked={onDeleteClicked} />;
    };

    const onPageChange = (page) => {
        setSearchState((prevState) => {
            let newState = { ...prevState };
            newState.current = page;
            newState.pageIndex = page - 1;
            return newState;
        });
    };

    const onDeleteClicked = (Id) => {
        _logger('clicked');
        const id = parseInt(Id);
        newsletterServices
            .DeleteNewsletter(id, deleteNewsletter)
            .then((res) => onDeleteButtonSuccess(res, id))
            .catch(onDeleteButtonError);
    };
    const onDeleteButtonSuccess = (response, id) => {
        _logger('clicked', response);
        setSearchState((prevState) => {
            let pd = { ...prevState };
            const newList = pd.articleArr.filter((article) => article.id !== id);
            pd.articleArr = newList;

            pd.articleComponents = newList.map(mapping);

            return pd;
        });

        navigate(`/newsletter`);
    };

    const onDeleteButtonError = (err) => {
        logger('clicked', err);
        navigate(`/newsletter`);
    };

    return (
        <div className="container">
            <div className="margin-space">
                <Pagination
                    onChange={onPageChange}
                    current={searchState.current}
                    pageSize={searchState.pageSize}
                    total={searchState.totalCount}
                    className="center-aligned"
                />
            </div>
            <div className="row">{searchState.articleComponents}</div>
        </div>
    );
};

export default NewsletterPage;
