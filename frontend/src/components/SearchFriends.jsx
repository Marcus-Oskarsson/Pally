import SearchIcon from '../assets/search.png';
export const SearchFriends = () => {
  return (
    <>
      <div className='main-container'>
        <h2>Find new friends</h2>
        <div className='search-friends-container'>
          <input type='text' />
          <img src={SearchIcon} alt='' />
        </div>
      </div>
    </>
  );
};
