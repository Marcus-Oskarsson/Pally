import Proptypes from 'prop-types';

import '../styles/hamburger.scss';

const Hamburger = ({ isOpen, setIsOpen }) => {
  return (
    <div className={`hamburger ${isOpen ? 'open' : ''}`}>
      <input
        onChange={() => setIsOpen(!isOpen)}
        checked={isOpen}
        type='checkbox'
        className='visually-hidden'
        id='hamburger-toggle'
      />
      <label htmlFor='hamburger-toggle'>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </label>
    </div>
  );
};

Hamburger.propTypes = {
  isOpen: Proptypes.bool.isRequired,
  setIsOpen: Proptypes.func.isRequired,
};

export default Hamburger;
