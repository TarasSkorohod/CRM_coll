import './Preloader.css';
const Preloader = ({otherClass}) => {
    return (
        <span className={`loader ${otherClass}`}></span>
    );
};

export default Preloader;