type AboutProps = {
    current: string;
}

export const AboutPage: React.FC<AboutProps> = ({ current }) => {
    return (
        <div id='about-container' className={`${current == 'About' ? 'flex opacity-100' : 'hidden opacity-0'}`}>
            <span id='about-body'>
                <span id='about-header'>About Me</span>
                Hello! I'm Nhan (Steven) Teng, a second-year Cognitive Science major specializing in Cognitive Behavioral Neuroscience at UC San Diego.
                <br />
                <br />

                I’ve explored various fields—from database management and machine learning to web development to brain-computer interfaces (BCIs). My current focus is on understanding the neural basis of sensation and perception and applying that knowledge to develop assistive BCI technology. I believe that BCIs hold incredible potential to transform lives, especially for those with cognitive or neurological impairments, and I’m excited to contribute to this field in the coming years.
                <br />
                <br />

                Outside of my studies, I enjoy working on side projects that integrate coding, design, and cognitive science principles. My approach is hands-on and ambitious; I’m driven to continuously expand my skills and build impactful applications. Thanks for visiting my portfolio—feel free to reach out!
                <br />
                <br />

                PS: I apologize for any inconvenience experienced on this site!
            </span>
        </div>
    )
}