type AboutProps = {
    current: string;
}

export const ContactPage: React.FC<AboutProps> = ({ current }) => {
    return (
        <div id='contact-container' className={`${current == 'Contact' ? 'flex opacity-100' : 'hidden opacity-0'}`}>
            <span id='contact-body'>
                <span id='contact-header'>Contact</span>
                steventeng03@gmail.com <br />
                nhteng@ucsd.edu <br />
                <br />
                <a href='https://github.com/Lycoriste/' className='hover:text-gray-300'>https://github.com/Lycoriste</a>
                <a href='https://www.linkedin.com/in/lycoriste/' className='hover:text-gray-300'>https://www.linkedin.com/in/lycoriste</a>
            </span>
        </div>
    )
}