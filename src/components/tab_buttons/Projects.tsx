type ProjectsProp = {
    current: string;
    set: React.Dispatch<React.SetStateAction<string>>;
}


export const Projects: React.FC<ProjectsProp> = ({ current, set }) => {
    return (
        <button
            id='projects'
            className={`tabs-button-styling ${current == 'Projects' ? 'pointer-events-none' : ''}`}
            onClick={() => {
                if (current !== 'Projects') {
                    set('Projects');
                    console.log(current);
                } else {
                    console.log('Invalid');
                }
            }}>
            {current == 'Projects' ? '►' : 'Projects'}
        </button>
    );
}