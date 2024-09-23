import React from 'react';

const Button2 = ({ text }) => {
  return (
    <div className="relative flex self-center items-center justify-center after:content-[''] after:absolute after:w-[2px] after:h-5 after:bg-[#444] after:left-[53%] after:-translate-x-1/2 after:top-[80%]">
      <button className="group mb-20 hover:scale-110 transition-all duration-100 ease-in-out relative font-['nunito'] py-2 px-5 rounded font-extrabold bg-[#4595eb] bg-gradient-to-l from-[#1595b6] to-[#1f2667e6]">
        {text}
        <svg
          className="w-10 rotate-90 absolute left-1/2 -translate-x-1/2 top-11 group-hover:top-12 transition-all duration-100 ease-in-out"
          version="1.1"
          x="0px"
          y="0px"
          viewBox="0 0 100 125"
        >
          <g transform="translate(0,-952.36218)">
            <path
              d="m 88.999835,1002.3621 c 0,-0.4628 -0.2799,-1.0773 -0.5639,-1.3755 l -15.9997,-17.00026 c -0.747,-0.7723 -1.9572,-0.8618 -2.8281,-0.078 -0.7786,0.7007 -0.798,2.0673 -0.078,2.8282 l 12.8435,13.62516 -69.37347,0 c -1.1046,0 -2,0.8954 -2,2 0,1.1046 0.8954,2.0001 2,2.0001 l 69.37347,0 -12.8435,13.6252 c -0.7199,0.7608 -0.6688,2.0938 0.078,2.8281 0.7885,0.7752 2.0925,0.7062 2.8281,-0.078 l 15.9997,-17.0002 c 0.4701,-0.4611 0.556,-0.9052 0.5639,-1.3748 z"
              fill="#fff"
              fillOpacity="1"
              stroke="white"
              strokeWidth="2"
            />
          </g>
        </svg>
      </button>
    </div>
  );
};

export default Button2;
