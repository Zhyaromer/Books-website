import BookstoreNavigation from "../layout/Navigation";
import Footer from "../layout/Footer";

const LoadingUi = () => {
    return (
        <div>
            <BookstoreNavigation />
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            </div>
            <Footer />
        </div>
    );
}

export default LoadingUi