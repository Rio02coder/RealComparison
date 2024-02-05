# RealComparison

## Contents:

- [Project Description](#project-description)
- [Project Structure](#project-structure)
    - [Backend](#backend)
    - [Frontend](#frontend)
    - [AI Component](#ai-component)
    - [Dataset](#dataset)
- [Deployment](#deployment)
- [Website](#website)
- [Authors](#authors)
- [Acknowledgments](#acknowledgments)
- [License](#license)
- [Project Status](#project-status)

## Project Description

This project aims to produce a cross-platform mobile application to support people in finding a "fair" estimation of a real estate property. In this context, "fair" is not to be taken in an absolute way. The price suggestions made by the system are trying to match, as well as possible, the past and current market prices in the context of the dataset. This application will be a simple agent recommender of price ranges for all real estates to be found within a state. Real estate will be identified by making use of an already existing standardized system (e.g., postcodes may be one of the valid candidates).
The system should also support users to prove ownership of properties shown in the app. Allowing property owners to post pictures of those properties, further adds credibility to them. There should be a way to allow property owners to advertise official sales for those properties, by not restricting their display price to the suggested price ranges given by the system. It makes sense to also supply the possibility of ownership transfer/surrender.
Therefore, this system is not a real-estate selling platform, but more of a suggestion maker in terms of what a "fair" price range should be for a property. This recommender tries to predict the "fair" price in the given context (example of relevant parameters: floor, area, distance from the center, average area prices, selling history for that property, and so on...). 
Additionally, the app may track the traffic of interest for a given property and very slightly adjust the shown price ranges accordingly. Another useful function may be to let users save favorites and keep track of this kind of data, to further enrich the price range recommendations. The developed client app should contribute to a more transparent market, simplifying the starting point of research into buying a new property.

Currently, this project is duplicated and from the main repository with all project collaborators

## Project Structure

### Backend

**Django/Python**

Django, a high-level Python web framework, was deployed for the backend of this mobile application. Django consists of a wide set of functionalities which has been effectively utilized when developing this application. One significant benefit is that the framework is optimized for large-scale applications and can handle an immense level of traffic and mobile app API usage. Moreover, Django works well with the frontend development framework (React-Native). The compatibility allowed smooth integration between the backend and frontend. Another benefit is that the framework integrated nicely with the machine learning algorithms because of being written in Python.

---

**Testing Tools**

Django Automated Unit tests

---

### Frontend

**React Native/TypeScript**

We have decided to make use of React Native as this is one of the fastest ways to deploy native Android/iOS apps to the stores with only one codebase. To mitigate the risk of getting silly typing bugs due to the oversimplified nature of JavaScript, we will use TypeScript instead. 

---

**Testing Tools**

Jest and React-Test-Render

---

### AI Component

Currently the application is making use of the: **RandomForest regressor**

**Evaluating Tools**

- **Description**

    The handbook includes detailed evaluation for the machine learning models that have been explored and trained to solve our price prediction problem. We start by inspecting the dataset to detect outliers which are achieved by using the interquartile rule. The models are then evlauated and compared against different regression metrics which summarises their performance. We also present different visulaization graphs which describes the feature importance, feature correlations and residuals of a speicifc model. Finally, we used a K-Fold cross validation as a tool which provide us with a stable and trustworthy estimate of  the performance of each machine learning model.

---

- **Notebook's Pre-SetUp**

    - Sign In/Up in https://www.kaggle.com/
    - Go to Your Profile -> Account -> API -> Create New API Token
    - Open the handbook -> Files -> Drop the downloaded API Token under sample_data
    - Add the three .sav files into your google drive (The files can be found here: https://github.com/tomaAlex/RealComparison/tree/main/backend/static)
    - Run all code blocks in order from top to bottom

---

- **NoteBook**

    https://colab.research.google.com/drive/1-Rc916oWm-drq_B8_mwK1qs0xXUtJv-P?usp=sharing

---

### Dataset

The current AI regressor is operating on the following dataset:

https://www.kaggle.com/ericpierce/austinhousingprices

## Deployment

- The base URL for the deployed backend version: https://realcomparison.herokuapp.com/

## Website

http://realcomparison.co.uk

## Authors
The authors of this projects are:
- Alexandru-Eugen Toma (K20004417)
- Ivan Lyubomirov Arabadzhiev (K20011632)
- Tyler Austick (K20041624)
- Samirah Alfouzan (K19066021)
- Andonis Daskalopulos (K20081903)
- Innokentii Grigorev (K20073502)
- Arnav Gupta (K19069042)
- Taherah Choudhury (K20041339)
- Shmeelok Chakraborty (K20040611)

## Acknowledgments
We would like to extend our sincere thanks to the following people for their external contribution to the project's development process.
- Mae Lou Wittmann (maelou.wittmann@gmail.com) -> Branding design
- Matei Staicu (matei@woggo.ro) -> Presentation animation

## License

**TBD**

## Project Status

**On Hold**
