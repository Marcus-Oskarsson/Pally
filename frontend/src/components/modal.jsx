export const Modal = ({ open, closeModal, children }) => {
  if (!open) return null;

  const handleOnClick = (event) => {
    if (event.target.className === 'modalContainer') {
      closeModal();
    }
  };
  return (
    <>
      <div className='modalContainer' onClick={handleOnClick}>
        <div className='modalChildren'>
          <button onClick={closeModal}>X</button>
          <div>{children}</div>
        </div>
      </div>
    </>
  );
};
