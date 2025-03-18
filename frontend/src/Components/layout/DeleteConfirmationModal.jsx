import PropTypes from 'prop-types';

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, itemType }) => {
    if (!isOpen) return null;

    return (
        <div dir='rtl' className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden transform transition-all">
                <div className="bg-red-600 p-4">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <h3 className="text-lg font-medium text-white">ئایا دڵنیایت لە سڕینەوە؟</h3>
                        </div>
                    </div>
                </div>

                <div className="px-4 py-5 sm:p-6">
                    <p className="text-sm text-gray-600">
                       ئایا دڵنیایت لە سڕینەوەی ئەم  {itemType || 'item'}ە
                    </p>
                </div>

                <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row bg-gray-50">
                    <button
                        type="button"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={onConfirm}
                    >
                        بەڵێ
                    </button>
                    <button
                        type="button"
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                        onClick={onClose}
                    >
                        بگەرێوە
                    </button>
                </div>
            </div>
        </div>
    );
}

DeleteConfirmationModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    itemType: PropTypes.string,
};


export default DeleteConfirmationModal;