export const Modal = ({ open, closeModal, children }) => {
  if (!open) return null;

  const handleOnClick = (event) => {
    if (event.target.className === 'modal-Container') {
      closeModal();
    }
  };
  return (
    <>
      <div className='modal-Container' onClick={handleOnClick}>
        <div className='modal-Children-Container'>
          <div className='modal-button-container'>
            <svg
              onClick={closeModal}
              xmlns='http://www.w3.org/2000/svg'
              width='32'
              height='32'
              viewBox='0 0 24 24'
            >
              <path
                fill='currentColor'
                d='M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6L6.4 19Z'
              />
            </svg>
          </div>
          <div className='modal-Children'>{children}</div>
        </div>
      </div>
    </>
  );
};
