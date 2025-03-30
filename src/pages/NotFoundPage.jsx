import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';
import imgUrl from '/notFound.webp';

const NotFoundPage = () => {
  return (
    <div>
      <Image src={imgUrl} />
    </div>
  );
};

NotFoundPage.propTypes = {};

export default NotFoundPage;
