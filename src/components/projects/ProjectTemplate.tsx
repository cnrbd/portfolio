type Template = {
    projectName: string;
}

export const ProjectTemplate: React.FC<Template> = ({ projectName }) => {
    let title: string | undefined;
    let description: string | undefined;

    let github: string | undefined;
    let imgURL: string | undefined;

    let deployment: string | undefined;

    switch (projectName) {
        case 'chrome-extension-project': {
            title = 'AI Powered Chrome Extension';
            github = 'https://github.com/cnrbd/chrome_extension';
            description =
                "This extension was made with the goal of addressing transparency in our food's nutritional information. Made using a RAG pipeline to prompt OpenAI's GPT model using information about food recipes gathered by a webscraper.";
            imgURL = 'https://lh3.googleusercontent.com/XprMjci9p4F2xblIzActM6IxPF6_UN-BJEUf1PByI5NZI3nHX-X0SoQQCM6p9vkJxKbnXds-2UUq4W8FHJRDZcyIPqI=s1280-w1280-h800';
            deployment = 'https://chromewebstore.google.com/detail/calocal/ilofgkmdaajnkbbgogakoodnojpfnogk?authuser=0&hl=en;'
            break;
        }
        case 'roblox-ai-project': {
            title = 'Roblox Reinforcement Learning AI';
            github = 'https://github.com/Lycoriste/RBXWebserver';
            description = "This project explores the use of Reinforcement Learning (RL) to create more human-like and intelligent NPC (Non-Playable Character) behaviors in Roblox games. By training NPCs to interact dynamically with their environment, the AI learns optimal decision-making strategies based on feedback from its actions.\n\nThrough RL, NPCs in the game are able to observe their surroundings, adapt to player behaviors, and respond in increasingly sophisticated ways, making each interaction feel more natural and engaging. The NPCs are trained to solve in-game challenges, navigate complex environments, and make decisions that mimic human-like behavior, such as learning from past experiences and adjusting strategies based on the current situation. Currently, a backend is setup via FastAPI to allows communication between Roblox Studio and PyTorch + AWS RDS PostgreSQL Database. Reinforcement learning model and environment + agent design is ongoing.";
            imgURL = '/img/projectimg/rbxwebserverproject.png';
            break;
        }
        case 'portfolio': {
            title = 'Portfolio';
            github = 'https://github.com/Lycoriste/Portfolio';
            description = "My first website was actually a portfolio website (as seen above). I  challenged myself to learn Three.js/React-Three-Fiber because of Keita Yamada's portfolio website (check him out here: https://p5aholic.me), and I thought maybe I could try something like that. This is my second iteration and upgraded version of the original. It is still buggy and I am currently still optimizing the site so I apologize for any inconvenience.\n\n3D models used:\n'Cyberpunk Apartment' (https://skfb.ly/oz7SP) by Jiaxing is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).\n\n'Steins;Gate - Future Gadget Lab'(https://skfb.ly/6Z9vX) by Theory.OAD is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).";
            imgURL = '/img/projectimg/oldportfolio.png'
            deployment = 'www.lycoriste.me'
            break;
        }
        default: {
            break;
        }
    }

    return (
        <div id={projectName} className="project-card">
            <div className='flex flex-row justify-between'>
                <h1 aria-label={title} className="project-title">{title}</h1>
                <a href={github} target="_blank" rel="noopener noreferrer" className="github-button">
                    <img src='https://cdn.icon-icons.com/icons2/2389/PNG/512/github_logo_icon_145252.png' />
                </a>
            </div>
            <img src={imgURL} alt="Project image" className="project-image" />
            <p dangerouslySetInnerHTML={{ __html: description!.replace(/\n/g, '<br />') }} />
            <a href={deployment} target="_blank" rel="noopener noreferrer" className={`self-end underline mt-2 ${deployment == undefined ? "text-yellow-300" : 'hover:text-blue-300'} `}>{deployment == undefined ? "Work in progress" : "View project"}</a>
        </div >
    )
}