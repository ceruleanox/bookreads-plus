import React, { useState } from 'react';
import { Card, CardTitle, CardImg, CardBody, Button, Modal } from 'reactstrap';
const BookCard = ({
  thumbnail,
  title,
  pageCount,
  language,
  description,
  authors,
  publisher,
  categories,
  previewLink,
  infoLink
}) => {
  // States
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  console.log(thumbnail)
  return (
        <Card style={{ width: '250px'}} className='m-auto'>
            <center>
                <CardImg
                    top
                    // style={{ width: '100%', height: '233px' }}
                    style ={{ width: '55%' }}
                    src={thumbnail}
                    alt={title}
                />
            </center>
        <CardBody>
            <center>
            <b><CardTitle className='card-title'>{title}</CardTitle></b> by
            <CardTitle className='card-authors'>{authors}</CardTitle>
            <Button onClick={toggle}>More info</Button>
            </center>
        </CardBody>
        <Modal isOpen={modal} toggle={toggle}>
            <div className='modal-header d-flex justify-content-center'>
                <h5 className='modal-title text-center' id='exampleModalLabel'>
                    {title}
                </h5>
                <button
                    aria-label='Close'
                    className='close'
                    type='button'
                    onClick={toggle}
                >
                    <span aria-hidden={true}>X</span>
                </button>
            </div>
            <div className='modal-body'>
            <div className='d-flex justify-content-between ml-3'>
                <img src={thumbnail} alt={title} style={{ width: '180px' }} />
                <div>
                <p>Page Count: {pageCount}</p>
                <p>Language : {language}</p>
                <p>Authors : {authors}</p>
                <p>Publisher : {publisher}</p>
                <p>Categories : {categories}</p>
                </div>
            </div>
            <div className='mt-3'>{description}</div>
            </div>
            <div className='modal-footer'>
            <div className='left-silde'>
                <a
                href={previewLink}
                className='btn-link'
                color='default'
                type='button'
                target='_blank'
                rel='noopener noreferrer'
                >
                Preview Link
                </a>
            </div>
            <div className='divider'></div>
            <div className='right-silde'>
                <a
                href={infoLink}
                className='btn-link'
                color='default'
                type='button'
                target='_blank'
                rel='noopener noreferrer'
                >
                Info Link
                </a>
            </div>
        </div>
        </Modal>
    </Card>
  );
};

export default BookCard;