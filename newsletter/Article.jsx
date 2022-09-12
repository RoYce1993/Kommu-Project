import React from 'react';
import PropTypes from 'prop-types';
import './newsletter.css';
import { FaEraser, FaPencilAlt } from 'react-icons/fa';
import logger from 'sabio-debug';
import { useNavigate } from 'react-router-dom';

function Article(props) {
    const navigate = useNavigate();
    const anArticle = props.article; // key
    const publishDate = anArticle.dateToPublish;
    let shorten = (prop) => {
        const dateShort = prop.split('T')[0];
        return dateShort;
    };

    const shortDate = shorten(publishDate);

    const onUpdateClicked = () => {
        const newsletterObj = anArticle;
        logger('clicked');
        navigateToUpdateForm(newsletterObj);
    };

    const navigateToUpdateForm = (receivedNewsletterObj) => {
        const newsletterObjToSend = { type: 'EDIT_VIEW', payload: receivedNewsletterObj };
        navigate(`update/${receivedNewsletterObj.id}`, { state: newsletterObjToSend });
    };

    return (
        <div className="col-5 col-md-2 col-md-4">
            <div className="card shadow-lg">
                <img
                    src={anArticle.coverPhoto}
                    id={anArticle.id}
                    className="card-img-top p-2"
                    alt="..."
                    height="200px"
                    style={{ objectFit: 'cover' }}
                />
                <div>
                    <p className="fw-bold fs-2 newsletter-text-center newsletter-card-text newsletter-article-title-space text-grey">
                        {anArticle.name}
                    </p>
                    <p className="text-grey ">Published Date: {shortDate}</p>
                    <div className="center-class">
                        <button
                            type="button"
                            className="mx-md-0.5 btn btn-outline-dark border-0 text-center"
                            onClick={onUpdateClicked}>
                            <FaPencilAlt />
                        </button>
                        <button
                            type="button"
                            className="mx-md-0.5 btn btn-outline-dark border-0 text-center"
                            onClick={() => props.onDeleteClicked(anArticle.id)}
                            value={`${anArticle.id}`}
                            id={anArticle.id}>
                            <FaEraser />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

Article.propTypes = {
    article: PropTypes.shape({
        coverPhoto: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        dateToPublish: PropTypes.string.isRequired,
    }),
    onDeleteClicked: PropTypes.func.isRequired,
};

export default Article;
