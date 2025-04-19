import { useTheme } from "../../context/ThemeContext";

const LoadingUi = () => {
    const { main } = useTheme();
    return (
        <div>
            <div className="flex justify-center items-center h-screen">
                <div
                style={{
                    borderColor: main,
                }}
                className="animate-spin rounded-full h-32 w-32 border-b-2"></div>
            </div>
        </div>
    );
}

export default LoadingUi