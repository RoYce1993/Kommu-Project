import React, { useState } from 'react';
import debug from 'sabio-debug';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Row, Col } from 'react-bootstrap';
import newsletterServices from '../../services/newsletterService';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import FileUploader from '../fileuploader/FileUploader';
import 'react-datepicker/dist/react-datepicker.css';

function AddNewsletter() {
    const _logger = debug.extend('NewsletterForm');
    const [newsletterData, setNewsletterData] = useState({
        formData: {
            Name: '',
            TemplateId: '',
            CoverPhoto: '',
            DateToPublish: '',
            DateToExpire: '',
        },
    });
    const [templateInfo] = useState({
        templates: [
            { id: 1, name: 'Template 1' },
            { id: 2, name: 'Template 2' },
            { id: 3, name: 'Template 3' },
            { id: 4, name: 'Template 4' },
        ],
    });

    const navigate = useNavigate();
    const { state } = useLocation();
    const { articleId } = useParams();
    const [newsletterId, setNewsletterId] = useState({ id: '' });

    useEffect(() => {
        setNewsletterId(articleId);
        if (state) {
            setNewsletterData((prevState) => {
                let dp = { ...prevState };
                dp.formData.Id = articleId;
                dp.formData.TemplateId = state.payload.TemplateId;
                dp.formData.Name = state.payload.Name;
                dp.formData.CoverPhoto = state.payload.CoverPhoto;
                dp.formData.DateToPublish = state.payload.DateToPublish;
                dp.formData.DateToExpire = state.payload.DateToExpire;

                return dp;
            });
        }
    }, []);

    const submitForm = (values) => {
        if (!newsletterId) {
            newsletterServices.AddNewsletter(values).then(onAddNewsletterSuccess).catch(onAddNewsletterError);
            _logger('add working?', values);
        } else {
            newsletterServices
                .UpdateNewsletter(articleId, values)
                .then(onUpdateNewsletterSuccess)
                .catch(onUpdateNewsletterError);
            _logger('Update working?', articleId);
        }
    };

    const onAddNewsletterSuccess = () => {
        navigate('/newsletter');
    };
    const onAddNewsletterError = () => {};

    const onUpdateNewsletterSuccess = () => {
        _logger('update success');
        navigate('/newsletter');
    };

    const onUpdateNewsletterError = () => {
        _logger('update Error');
    };

    const mapTemplateId = (template) => {
        _logger('this is template it mapping', template.id);
        return (
            <option key={`template_${template.id}`} value={template.id}>
                {template.name}
            </option>
        );
    };

    return (
        <React.Fragment>
            <ToastContainer />

            <Row className="m-3">
                <Col>
                    <div className="container-fluid">
                        <div className="card p-3">
                            <Formik
                                enableReinitialize={true}
                                initialValues={newsletterData.formData}
                                onSubmit={submitForm}>
                                {(props) => {
                                    const { values, handleChange, setFieldValue } = props;
                                    const onFileUploadSuccess = (data) => {
                                        const theUploadSuccess = data.items[0].url;
                                        setFieldValue('CoverPhoto', theUploadSuccess);
                                    };

                                    return (
                                        <Form>
                                            <div>
                                                <h3>Edit a Newsletter </h3>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="Name">Name</label>
                                                <Field
                                                    type="text"
                                                    name="Name"
                                                    className="form-control"
                                                    value={values.Name}
                                                    onChange={handleChange}
                                                />
                                                <ErrorMessage
                                                    name="description"
                                                    component="div"
                                                    className="text-danger"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="Name">Choose the Template</label>
                                                <Field
                                                    className="form-control"
                                                    name="TemplateId"
                                                    value={values.TemplateId}
                                                    component="select">
                                                    <option defaultValue>Please select template id </option>
                                                    {templateInfo.templates.map(mapTemplateId)}
                                                </Field>

                                                <ErrorMessage
                                                    name="description"
                                                    component="div"
                                                    className="text-danger"
                                                />
                                            </div>

                                            <br />
                                            <div className="form-group">
                                                <label htmlFor="CoverPhoto">CoverPhoto</label>
                                                <FileUploader
                                                    onHandleUploadSuccess={onFileUploadSuccess}
                                                    name="CoverPhoto"
                                                    value={values.CoverPhoto}
                                                />
                                            </div>
                                            <br />
                                            <div className="form-group">
                                                <label htmlFor="DateToPublish">DateToPublish: </label>
                                                <input
                                                    type="date"
                                                    name="DateToPublish"
                                                    className="form-control"
                                                    onChange={handleChange}
                                                    value={values.DateToPublish}
                                                />
                                                <ErrorMessage
                                                    name="description"
                                                    component="div"
                                                    className="text-danger"
                                                />
                                            </div>
                                            <br />
                                            <div className="form-group">
                                                <label htmlFor="DateToExpire">DateToExpire: </label>
                                                <input
                                                    type="date"
                                                    name="DateToExpire"
                                                    className="form-control"
                                                    onChange={handleChange}
                                                    value={values.DateToExpire}
                                                />

                                                <ErrorMessage
                                                    name="description"
                                                    component="div"
                                                    className="text-danger"
                                                />
                                            </div>
                                            <br />

                                            <div className="btn text-center col-md-12">
                                                <button type="submit" className="btn btn-primary">
                                                    Submit
                                                </button>
                                            </div>
                                        </Form>
                                    );
                                }}
                            </Formik>
                        </div>
                    </div>
                </Col>
            </Row>
        </React.Fragment>
    );
}

AddNewsletter.propTypes = {
    values: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        TemplateId: PropTypes.number.isRequired,
        CoverPhoto: PropTypes.string.isRequired,
        DateToPublish: PropTypes.number.isRequired,
        DateToExpire: PropTypes.number.isRequired,
    }),
    handleChange: PropTypes.func,
    func: PropTypes.func,
    setFieldValue: PropTypes.func,
};

export default AddNewsletter;
