type ContactProps = {
    current: string;
    set: React.Dispatch<React.SetStateAction<string>>;
}


export const Contact: React.FC<ContactProps> = ({ current, set }) => {
    return (
        <button
            id='contact'
            className={`tabs-button-styling ${current == 'Contact' ? 'pointer-events-none' : ''}`}
            onClick={() => {
                if (current !== 'Contact') {
                    set('Contact');
                } else {
                    console.log('Invalid');
                }
            }}>
            {current == 'Contact' ? '►' : 'Contact'}
        </button>
    );
}