import React from 'react';
import { Card } from 'react-bootstrap';
import { RatingInfo } from '../../Pages/Profile';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

type Props = {
  rating: RatingInfo;
  getStars: (num: number) => string;
};

const Rating = ({ rating, getStars }: Props) => {
  const navigate = useNavigate();
  const navigateToUser = async (id: number) => {
    navigate(`/profile/${id}`);
  };
  console.log(rating.submitter);
  return (
    <Card>
      <Card.Body>
        <Card.Title
          onClick={() => {
            navigateToUser(rating.submitter.id);
          }}
        >
          <img
            src={rating.submitter.image}
            alt=''
            className='reviewAvatar'
          ></img>
          {rating.submitter.name}
        </Card.Title>
        <Card.Subtitle className='mb-2 text-muted'>
          {getStars(rating.value)}
        </Card.Subtitle>
        <Card.Subtitle className='mb-2 text-muted'>
          {moment(rating.createdAt).format('MMMM Do, YYYY')}
        </Card.Subtitle>
        <Card.Text>{rating.text}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Rating;
