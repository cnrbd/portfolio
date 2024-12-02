type AboutProps = {
    current: string;
    set: React.Dispatch<React.SetStateAction<string>>;
}

export const About: React.FC<AboutProps> = ({ current, set }) => {
    return (
        <button
            id='about'
            className={`tabs-button-styling ${current == 'About' ? 'pointer-events-none' : ''}`}
            onClick={() => {
                if (current !== 'About') {
                    set('About');
                } else {
                    console.log('Invalid');
                }
            }}>
            {current == 'About' ? '►' : 'About'}
        </button>
    );
}