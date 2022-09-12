import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './newsletter.css';

const NewsletterCover = () => {
    return (
        <section>
            <div className="newsletter-background">
                <Container>
                    <Row>
                        <Col md={8}>
                            <div className="mt-md-4">
                                <div>
                                    <h1
                                        className="ms-0 fw-bold  fw-light newsletter-sub-title {
">
                                        A Private Home Swapping Community
                                    </h1>
                                </div>
                                <p className=" fw-bold mb-4 mt-3 newsletter-title  ">Newsletters</p>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <div className="right-aligned newsletter-cover-button">
                            <Link to="../newsletter/add" className="btn  btn-success m-1 button">
                                Add a Newsletter
                            </Link>
                        </div>
                    </Row>
                </Container>
            </div>
        </section>
    );
};

export default NewsletterCover;
