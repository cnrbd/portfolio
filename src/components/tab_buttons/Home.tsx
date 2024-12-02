type HomeProps = {
    current: string;
    set: React.Dispatch<React.SetStateAction<string>>;
}

export const Home: React.FC<HomeProps> = ({ current, set }) => {
    return (
        <button
            id='home'
            className={`tabs-button-styling ${current == 'Home' ? 'pointer-events-none' : ''}`}
            onClick={() => {
                if (current !== 'Home') {
                    set('Home');
                } else {
                    console.log('Invalid');
                }
            }}>
            {current == 'Home' ? '►' : 'Home'}
        </button>
    );
}