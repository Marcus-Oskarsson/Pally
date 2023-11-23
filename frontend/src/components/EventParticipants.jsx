import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const EventParticipants = ({ participants = [] }) => {
  return (
    <div className='participants-container'>
      <h2>Deltagare</h2>
      <ul className='participant-content-container'>
        {participants.map((participant) => (
          <li key={participant.userid}>
            <img src={participant.userimgurl} alt={participant.username} />
            <Link to={`/profile/${participant.userid}`}>
              {participant.username}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

EventParticipants.propTypes = {
  participants: PropTypes.array,
};

export default EventParticipants;
