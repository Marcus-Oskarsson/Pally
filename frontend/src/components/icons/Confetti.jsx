export function Confetti(props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='2.5em'
      height='2.5em'
      viewBox='0 0 24 24'
      {...props}
    >
      <path
        fill='none'
        stroke='#5900ff'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        d='M4 5h2M5 4v2m6.5-2L11 6m7-1h2m-1-1v2m-4 3l-1 1m4 3l2-.5M18 19h2m-1-1v2m-5-3.482L7.482 10l-4.39 9.58a1 1 0 0 0 1.329 1.329L14 16.519z'
      ></path>
    </svg>
  );
}
