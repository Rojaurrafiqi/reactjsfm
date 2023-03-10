import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen  && (

//        <div className="fixed z-10 inset-0 overflow-y-auto">
//   <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
//     <div className="fixed inset-0 transition-opacity">
//       <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
//     </div>

//     <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full max-w-5xl">
//       {children}

//       <div className="mt-5  sm:mt-6 sm:px-6">
//         <button
//           onClick={onClose}
//           className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 mb-5 bg-red-600 text-base font-medium text-white hover:bg-red-700 sm:text-sm sm:leading-5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   </div>
// </div>

 <div class="fixed z-10 inset-0 overflow-y-auto">
  <div class="flex items-start my-5 justify-center min-h-screen ">
    <div class="fixed inset-0 transition-opacity" aria-hidden="true">
      <div class="absolute inset-0 bg-gray-500 opacity-75"></div>

    </div>
      
        {children}
  </div>
</div> 



      )}
    </>
  );
};

export default Modal;
