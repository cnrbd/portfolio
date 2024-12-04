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
      case "chrome-extension-project": {
        title = "AI Powered Chrome Extension";
        github = "https://github.com/cnrbd/chrome_extension";
        description =
          "This extension was made with the goal of addressing transparency in our food's nutritional information. Made using a RAG pipeline to prompt OpenAI's GPT model using information about food recipes gathered by a webscraper.";
        imgURL =
          "https://lh3.googleusercontent.com/XprMjci9p4F2xblIzActM6IxPF6_UN-BJEUf1PByI5NZI3nHX-X0SoQQCM6p9vkJxKbnXds-2UUq4W8FHJRDZcyIPqI=s1280-w1280-h800";
        deployment =
          "https://chromewebstore.google.com/detail/calocal/ilofgkmdaajnkbbgogakoodnojpfnogk?authuser=0&hl=en;";
        break;
      }
      case "michelin-project": {
        title =
          "Augmented LLM-Powered Data Analytics for Michelin Mobility Intelligence";
        github = "https://github.com/mtong1/michelin_group_16";
        description =
          "This was my Fall 2024 AI studio project for BreakThroughTechAI@MIT where I was grouped with Michelin Mobility Intelligence. My group made a Streamlit app powered by LangChain's Ollama that utitlizes Llama 3.2 where users can upload CSV file(s) and make queries. Our Streamlit app requires users to upload CSV file(s), provide context regarding them, and providing their question before prompting the Llama LLM. The purpose of this project was to be an internal tool for Michelin.\n\n Key features of the app include metadata extraction from uploaded CSV files and a user-friendly interface that guides users to input relevant context and queries. To ensure precise and relevant responses, our team implemented advanced prompt engineering techniques. This process involved crafting an optimal prompt structure that combined extracted metadata, user-provided context, and questions, while avoiding the rigid output formats typical of LangChain responses. \n\n The core functionality was built using LangChain’s Pandas DataFrame Agent, enabling the app to perform seamless Pandas queries on the data to retrieve accurate answers. This integration allowed the app to handle complex queries and dynamic dataframes effectively, ensuring high utility for users working with diverse datasets. Through this project, we successfully leveraged advanced AI capabilities to create a robust and interactive tool for data exploration, showcasing the potential of LLMs in enhancing decision-making processes.";
        imgURL = "";
        deployment = "https://github.com/mtong1/michelin_group_16";
        break;
      }
      case "us-census-project": {
        title =
          "Income Prediction Engine: Regression Modeling with Census Data";
        github = "https://github.com/cnrbd/BreakThrougTechAI-MIT_Lab5";
        description =
          "This project focused on building a binary classification model to predict whether an individual's annual income exceeds $50K based on attributes from the 1994 U.S. Census dataset. Data cleaning was a crucial first step, involving the removal of irrelevant features like fnlwgt (due to its limited predictive utility) and native-country (to avoid potential biases). Missing values in numerical columns, such as age and hours-per-week, were imputed with their respective means, while rows with missing categorical values in features like workclass or occupation were dropped to maintain data consistency. To prepare categorical features for machine learning models, one-hot encoding was employed, ensuring all data was numeric and suitable for the modeling process.\n\n A Random Forest Classifier was selected as the predictive model due to its robustness and ability to handle complex datasets with mixed feature types. Hyperparameter tuning was performed using Grid Search to optimize model performance. Key hyperparameters, such as max_depth (to control the tree depth) and n_estimators (the number of trees in the forest), were systematically tested to identify the best combination for reducing overfitting and improving accuracy. The model's performance was evaluated using metrics like accuracy, ROC-AUC, and a confusion matrix, highlighting its effectiveness in distinguishing between income classes. This methodical approach demonstrates the importance of both rigorous data preparation and careful hyperparameter tuning in building ethical and reliable machine learning models.";
        imgURL = "";
        deployment = "https://github.com/cnrbd/BreakThrougTechAI-MIT_Lab5";
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