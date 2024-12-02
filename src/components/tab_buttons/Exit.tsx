type ContactProps = {
    current: string;
    set: React.Dispatch<React.SetStateAction<string>>;
}

export const Exit: React.FC<ContactProps> = ({ current, set }) => {
    return (
        <div className={`exit-wrapper`}>
            <button
                id='exit'
                className={`${current == 'Home' ? 'w-0' : 'w-[100%]'} exit-styling`}
                onClick={() => {
                    if (current !== 'Home') {
                        set('Home');
                    } else {
                        console.log('Invalid');
                    }
                }}>
                ← HOME
            </button>
        </div>
    );
}